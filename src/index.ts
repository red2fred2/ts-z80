import {CPU} from './CPU'
const readline = require('readline-sync')

let cpu:CPU = new CPU()

//interactive loop
let running:boolean = true
while(running) {

    //take input
    const instruction:string = readline.question('Instruction: ')

    if(instruction == 'quit' || instruction == 'exit') break

    //run command
    const output:any = cpu.run(instruction)

    //give output
    console.log(`[${instruction}] returned ${output}`)
}
