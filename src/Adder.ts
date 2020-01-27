/**
 * An adder component
 */
export class Adder {

    //variables
    private numBits:number
    private bitMask:number

    /**
     * Constructor
     * @param numBits number of bits this adder uses
     */
    public constructor(numBits:number) {
        this.numBits = numBits
        //create bitmask from bit size
        this.bitMask = Math.pow(2, this.numBits) - 1
    }

    /**
     *
     * @param a a number to add
     * @param b another number to add
     * @return a + b
     */
    public add(a:number, b:number) : number {

        //apply bitmasks
        a = a & this.bitMask
        b = b & this.bitMask

        //add and truncate
        let c:number = (a + b) & this.bitMask

        //overflow check
        if(c > this.bitMask) {
            console.warn(`Overflow when adding ${a} + ${b}`)
        }

        return c;
    }
}
