/**
 * @author Carter Kosturos
 * @version 1.0.0
 * 
 * This program solves cache coherance problems
 * 
 * Which processor has the lowest instruction execution latency?
 * 
 * Assuming an ideal pipelined execution of a sequence of instructions without stalls, 
 * what is the minimum number of instructions that the sequence should have so that Processor 
 * A performs better than Processor B?
 */

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


class Core {
    constructor(id, processor) {
        this.id = id;
        this.processor = processor;
        this.cache = new Map();
    }

    read(address) {
        const currentState = this.cache.get(address);
        let message = `Core ${this.id} read from ${address}. `;

        if (!currentState || currentState === 'Invalid') {
            this.cache.set(address, 'Shared');
            message += currentState === 'Invalid' ? 'Existing block switched to Shared state and updated. ' : 'New block loaded in Shared state. ';
        } else {
            message += 'State unchanged. ';
        }

        // Include state changes in other cores
        const otherCoresUpdate = this.processor.updateCoresOnRead(this.id, address);
        message += otherCoresUpdate;

        return message;
    }

    write(address) {
        const currentState = this.cache.get(address);
        this.cache.set(address, 'Exclusive');
        let message = `Core ${this.id} wrote to ${address}. `;
        message += currentState ? `State changed from ${currentState} to Exclusive. ` : 'New block loaded in Exclusive state. ';

        // Get updates from other cores
        const otherCoresUpdate = this.processor.updateCoresOnWrite(this.id, address);
        message += otherCoresUpdate;

        return message;
    }

    getState(address) {
        return this.cache.get(address) || 'Invalid'; // Default to 'Invalid' if not present
    }

    updateStateOnRead(address) {
        // Update state to 'Shared' if not 'Exclusive'
        if (this.cache.get(address) !== 'Exclusive') {
            this.cache.set(address, 'Shared');
        }
    }

    invalidate(address) {
        this.cache.set(address, 'Invalid');
    }
}

class DualCoreProcessor {
    constructor(coreCount) {
        this.cores = [];
        for (let i = 0; i < coreCount; i++) {
            this.cores.push(new Core(i, this));
        }
    }

    updateCoresOnRead(readerCoreId, address) {
        let message = "";
        for (const core of this.cores) {
            const stateBefore = core.getState(address);
            if (core.id !== readerCoreId && stateBefore === 'Exclusive') {
                core.cache.set(address, 'Shared');
                message += `Core ${core.id} state for ${address} changed from Exclusive to Shared. `;
            }
        }
        return message;
    }

    updateCoresOnWrite(writerCoreId, address) {
        let message = "";
        for (const core of this.cores) {
            if (core.id !== writerCoreId) {
                const stateBefore = core.getState(address);
                if (stateBefore !== 'Invalid') {
                    core.invalidate(address);
                    message += `Core ${core.id} state for ${address} changed to Invalid. `;
                } else {
                    message += `Core ${core.id} did not have ${address} loaded and did not change. `;
                }
            }
        }
        return message;
    }
    

}


function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
    console.log("!!!!!!!!THIS CODE IS VERY EXPERIMENTAL, IT MIGHT NOT PRODUCE FULLY ACCURATE RESULTS!!!!!!!!")
    const coreCount = await askQuestion("Please enter Core Count: ");
    const addressWidth = await askQuestion("Please enter Address Width (in bits): ");
    const blockSize = await askQuestion("Please enter Block Size (in bytes): ");

    const processor = new DualCoreProcessor(parseInt(coreCount));

    const addressMask = ~(parseInt(blockSize) - 1); // Mask for flooring the address

    let action;
    do {
        console.log("===================================================")
        action = await askQuestion("Would you like to read the state of a core or read/write to a core (read/write/state/exit): ");
        switch (action) {
            case 'read':
            case 'write':
                const addressInput = await askQuestion(`Enter the address to ${action} from/to: `);
                const coreNum = await askQuestion("Enter core #: ");
                const core = processor.cores[parseInt(coreNum)];

                // Convert the input address to an integer and apply the mask to floor it
                const address = `0x${(parseInt(addressInput, 16) & addressMask).toString(16)}`;

                // Get detailed feedback from the read/write operation and display it
                const feedback = (action === 'read') ? core.read(address) : core.write(address);
                console.log("===================================================")
                console.log(feedback);
                break;
            case 'state':
                const stateAddressInput = await askQuestion("Enter address to check: ");
                const stateCore = await askQuestion("Enter core #: ");
                const flooredStateAddress = `0x${(parseInt(stateAddressInput, 16) & addressMask).toString(16)}`;
                console.log("===================================================")
                console.log(`Core State ${stateCore} for ${flooredStateAddress}: ${processor.cores[parseInt(stateCore)].getState(flooredStateAddress)}`);
                break;
        }
    } while (action !== 'exit');

    rl.close();
}

main();