export class Adder {

    //variables
    numBits:number
    bitMask:number

    //constructor
    constructor(numBits:number) {
        this.numBits = numBits
        this.bitMask = Math.pow(2, this.numBits) - 1
    }

    add(a:number, b:number) {
        a = a & this.bitMask
        b = b & this.bitMask
        return a + b;
    }
}
