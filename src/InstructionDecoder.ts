import {Instruction} from './Instruction'

/**
 * Part that turns instructions into actions
 */
export class InstructionDecoder {

    //variables
    instructions:Instruction[]

    /**
     * Constructor
     * @param instructions array of possible instructions
     */
    constructor(instructions:Instruction[]) {
        this.instructions = instructions
    }

    /**
     * Runs the instruction that corresponds to the key
     * @param key the name of the instruction
     * @return whatever the instruction returns
     */
    run(key:string, ...params:any[]) {
        //find matching instructions
        const matches = this.instructions.filter((ins:Instruction)=>ins.key == key)

        //check if it exists
        if(matches.length < 1) {
            console.warn(`Instruction '${key}' does not exist`)
        }

        //check for ambiguity
        else if(matches.length > 1) {
            console.warn(`Instruction '${key}' is defined more than once`)
        } else {
            return matches[0].run(...params)
        }
    }

}
