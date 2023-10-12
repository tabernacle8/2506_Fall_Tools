/**
 * @author Carter Kosturos
 * @version 1.1.0
 * 
 * This program takes a 32-bit binary string and converts it to a RISC-V instruction.
 */


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question(`Please enter binary or hex with 0x: `, (binary) => {
    if(binary.substring(0,2) === "0x"){
        binary = parseInt(binary, 16).toString(2);

        if(binary.length<32){
            console.log("Auto extending hex by zero, this is expected")
        }
        while (binary.length < 32) {
            binary = "0" + binary;
        }
    }

    console.log("Binary: " + binary);
    if(binary.length<32){
        console.log("AUTO EXTENDING BINARY INPUT ARE YOU SURE YOU ENTERED IT RIGHT?")
    }
    while (binary.length < 32) {
        binary = "0" + binary;
    }

    // Get last 7 bits for opcode
    var opcode = binary.substring(binary.length - 7);
    console.log("Opcode: " + opcode);

    readline.question(`Please enter type (J,U,I,R,B,S): `, (type) => {
        switch (type) {
            case "J":
            case "U":
                var immediate = binary.substring(0, 20);
                var rd = binary.substring(20, 25);
                console.log("rd: " + rd);
                console.log("immediate: " + immediate);
                break;
            case "I":
                var immediate = binary.substring(0, 12);
                var rs1 = binary.substring(12, 17);
                var funct3 = binary.substring(17, 20);
                var rd = binary.substring(20, 25);
                console.log("rd: " + rd);
                console.log("funct3: " + funct3);
                console.log("rs1: " + rs1);
                console.log("immediate: " + immediate);
                //Format: instruction rd, immediate(rs1)
                //Print this, with binary converted to decimal'
                console.log("==============================")
                console.log("instruction x" + parseInt(rd, 2) + ", " + parseInt(immediate, 2) + "(x" + parseInt(rs1, 2) + ")");
                //OR rd, rs1, imm
                console.log("OR x" + parseInt(rd, 2) + ", x" + parseInt(rs1, 2) + ", " + parseInt(immediate, 2));
                break;
            case "R":
                var funct7 = binary.substring(0, 7);
                var rs2 = binary.substring(7, 12);
                var rs1 = binary.substring(12, 17);
                var funct3 = binary.substring(17, 20);
                var rd = binary.substring(20, 25);
                console.log("rd: " + rd);
                console.log("funct3: " + funct3);
                console.log("rs1: " + rs1);
                console.log("rs2: " + rs2);
                console.log("funct7: " + funct7);
                //Format: add rd, rs1, rs2
                //Print this, with binary converted to decimal
                console.log("==============================")
                console.log("instruction x" + parseInt(rd, 2) + ", x" + parseInt(rs1, 2) + ", x" + parseInt(rs2, 2));
                break;
            case "B":
            case "S":
                var imm_part1 = binary.substring(0, 7);
                var rs2 = binary.substring(7, 12);
                var rs1 = binary.substring(12, 17);
                var funct3 = binary.substring(17, 20);
                var imm_part2 = binary.substring(20, 25);
                console.log("opcode: " + opcode);
                console.log("imm_part1: " + imm_part1);
                console.log("imm_part2: " + imm_part2);
                console.log("funct3: " + funct3);
                console.log("rs1: " + rs1);
                console.log("rs2: " + rs2);
                //Format Instruction rs1, rs2, immediate
                //OR rs2, Imm12(rs1)
                //Print this with binary converted to decimal
                console.log("==============================")
                console.log("instruction x" + parseInt(rs1, 2) + ", x" + parseInt(rs2, 2) + ", " + parseInt(imm_part1 + imm_part2, 2));
                console.log("OR x" + parseInt(rs2, 2) + ", " + parseInt(imm_part1 + imm_part2, 2) + "(x" + parseInt(rs1, 2) + ")");
                break;
            default:
                console.log("Invalid type");
                break;
        }
        readline.close();
    });
});

//Ask a dummy question to keep the program running
readline.question(`Press enter to exit`, (dummy) => {
    readline.close();
});