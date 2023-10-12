/**
 * @author Carter Kosturos
 * @version 1.0.0
 * 
 * This program calculates common performance formulas
 */

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});


readline.question(`Please enter a number:\n\n1) X is n times faster than Y\n2) CPU Time\n3) Clock rate\n4) Clock cycles\n5) CPI\n6) MIPS\n7) Power\n8) Execution time ratio\n9) T-Improved\n\nChoice: `, (choice) => {

    switch(choice) {
        case "1":
            readline.question("Enter X performance of execution time", (x) => {
                readline.question("Enter Y performance of execution time", (y) => {
                    console.log("\n\nFormula: x/y");
                    console.log(`X is ${x/y} times faster than Y`);
                    readline.close();
                });
            });
        case 2:
            readline.question("Select Choice\n\n1) I have clock cycles and time\n2) I have clock cycles and rate\n3) I have instruction count and CPI \n4) I have a lot of data (Instructions/program, clock cycles/instruction...)\n\nChoice: ", (cpu_choice) => {
                //Formulas:
                /**
                 * Time = Clock cycles * Clock cycle time
                 * Time = Clock cycles / clock rate
                 * Time = Instruction count * CPI * Clock cycle time
                 * Time = Instruction count * CPI / Clock rate
                 * Time = (Instructions/Program) * (Clock cycles/Instruction) * (Seconds/Clock cycle)
                 */
                switch(cpu_choice){
                    case "1":
                        readline.question("Enter clock cycles", (clock_cycles) => {
                            readline.question("Enter clock cycle time", (clock_cycle_time) => {
                                console.log("\n\nFormula: clock cycles * clock cycle time");
                                console.log(`CPU Time: ${clock_cycles * clock_cycle_time}`);
                                readline.close();
                            });
                        });
                        break;
                    case "2":
                        readline.question("Enter clock cycles", (clock_cycles) => {
                            readline.question("Enter clock rate", (clock_rate) => {
                                console.log("\n\nFormula: clock cycles / clock rate");
                                console.log(`CPU Time: ${clock_cycles / clock_rate}`);
                                readline.close();
                            });
                        });
                        break;
                    case "3":
                        readline.question("Do you have\n\n1) Clock cycle time\n2) Clock rate\n\nChoice: ", (cpi_choice) => {
                            switch(cpi_choice){
                                case "1":
                                    readline.question("Enter instruction count", (instruction_count) => {
                                        readline.question("Enter CPI", (cpi) => {
                                            readline.question("Enter clock cycle time", (clock_cycle_time) => {
                                                console.log("\n\nFormula: instruction count * CPI * clock cycle time");
                                                console.log(`CPU Time: ${instruction_count * cpi * clock_cycle_time}`);
                                                readline.close();
                                            });
                                        });
                                    });
                                    break;
                                case "2":
                                    readline.question("Enter instruction count", (instruction_count) => {
                                        readline.question("Enter CPI", (cpi) => {
                                            readline.question("Enter clock rate", (clock_rate) => {
                                                console.log("\n\nFormula: instruction count * CPI / clock rate");
                                                console.log(`CPU Time: ${instruction_count * cpi / clock_rate}`);
                                                readline.close();
                                            });
                                        });
                                    });
                                    break;
                                default:
                                    console.error("Invalid choice");
                                    readline.close();
                                    break;
                            }
                        });
                        break;
                    case "4":
                        readline.question("Enter instructions/program", (instructions_program) => {
                            readline.question("Enter clock cycles/instruction", (clock_cycles_instruction) => {
                                readline.question("Enter seconds/clock cycle", (seconds_clock_cycle) => {
                                    console.log("\n\nFormula: (instructions/program) * (clock cycles/instruction) * (seconds/clock cycle)");
                                    console.log(`CPU Time: ${instructions_program * clock_cycles_instruction * seconds_clock_cycle}`);
                                    readline.close();
                                });
                            });
                        });
                        break;
                    default:
                        console.error("Invalid choice:\nHere are all the formulas:\n");
                        console.log("Time = Clock cycles * Clock cycle time\nTime = Clock cycles / clock rate\nTime = Instruction count * CPI * Clock cycle time\nTime = Instruction count * CPI / Clock rate\nTime = (Instructions/Program) * (Clock cycles/Instruction) * (Seconds/Clock cycle)");
                        readline.close();
                        break;
                }
            })

            break;
        //3) Clock rate
        case 3:
            /**
             * Formulas:
             * Rate = Clock Cycles / Cpu time
             */
            readline.question("Enter clock cycles", (clock_cycles) => {
                readline.question("Enter CPU time", (cpu_time) => {
                    console.log("\n\nFormula: clock cycles / CPU time");
                    console.log(`Clock rate: ${clock_cycles / cpu_time}`);
                    readline.close();
                }); 
            })
            break;
        //4) Clock cycles
        case "4":
            /**
             * Formulas:
             * Clock cycles = CPU time * Clock rate
             * Clock cycles = Instruction count * CPI
             * Clock cycles = sum of i=1, n (CPIi * ICi)
             */

            readline.question("Select Choice\n\n1) I have CPU time and clock rate\n2) I have instruction count and CPI\n3) I have a lot of data (CPIi * ICi)\n\nChoice: ", (clock_cycles_choice) => {
                switch(clock_cycles_choice){
                    case "1":
                        readline.question("Enter CPU time", (cpu_time) => {
                            readline.question("Enter clock rate", (clock_rate) => {
                                console.log("\n\nFormula: CPU time * clock rate");
                                console.log(`Clock cycles: ${cpu_time * clock_rate}`);
                                readline.close();
                            });
                        });
                        break;
                    case "2":
                        readline.question("Enter instruction count", (instruction_count) => {
                            readline.question("Enter CPI", (cpi) => {
                                console.log("\n\nFormula: instruction count * CPI");
                                console.log(`Clock cycles: ${instruction_count * cpi}`);
                                readline.close();
                            });
                        });
                        break;
                    case "3":
                        readline.question("Enter number of instructions", (num_instructions) => {
                            let total = 0;
                            for(let i = 0; i < num_instructions; i++){
                                readline.question(`Enter CPI${i}`, (cpi) => {
                                    readline.question(`Enter IC${i}`, (ic) => {
                                        total += cpi * ic;
                                    });
                                });
                            }
                            console.log("\n\nFormula: sum of i=1, n (CPIi * ICi)");
                            console.log(`Clock cycles: ${total}`);
                            readline.close();
                        });
                        break;
                    default:
                        console.error("Invalid choice");
                        readline.close();
                        break;
                }
            })
            break;
        //5) CPI
        case "5":
            /**
             * Formulas:
             * CPI = Clock cycles / Instruction count
             * Weighted CPI = sum of i=1, n cpi * (ic / total ic) 
             *    (ic / total ic) could also be relative frequency
             */

            readline.question("Select Choice\n\n1) I have clock cycles and instruction count\n2) I have a lot of data (CPIi * (ICi / total IC))\n\nChoice: ", (cpi_choice) => {
                switch(cpi_choice){
                    case "1":
                        readline.question("Enter clock cycles", (clock_cycles) => {
                            readline.question("Enter instruction count", (instruction_count) => {
                                console.log("\n\nFormula: clock cycles / instruction count");
                                console.log(`CPI: ${clock_cycles / instruction_count}`);
                                readline.close();
                            });
                        });
                        break;
                    case "2":
                        readline.question("Enter number of instructions", (num_instructions) => {
                            let total = 0;
                            for(let i = 0; i < num_instructions; i++){
                                readline.question(`Enter CPI${i}`, (cpi) => {
                                    readline.question(`Enter IC${i}`, (ic) => {
                                        total += cpi * (ic / total);
                                    });
                                });
                            }
                            console.log("\n\nFormula: sum of i=1, n cpi * (ic / total ic)");
                            console.log(`CPI: ${total}`);
                            readline.close();
                        });
                        break;
                    default:
                        console.error("Invalid choice");
                        readline.close();
                        break;
                }
            })
            break;
        //6) MIPS
        /**
         * Formulas:
         * MIPS = Instruction count / (CPU time * 10^6)
         * MIPS = Clock Rate / (CPI * 10^6)
         * MIPS = Instruction Count / (((Instruction Count * CPI) / Clock Rate) * 10^6)
         */

        case "6":
            readline.question("Select Choice\n\n1) I have instruction count and CPU time\n2) I have clock rate and CPI\n3) I have a lot of data (IC / ((IC * CPI) / Clock Rate))\n\nChoice: ", (mips_choice) => {
                switch(mips_choice){
                    case "1":
                        readline.question("Enter instruction count", (instruction_count) => {
                            readline.question("Enter CPU time", (cpu_time) => {
                                console.log("\n\nFormula: instruction count / (CPU time * 10^6)");
                                console.log(`MIPS: ${instruction_count / (cpu_time * 10^6)}`);
                                readline.close();
                            });
                        });
                        break;
                    case "2":
                        readline.question("Enter clock rate", (clock_rate) => {
                            readline.question("Enter CPI", (cpi) => {
                                console.log("\n\nFormula: clock rate / (CPI * 10^6)");
                                console.log(`MIPS: ${clock_rate / (cpi * 10^6)}`);
                                readline.close();
                            });
                        });
                        break;
                    case "3":
                        readline.question("Enter number of instructions", (num_instructions) => {
                            let total = 0;
                            for(let i = 0; i < num_instructions; i++){
                                readline.question(`Enter CPI${i}`, (cpi) => {
                                    readline.question(`Enter IC${i}`, (ic) => {
                                        total += ic / ((ic * cpi) / clock_rate);
                                    });
                                });
                            }
                            console.log("\n\nFormula: IC / ((IC * CPI) / Clock Rate)");
                            console.log(`MIPS: ${total}`);
                            readline.close();
                        });
                        break;
                    default:
                        console.error("Invalid choice");
                        readline.close();
                        break;
                }
            })
            break;
        //7) Power
        case "7":
            /**
             * Formulas:
             * Power = Capacitance * Voltage^2 * Frequency
             */

            readline.question("Enter capacitance", (capacitance) => {
                readline.question("Enter voltage", (voltage) => {
                    readline.question("Enter frequency", (frequency) => {
                        console.log("\n\nFormula: capacitance * voltage^2 * frequency");
                        console.log(`Power: ${capacitance * voltage^2 * frequency}`);
                        readline.close();
                    });
                });

            })
            break;
        case "8":
            /**
             * Formulas:
             * Geometric Mean = nth root of (Product of Execution time ratios)
             */
        
            let product = 1;
            let count = 0;
        
            function getRatio() {
                readline.question("Enter execution time ratio (or 'done' to finish): ", (ratio) => {
                    if (ratio === "done") {
                        let geometricMean = Math.pow(product, 1 / count);
                        console.log("\n\nFormula: nth root of (Product of Execution time ratios)");
                        console.log(`Geometric Mean: ${geometricMean}`);
                        readline.close();
                    } else {
                        product *= parseFloat(ratio);
                        count++;
                        getRatio(); // Get the next ratio
                    }
                });
            }
        
            getRatio();
            break;
        case "9":
            /**
             * Formulas:
             * Timproved =  ((Taffected)/Improvement Factor) * Tunaffected
             */

            readline.question("Enter affected time", (affected_time) => {
                readline.question("Enter unaffected time", (unaffected_time) => {
                    readline.question("Enter improvement factor", (improvement_factor) => {
                        console.log("\n\nFormula: ((Taffected)/Improvement Factor) * Tunaffected");
                        console.log(`TImproved: ${((affected_time)/improvement_factor) * unaffected_time}`);
                        readline.close();
                    });
                });
            })
            break;
        default:
            console.error("Invalid choice");
            readline.close();
            break;
    }
});

readline.question(`Press enter to exit`, (dummy) => {
    readline.close();
});