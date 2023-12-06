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
    // Input for Processor A
    const pipelineStagesA = await askQuestion('Enter the number of pipeline stages for Processor A: ');
    const stageLatencyA = await askQuestion('Enter the stage latency (in ps) for Processor A: ');

    // Input for Processor B
    const pipelineStagesB = await askQuestion('Enter the number of pipeline stages for Processor B: ');
    const stageLatencyB = await askQuestion('Enter the stage latency (in ps) for Processor B: ');

    // Calculating pipeline latencies
    const pipelineLatencyA = parseInt(pipelineStagesA) * parseInt(stageLatencyA);
    const pipelineLatencyB = parseInt(pipelineStagesB) * parseInt(stageLatencyB);

    // Determining minimum instructions for Processor A to be better
    /**
     * Equation: pipelineLatencyA ps+(N−1)×stageLatencyA ps<pipelineLatencyB ps+(N−1)×stageLatencyB ps
     * 
     * USING: Δ=pipelineLatencyB×ps+(N−1)×stageLatencyB×ps−(pipelineLatencyA×ps+(N−1)×stageLatencyA×ps)
     */
    console.log("===============================================")
    console.log("Solve the following equation for N to find : minimum instructions for Processor A to be better");
    console.log(`${pipelineLatencyA}+(N−1)×${stageLatencyA}<${pipelineLatencyB}+(N−1)×${stageLatencyB}`);
    console.log("Note: If you answer is >7 the written answer should be 8 because the next from 7 is 8")

    console.log("Solve the following equation for N to find : minimum instructions for Processor B to be better");
    console.log(`${pipelineLatencyB}+(N−1)×${stageLatencyB}<${pipelineLatencyA}+(N−1)×${stageLatencyA}`);
    console.log("Note: If you answer is >7 the written answer should be 8 because the next from 7 is 8")



    // Determining which processor has the lowest instruction execution latency
    const instructionLatencyA = parseInt(stageLatencyA) * parseInt(pipelineStagesA);
    const instructionLatencyB = parseInt(stageLatencyB) * parseInt(pipelineStagesB);
    console.log("===============================================")
    if (instructionLatencyA < instructionLatencyB) {
        console.log('Processor A has the lowest instruction execution latency.');
    } else if (instructionLatencyB < instructionLatencyA) {
        console.log('Processor B has the lowest instruction execution latency.');
    } else {
        console.log('Both processors have the same instruction execution latency.');
    }

    // Wait for user to hit Enter before exiting
    await askQuestion('Press Enter to exit...');
    rl.close();
}

main();
