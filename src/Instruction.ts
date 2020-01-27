/**
 * A representation of a computer instruction
 */
export class Instruction {

    //variables
    key:string
    action:Function

    /**
     * Constructor
     * @param key the name used to trigger the action
     * @param action the function to run
     */
    constructor(key:string, action:Function) {
        this.key = key
        this.action = action
    }

    /**
     * Runs the function for this instruction
     * @return whatever the function returns
     */
    run(...params:any[]) {
        return this.action(...params)
    }

}
