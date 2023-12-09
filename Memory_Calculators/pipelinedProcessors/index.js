/**
 * @author Carter Kosturos
 * @version 1.0.0
 * 
 * This program solves the following problems:
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

function askQuestion(query) {
    return new Promise(resolve => {
        rl.question(query, resolve);
    });
}

async function main() {
    const numberOfProcessors = await askQuestion('Enter the number of processors to compare: ');

    let processors = [];
    for (let i = 0; i < numberOfProcessors; i++) {
        console.log(`Processor ${i + 1}:`);
        const pipelineStages = await askQuestion('Enter the number of pipeline stages: ');
        const stageLatency = await askQuestion('Enter the stage latency (in ps): ');
        const issueRate = await askQuestion('Enter the issue rate: ');

        processors.push({
            pipelineStages: parseInt(pipelineStages),
            stageLatency: parseInt(stageLatency),
            issueRate: parseInt(issueRate),
            pipelineLatency: parseInt(pipelineStages) * parseInt(stageLatency)
        });
    }

    console.log("===============================================");
    console.log("Comparing processors...");

    // Determine the processor with the lowest instruction execution latency
    let minLatency = Number.MAX_SAFE_INTEGER;
    let fastestProcessor = null;
    processors.forEach((processor, index) => {
        const instructionLatency = processor.pipelineLatency * processor.issueRate;
        if (instructionLatency < minLatency) {
            minLatency = instructionLatency;
            fastestProcessor = index + 1;
        }
    });

    //Detect edge case where all processors have the same latency
    if (fastestProcessor === null) {
        console.log("All processors have the same instruction execution latency.");
    }
    else{
    console.log(`Processor ${fastestProcessor} has the lowest instruction execution latency.`);
    }

    // Additional comparison between two selected processors
    console.log("===============================================");
    const processorXIndex = await askQuestion('Enter the number of Processor X for comparison (If you want the first processor you entered, type 1): ');
    const processorYIndex = await askQuestion('Enter the number of Processor Y for comparison: ');

    const processorX = processors[parseInt(processorXIndex) - 1];
    const processorY = processors[parseInt(processorYIndex) - 1];

    console.log(`Comparing Processor ${processorXIndex} and Processor ${processorYIndex}...`);
    console.log("Solve the following equation for N to find: minimum instructions for Processor X to be better than Processor Y");
    console.log(`${processorX.pipelineLatency} + (N−1) × ${processorX.stageLatency} × ${processorX.issueRate} < ${processorY.pipelineLatency} + (N−1) × ${processorY.stageLatency} × ${processorY.issueRate}`);

    // Wait for user to hit Enter before exiting
    await askQuestion('Press Enter to exit...');
    rl.close();
}

main();