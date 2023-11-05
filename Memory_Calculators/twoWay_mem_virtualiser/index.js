/**
 * @author Carter Kosturos
 * @version 1.0.0
 * 
 * This program virtualizes a two-way cache with a given block size and cache size.
 * 
 * Written in part by GPT-4 cuz im lazy
 */
const readline = require('readline');

const blockSize = 4; // Set the block size
const numberOfSets = 8; // Number of sets in the cache
const associativity = 2; // Two-way set associative

// Initialize cache, each set can store 'associativity' number of blocks
let cache = new Array(numberOfSets);
for (let i = 0; i < numberOfSets; i++) {
  cache[i] = { blocks: new Array(associativity).fill(-1), lru: 0 };
}

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to calculate block number and set index
function calculateBlockNumberAndSetIndex(address) {
  const blockNumber = Math.floor(address / blockSize);
  const setIndex = blockNumber % numberOfSets;
  return { blockNumber, setIndex };
}

// Function to update the LRU information
function updateLRU(setIndex, accessedIndex) {
  let set = cache[setIndex];
  set.lru = set.lru === accessedIndex ? (accessedIndex + 1) % associativity : accessedIndex;
}

// Function to check if it's a hit or miss and update cache accordingly
function checkCacheHitOrMiss(address) {
  const { blockNumber, setIndex } = calculateBlockNumberAndSetIndex(address);
  const set = cache[setIndex].blocks;
  let hitOrMiss = 'M';
  let replacedBlock = null;

  // Check if block is already in cache (hit)
  for (let i = 0; i < associativity; i++) {
    if (set[i] === blockNumber) {
      hitOrMiss = 'H';
      updateLRU(setIndex, i);
      break;
    }
  }

  // On miss, replace the LRU block
  if (hitOrMiss === 'M') {
    const lruIndex = cache[setIndex].lru;
    replacedBlock = set[lruIndex];
    set[lruIndex] = blockNumber;
    updateLRU(setIndex, lruIndex);
  }

  console.log(`Address: ${address}, Block Number: ${blockNumber}, Set Index: ${setIndex}, Replaced Block: ${replacedBlock}, Result: ${hitOrMiss}`);
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
