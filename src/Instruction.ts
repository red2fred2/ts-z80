/**
 * A representation of a computer instruction
 */
export class Instruction {

    //variables
    public key:number
    public action:Function

    /**
     * Constructor
     * @param key the name used to trigger the action
     * @param action the function to run
     */
    public constructor(key:number, action:Function) {
        this.key = key
        this.action = action
    }

    /**
     * Runs the function for this instruction
     * @return whatever the function returns
     */
    public run(...params:any[]) {
        return this.action(...params)
    }
}
