/**
 * @author Carter Kosturos
 * @version 1.1.0
 * 
 * This program converts RISC-V instructions to binary.
 */

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function decToBinary(dec, length) {
    let bin = (dec >>> 0).toString(2); // Convert to binary
    while (bin.length < length) {
        bin = '0' + bin; // Add leading zeros if needed
    }
    return bin;
}

function extendHexTo8Digits(hex) {
    while (hex.length < 8) {
        hex = '0' + hex;
    }
    return hex;
}

readline.question(`Please enter instruction (Example: lbu x29, 0(x10): `, (instruction) => {
    let format;

    // Check the instruction format
    if (/^[\w]+\s+x\d+,\s+\d+\(x\d+\)$/.test(instruction)) {
        format = 1;
    } else if (/^[\w]+\s+x\d+,\s+x\d+,\s+\d+$/.test(instruction)) {
        format = 2;
    } else if (/^[\w]+\s+x\d+,\s+\d+$/.test(instruction)) {
        format = 3;
    } else if (/^[\w]+\s+x\d+,\s+x\d+,\s+x\d+$/.test(instruction)) {
        format = 4;
    } else {
        console.error("Invalid instruction format!");
        readline.close();
        return;
    }

    readline.question('Please enter desired format (J, U, I, R): ', (formatType) => {
        if (!['J', 'U', 'I', 'R'].includes(formatType)) {
            console.error("Invalid format type!");
            readline.close();
            return;
        }

        readline.question('Please enter opcode (binary, 7 bits): ', (opcode) => {
            if (opcode.length !== 7 || !/^[01]+$/.test(opcode)) {
                console.error("Invalid opcode!");
                readline.close();
                return;
            }

            if (formatType === 'I') {
                readline.question('Please enter funct3 (binary, 3 bits): ', (funct3) => {
                    if (funct3.length !== 3 || !/^[01]+$/.test(funct3)) {
                        console.error("Invalid funct3!");
                        readline.close();
                        return;
                    }
                    
                    let matches, rd, rs1, imm;
            
                    if (format === 1) { 
                        matches = instruction.match(/^[\w]+\s+(x\d+),\s+(\d+)\(x(\d+)\)$/);
                        rd = decToBinary(parseInt(matches[1].substr(1)), 5);
                        rs1 = decToBinary(parseInt(matches[3]), 5);  // fix here
                        imm = decToBinary(parseInt(matches[2]), 12); // and here
                    } else if (format === 2) {
                        matches = instruction.match(/^[\w]+\s+(x\d+),\s+(x\d+),\s+(\d+)$/);
                        rd = decToBinary(parseInt(matches[1].substr(1)), 5);
                        rs1 = decToBinary(parseInt(matches[2].substr(1)), 5);
                        imm = decToBinary(parseInt(matches[3]), 12);
                    }
            
                    const binary = `${imm}${rs1}${funct3}${rd}${opcode}`;
                    console.log("\nBinary format: ${imm}${rs1}${funct3}${rd}${opcode}")
                    console.log(`Binary representation (I-type): ${binary}`);
                    console.log(`Hex representation (I-type): ${extendHexTo8Digits(parseInt(binary, 2).toString(16))}`)
                    readline.close();
                });
            }
            else if (formatType === 'R') {
                readline.question('Please enter funct3 (binary, 3 bits): ', (funct3) => {
                    if (funct3.length !== 3 || !/^[01]+$/.test(funct3)) {
                        console.error("Invalid funct3!");
                        readline.close();
                        return;
                    }

                    readline.question('Please enter funct7 (binary, 7 bits): ', (funct7) => {
                        if (funct7.length !== 7 || !/^[01]+$/.test(funct7)) {
                            console.error("Invalid funct7!");
                            readline.close();
                            return;
                        }

                        let matches, rd, rs1, rs2;

                        matches = instruction.match(/^[\w]+\s+(x\d+),\s+(x\d+),\s+(x\d+)$/);
                        rd = decToBinary(parseInt(matches[1].substr(1)), 5);
                        rs1 = decToBinary(parseInt(matches[2].substr(1)), 5);
                        rs2 = decToBinary(parseInt(matches[3].substr(1)), 5);

                        

                        const binary = `${funct7}${rs2}${rs1}${funct3}${rd}${opcode}`;
                        console.log("\nBinary format: ${funct7}${rs2}${rs1}${funct3}${rd}${opcode}")
                        console.log(`Binary representation: ${binary}`);
                        console.log(`Hex representation: ${extendHexTo8Digits(parseInt(binary, 2).toString(16))}`)
                        readline.close();
                    });
                });
            }
            else if (['J', 'U'].includes(formatType)) {
                readline.question('Please enter imm (binary, 20 bits for J, 20 bits for U): ', (imm) => {
                    if (imm.length !== 20 || !/^[01]+$/.test(imm)) {
                        console.error("Invalid immediate!");
                        readline.close();
                        return;
                    }
                    
                    let matches, rd;
            
                    if (format === 3) { 
                        matches = instruction.match(/^[\w]+\s+(x\d+),\s+(\d+)$/);
                        rd = decToBinary(parseInt(matches[1].substr(1)), 5);
                    }
                    
                    const binary = `${imm}${rd}${opcode}`;
                    console.log("\nBinary format: ${imm}${rd}${opcode}")
                    console.log(`Binary representation (${formatType}-type): ${binary}`);
                    console.log(`Hex representation (${formatType}-type): ${extendHexTo8Digits(parseInt(binary, 2).toString(16))}`)
                    readline.close();
                });
            }
        });
    });
});
