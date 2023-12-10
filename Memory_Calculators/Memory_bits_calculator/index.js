/**
 * @author Carter Kosturos
 * @version 1.0.0
 * 
 * This program calculates the number of bits for the offset, set index, and tag
 * 
 * Written in part by GPT-4 cuz im lazy
 */


const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => {
    readline.question(query, resolve);
  });
}

function pauseBeforeExit() {
  const rl = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
  });

  rl.question('Press any key to exit...', () => {
      rl.close();
      process.exit();
  });
}


function calculateCacheDetails(addressBits, cacheSizeKB, blockSizeBytes, associativity) {
  const numBlocks = (cacheSizeKB * 1024) / blockSizeBytes; // Calculate number of blocks in the cache
  const numSets = numBlocks / associativity; // For N-way set associative, where N is the associativity

  // Calculate the number of bits for the offset, set index, and tag
  const offsetBits = Math.log2(blockSizeBytes);
  const indexBits = Math.log2(numSets);
  const tagBits = addressBits - indexBits - offsetBits;

  // Each block will have one tag, so the total tags is the same as the number of blocks
  const totalTags = numBlocks;

  // Number of tag comparators (associativity * numSets)
  const numTagComparators = associativity * numSets;

  const offsetBitRange = `0-${offsetBits - 1}`;
  var indexBitRange = `Error`
  if(indexBits!=0){
  indexBitRange = `${offsetBits}-${offsetBits + indexBits - 1}`;
  }
  else{
    indexBitRange = `No index bits, fully associative detected. Didn't expect this? Forced output is: ${offsetBits}-${offsetBits + indexBits - 1}`
  }
  const tagBitRange = `${offsetBits + indexBits}-${addressBits - 1}`;

  return {
    offsetBits: offsetBits,
    indexBits: indexBits,
    tagBits: tagBits,
    totalTags: totalTags,
    numTagComparators: numTagComparators,
    offsetBitRange: offsetBitRange,
    indexBitRange: indexBitRange,
    tagBitRange: tagBitRange
  };
}

function invalidMessage(message){
  console.log("=============================================")
  console.log("STRANGE INPUT DETECTED, "+message);
  console.log("=============================================")
}

function calculateAssociativity(cacheSizeKB, blockSizeBytes) {
  const cacheSizeBytes = cacheSizeKB * 1024; // Convert cache size to bytes
  return cacheSizeBytes / blockSizeBytes; // Compute and return associativity
}

function promptUser() {
  readline.question('Enter the number of address bits (Usually given as "X bit processor"): ', addressBits => {
    addressBits = parseFloat(addressBits);
    console.log("Block size = Words per block * Size of word in BYTES")
    console.log("Cache size = Number of blocks * Block size")

    readline.question('Enter the cache size in Kilobytes: ', cacheSizeKB => {
      cacheSizeKB = parseFloat(cacheSizeKB);

      readline.question('Enter the block size in bytes: ', blockSizeBytes => {
        blockSizeBytes = parseFloat(blockSizeBytes);
        
        console.log(`IF FULLY ASSOCIATIVE, ENTER ${calculateAssociativity(cacheSizeKB, blockSizeBytes)} NOW`)
        readline.question('Enter the cache associativity (e.g., 1 for direct-mapped, 2 for 2-way set associative, etc.): ', associativity => {
          associativity = parseFloat(associativity);

          var strangeInput = false;
          //Sanity checks
          if(addressBits<=0 || cacheSizeKB<=0 || blockSizeBytes<=0 || associativity<=0){
            invalidMessage("VALUES ENTERED ARE 0 OR NEGATIVE");
            strangeInput = true;
          }

          if(addressBits !== 32 && addressBits !== 64) {
            invalidMessage("Invalid number of address bits. RISC-V typically uses 32 or 64 bits.");
            strangeInput = true;
          }

          if(cacheSizeKB < 1 || cacheSizeKB > 8192) {
            invalidMessage("Cache size is outside of usual range.");
            strangeInput = true;
          }

          if(!Number.isInteger(Math.log2(blockSizeBytes))) {
            invalidMessage("Block size should be a power of 2.");
            strangeInput = true;
          }

          if(!Number.isInteger(Math.log2(associativity)) || associativity <= 0) {
            invalidMessage("Cache associativity should be a positive power of 2.");
            strangeInput = true;
          }

          if((cacheSizeKB * 1024) % (blockSizeBytes * associativity) !== 0) {
            invalidMessage("Cache size is not a multiple of block size times associativity.");
            strangeInput = true;
          }

          if(isNaN(addressBits) || isNaN(cacheSizeKB) || isNaN(blockSizeBytes) || isNaN(associativity)) {
            invalidMessage("Please enter numeric values only.");
            strangeInput = true;
          }

          if(!strangeInput){
          console.log("Sanity checks ran successfully, found no issues")
          }

          console.log("~~~~~~~~~~~~~~~~~~~~~~~~~Calculation Output~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

          const result = calculateCacheDetails(addressBits, cacheSizeKB, blockSizeBytes, associativity);
          console.log(`Number of offset bits: ${result.offsetBits} (Bits: ${result.offsetBitRange})`);
          console.log(`Number of index bits: ${result.indexBits} (Bits: ${result.indexBitRange})`);
          console.log(`Number of tag bits: ${result.tagBits} (Bits: ${result.tagBitRange})`);
          console.log(`Total number of tags when the cache is full: ${result.totalTags}`);
          console.log(`Number of tag comparators per set: ${associativity}`);

        });
      });
    });
  });
}

async function stall(){
  await askQuestion('Press Enter to exit...');
}

promptUser();
stall();

