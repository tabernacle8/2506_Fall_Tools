/**
 * @author Carter Kosturos
 * @version 1.0.0
 * 
 * This program virtualizes a cache with a given block size and cache size.
 * 
 * Written in part by GPT-4 cuz im lazy
 */
const readline = require('readline');

const blockSize = 4; // Set the block size
const cacheSize = 8; // Number of blocks in cache
let cache = Array(cacheSize).fill(-1); // Initialize cache

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to calculate block number and index
function calculateBlockNumberAndIndex(address) {
  const blockNumber = Math.floor(address / blockSize);
  const index = blockNumber % cacheSize;
  return { blockNumber, index };
}

// Function to check if it's a hit or miss and update cache accordingly
function checkCacheHitOrMiss(address) {
  const { blockNumber, index } = calculateBlockNumberAndIndex(address);
  const hitOrMiss = cache[index] === blockNumber ? 'H' : 'M';

  // Update cache on a miss
  if (hitOrMiss === 'M') {
    cache[index] = blockNumber;
  }

  console.log(`Address: ${address}, Block Number: ${blockNumber}, Index: ${index}, Result: ${hitOrMiss}`);
}

// Function to prompt the user for the next memory address
function promptForNextAddress() {
  rl.question('Enter memory address (or "exit" to quit): ', (input) => {
    if (input === 'exit') {
      rl.close(); // Close the readline interface
    } else {
      const address = parseInt(input, 10);
      if (isNaN(address)) {
        console.log('Please enter a valid number.');
      } else {
        checkCacheHitOrMiss(address);
      }
      promptForNextAddress(); // Prompt for the next input
    }
  });
}

console.log('Cache simulation started. Type "exit" to quit.');
promptForNextAddress(); // Start by prompting for the first input

// Handle readline close event
rl.on('close', () => {
  console.log('Cache simulation ended.');
  process.exit(0);
});
