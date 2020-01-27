/**
 * Represents a register inside a CPU
 */
export class Register {

    //variables
    private data:number
    private numBits:number
    private bitMask:number

    /**
     * Constructor
     * @param numBits number of bits to store in this constructor
     */
    constructor(numBits:number) {
        this.numBits = numBits
        //create bitmask from bit size
        this.bitMask = Math.pow(2, this.numBits) - 1
        this.data = 0
    }

    /**
     * set the data in this register
     * @param data
     */
    set(data:number) : void {
        //truncate number to the correct number of bits
        let truncated:number = data & this.bitMask

        //check for overflow
        if(truncated != data) {
            console.warn(`Overflow when trying to load ${data} into a(n) ${this.numBits} bit register, truncated to ${truncated}`)
        }

        this.data = truncated
    }

    /**
     * @return the data from this register
     */
    get() : number {
        return this.data
    }
}
