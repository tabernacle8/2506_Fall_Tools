/**
 * @author Carter Kosturos
 * @version 1.0.0
 * 
 * This program calculates the number of bits for the offset, set index, and tag
 * 
 * Written in part by GPT-4 cuz im lazy
 * --Signed tabernacle800@gmail.com
 */
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

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
  const indexBitRange = `${offsetBits}-${offsetBits + indexBits - 1}`;
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

function promptUser() {
  readline.question('Enter the number of address bits: ', addressBits => {
    addressBits = parseInt(addressBits);

    readline.question('Enter the cache size in Kilobytes: ', cacheSizeKB => {
      cacheSizeKB = parseInt(cacheSizeKB);

      readline.question('Enter the block size in bytes: ', blockSizeBytes => {
        blockSizeBytes = parseInt(blockSizeBytes);
        
        readline.question('Enter the cache associativity (e.g., 1 for direct-mapped, 2 for 2-way set associative, etc.): ', associativity => {
          associativity = parseInt(associativity);

          const result = calculateCacheDetails(addressBits, cacheSizeKB, blockSizeBytes, associativity);
          console.log(`Number of offset bits: ${result.offsetBits} (Bits: ${result.offsetBitRange})`);
          console.log(`Number of index bits: ${result.indexBits} (Bits: ${result.indexBitRange})`);
          console.log(`Number of tag bits: ${result.tagBits} (Bits: ${result.tagBitRange})`);
          console.log(`Total number of tags when the cache is full: ${result.totalTags}`);
          console.log(`Number of tag comparators per set: ${associativity}`);

          pauseBeforeExit();
          readline.close();
        });
      });
    });
  });
}

promptUser();

