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
        const issueRate = await askQuestion('Enter the issue rate (X multiple issue): ');
        const efficiencyRate = await askQuestion('Enter the efficiency rate (as a percentage) Ex: This processor is 2-multiple issue 80% of the time, enter 80: ');

        processors.push({
            pipelineStages: parseFloat(pipelineStages),
            stageLatency: parseFloat(stageLatency),
            issueRate: parseFloat(issueRate),
            efficiencyRate: parseFloat(efficiencyRate) / 100,
            pipelineLatency: parseFloat(pipelineStages) * parseFloat(stageLatency)
        });
    }

    console.log("===============================================");
    console.log("Comparing processors...");

    // Determine the processor with the lowest instruction execution latency
    let minLatency = Number.MAX_SAFE_INTEGER;
    let fastestProcessor = null;
    processors.forEach((processor, index) => {
        if (processor.pipelineLatency < minLatency) {
            minLatency = processor.pipelineLatency;
            fastestProcessor = index + 1;
        }
    });

    console.log(`Processor ${fastestProcessor} has the lowest instruction execution latency at ${minLatency}ps`);

    // Additional comparison between two selected processors
    console.log("===============================================");
    const processorXIndex = await askQuestion('Enter the number of Processor X for comparison: ');
    const processorYIndex = await askQuestion('Enter the number of Processor Y for comparison: ');

    const processorX = processors[parseInt(processorXIndex) - 1];
    const processorY = processors[parseInt(processorYIndex) - 1];

    console.log(`Comparing Processor ${processorXIndex} and Processor ${processorYIndex}...`);
    console.log("Solve the following equation for N to find: minimum instructions for Processor X to be better than Processor Y");

    const initialLatencyX = (processorX.pipelineStages - 1) * processorX.stageLatency;
    const initialLatencyY = (processorY.pipelineStages - 1) * processorY.stageLatency;

    console.log(`YOU NEED TO TAKE INTO ACCOUNT STAGES. FOR EXAMPLE IF INEQUALITY >4 YOU NEED TO ADD ${processorX.issueRate} TO YOUR ANSWER TO GET 4+${processorX.issueRate}`)
    console.log(`${initialLatencyX} + ((${processorX.stageLatency} * N) / ${processorX.issueRate}) < ${initialLatencyY} + ((${processorY.stageLatency} * N) / ${processorY.issueRate})`);



    // Wait for user to hit Enter before exiting
    await askQuestion('Press Enter to exit...');
    rl.close();
}

main();
