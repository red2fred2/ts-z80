export class Adder {

    //variables
    numBits:number
    bitMask:number

    //constructor
    constructor(numBits:number) {
        this.numBits = numBits
        //create bitmask from bit size
        this.bitMask = Math.pow(2, this.numBits) - 1
    }

    //methods
    add(a:number, b:number) {

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
