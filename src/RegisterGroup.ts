import {Register} from './Register'

export class RegisterGroup {
    //variables
    registers:Register[]
    totalBits:number
    bitmasks:number[]

    /**
     * Constructor
     * @param registers the list of registers controlled by this group
     */
    constructor(...registers:Register[]) {
        this.registers = registers

        //total the number of bits
        this.totalBits = registers.reduce((acc:number, reg:Register) => acc + reg.size(), 0)

        //create a bitmask for each register
        this.bitmasks = []
        let bitsSoFar = 0
        for(let r = 0; r < registers.length; r++) {
            //get the number of bits for this register in an easy to read form
            const numBits:number = registers[r].size()

            //initialize the mask
            let mask:number = 0

            //create the mask
            for(let i:number = 0; i < numBits; i++) {
                mask += 1 << (bitsSoFar + i)
            }

            //move on
            bitsSoFar += numBits

            this.bitmasks[r] = mask
        }
    }

    /**
     * sets the value in pieces across the register group
     * @param data data to be set
     */
    set(data:number) : void {
        for(let r:number = 0; r < this.registers.length; r++) {

            //find start index
            let startIndex:number = 0
            //increase start until you find the first 1
            while(this.bitmasks[r+startIndex] & 1) startIndex++

            //find partial data to store
            let partial:number = data & this.bitmasks[r]
            partial = partial >> startIndex

            this.registers[r].set(partial)
        }
    }

    /**
     * @returns the data stored across the register group
     */
    get() : number {

        let data = 0

        for(let r:number = 0; r < this.registers.length; r++) {

            //find start index
            let startIndex:number = 0
            //increase start until you find the first 1
            while(this.bitmasks[r+startIndex] & 1) startIndex++

            //get partial data from this register
            let partial:number = this.registers[r].get()
            partial = partial << startIndex

            data += partial
        }

        return data
    }
}
