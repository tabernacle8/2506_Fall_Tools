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
  
  function calculateCacheDetails(addressBits, cacheSizeKB, blockSizeBytes) {
    const numBlocks = (cacheSizeKB * 1024) / blockSizeBytes; // Calculate number of blocks in the cache
    const numSets = numBlocks / 2; // For two-way set associative
  
    // Calculate the number of bits for the offset, set index, and tag
    const offsetBits = Math.log2(blockSizeBytes);
    const indexBits = Math.log2(numSets);
    const tagBits = addressBits - indexBits - offsetBits;
  
    // Each block will have one tag, so the total tags is the same as the number of blocks
    const totalTags = numBlocks;
  
    return {
      offsetBits: offsetBits,
      indexBits: indexBits,
      tagBits: tagBits,
      totalTags: totalTags
    };
  }
  
  function promptUser() {
    readline.question('Enter the number of address bits: ', addressBits => {
      addressBits = parseInt(addressBits);
  
      readline.question('Enter the cache size in Kilobytes: ', cacheSizeKB => {
        cacheSizeKB = parseInt(cacheSizeKB);
  
        readline.question('Enter the block size in bytes: ', blockSizeBytes => {
          blockSizeBytes = parseInt(blockSizeBytes);
  
          const result = calculateCacheDetails(addressBits, cacheSizeKB, blockSizeBytes);
          console.log(`Number of offset bits: ${result.offsetBits}`);
          console.log(`Number of index bits: ${result.indexBits}`);
          console.log(`Number of tag bits: ${result.tagBits}`);
          console.log(`Total number of tags when the cache is full: ${result.totalTags}`);
  
          readline.close();
        });
      });
    });
  }
  
  promptUser();  