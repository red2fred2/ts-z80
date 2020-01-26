export class Register {

    //variables
    data:number
    numBits:number
    bitMask:number

    //constructor
    constructor(numBits:number) {
        this.numBits = numBits
        this.bitMask = Math.pow(2, this.numBits) - 1
        this.data = 0
    }

    //methods
    set(data:number) {
        let truncated:number = data & this.bitMask

        //check for overflow
        if(truncated != data) {
            console.warn(`Overflow when trying to load ${data} into a(n) ${this.numBits} bit register, truncated to ${truncated}`)
        }

        this.data = truncated
    }

    get() {
        return this.data
    }
}