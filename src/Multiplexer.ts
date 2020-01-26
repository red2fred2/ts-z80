export class Multiplexer {

    //variables
    numInputs:number

    //constructor
    constructor(numInputs:number) {
        this.numInputs = numInputs
    }

    //methods
    evaluate(inputs:number[], choice:number) {
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
