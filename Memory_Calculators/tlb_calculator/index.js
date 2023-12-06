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

// Function to calculate the physical address size in bits
function calculatePhysicalAddressSize(dramSizeKB) {
  const totalBytes = dramSizeKB * 1024;
  return Math.log2(totalBytes);
}

// Function to calculate the number of bits in each TLB entry
function calculateTLBEntrySize(virtualAddressBits, pageSizeKB) {
  const pageOffsetBits = Math.log2(pageSizeKB * 1024);
  const tagBits = virtualAddressBits - pageOffsetBits;
  const physicalAddressBits = Math.log2(1024 * 1024); // Assuming 1 MB DRAM
  const physicalPageNumberBits = physicalAddressBits - pageOffsetBits;
  return 1 + tagBits + physicalPageNumberBits;
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define the calculation functions here

// Main program logic
function main() {
  rl.question('Which problem would you like to solve?\n1. Physical Address Size\n2. TLB Entry Size\nEnter choice (1 or 2): ', (choice) => {
    // Include the logic for both choices
    if (choice === '1') {
        rl.question('Enter the size of DRAM in Kilobytes: ', (dramSize) => {
          const size = calculatePhysicalAddressSize(parseInt(dramSize));
          console.log(`The physical address size is ${size} bits.`);
          //rl.close();
        });
      } else if (choice === '2') {
        rl.question('Enter the size of virtual address in bits: ', (virtualAddressSize) => {
          rl.question('Enter the page size in Kilobytes: ', (pageSize) => {
            const size = calculateTLBEntrySize(parseInt(virtualAddressSize), parseInt(pageSize));
            console.log(`Each TLB entry requires ${size} bits.`);
            //rl.close();
          });
        });
      } else {
        console.log('Invalid choice. Please restart the program and select either 1 or 2.');
        //rl.close();
      }
    // After finishing the logic, prompt the user to press enter to exit
    rl.question('Press enter to exit', () => {
      rl.close();
    });
  });
}

// Call the main function to start the program
main();
