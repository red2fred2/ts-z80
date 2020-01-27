export class Multiplexer {

    //variables
    private numInputs:number

    /**
     * Constructor
     * @param numInputs specifies the number of inputs to this mux
     */
    public constructor(numInputs:number) {
        this.numInputs = numInputs
    }

    /**
     * Decides which input to use, and outputs it
     * @param inputs options to choose from
     * @param choice the chosen option
     * @return the chosen input
     */
    public evaluate(inputs:number[], choice:number) {
        //error checking
        if(choice > this.numInputs || choice < 0) {
            console.trace('Multiplexer choice is out of range')
            process.exit(1)
        }
        if(this.numInputs != inputs.length) {
            console.trace('Multiplexer input the wrong size')
            process.exit(1)
        }

        return inputs[choice]
    }
}
