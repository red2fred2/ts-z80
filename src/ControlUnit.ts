import {Instruction} from './Instruction'

/**
 * Controls the CPU based on the instruction received
 */
export class ControlUnit {

    //variables
    private instructions:Instruction[]

    /**
     * Constructor
     * @param instructions array of possible instructions
     */
    public constructor(instructions:Instruction[]) {
        this.instructions = instructions
    }

    /**
     * Runs the instruction that corresponds to the key
     * @param key the name of the instruction
     * @return whatever the instruction returns
     */
    public run(key:number, param:number) {
        //find matching instructions
        const matches = this.instructions.filter((ins:Instruction)=>ins.key == key)

        //check instruction matches
        if(matches.length < 1) {
            console.warn(`Instruction '${key}' does not exist`)
        } else if(matches.length > 1) {
            console.warn(`Instruction '${key}' is defined more than once`)
        } else {
            return matches[0].run(param)
        }
    }
}
