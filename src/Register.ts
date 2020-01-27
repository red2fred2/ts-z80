export class Register {

    //variables
    private data:number
    private numBits:number
    private bitMask:number

    //constructor
    constructor(numBits:number) {
        this.numBits = numBits
        //create bitmask from bit size
        this.bitMask = Math.pow(2, this.numBits) - 1
        this.data = 0
    }

    //methods
    set(data:number) {
        //truncate number to the correct number of bits
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
