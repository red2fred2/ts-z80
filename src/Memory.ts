export class Memory {

    //variables
    private data:number[]
    private numBits:number

    /**
     * Constructor
     * @param numBits number of bits in memory
     */
    public constructor(numBits:number) {
        this.numBits = numBits

        //fill with 0s
        this.data = new Array(this.numBits).fill(0)
    }

    /**
     * Directly sets a continuous array of bits at a memory address
     * @param address memory address to set data at
     * @param bitArray array of bits to set at the address
     */
    public setArray(address:number, bitArray:number[]) {
        //error check
        if(address*8 + bitArray.length >= this.numBits || address < 0) {
            console.trace('Memory index out of range')
        }

        //set bits
        for(let i:number = 0; i < bitArray.length; i++) {
            this.data[address*8+i] = bitArray[i]
        }
    }

    /**
     * Sets a value at an address
     * @param address memory address to set at
     * @param data data to be set
     * @param numBits number of bits to be set
     */
    public set(address:number, data:number, numBits:number) {
        //transform the number into an array of bits
        let bitArray:number[] = []

        for(let i:number = 0; i < numBits; i++) {
            //check if number is too big
            if(numBits > 32) {
                console.error(`Tried to set a ${numBits} bit number. Max size is 32 bits.`)
            }

            const interestingBit:number = data & (1 << i)
            const bitValue:number = interestingBit >> i

            bitArray[i] = bitValue

        }
        //set the array
        this.setArray(address, bitArray)
    }

    /**
     * Directly gets an array from memory
     * @param address address to get value from
     * @param numBits number of bits to get in the array
     * @return an array of the bits at the address
     */
    public getArray(address:number, numBits:number) {
        //get array
        let bitArray:number[] = []
        for(let i:number = 0; i < numBits; i++) {
            bitArray[i] = this.data[address*8+i]
        }

        return bitArray
    }

    /**
     * Returns a number stored in memory
     * @param address address to get number from
     * @param numBits number of bits in the number
     * @return a number represented by the bits in memory
     */
    public get(address:number, numBits:number) {
        const bitArray:number[] = this.getArray(address, numBits)

        //turn the bits back into a number
        let data:number = 0
        for(let i:number = 0; i < numBits; i++) {
            const bitValue:number = bitArray[i] * (1 << i)
            data += bitValue
        }

        return data
    }
}
