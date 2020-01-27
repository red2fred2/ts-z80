/**
 * Part that turns instructions into actions
 */
export class InstructionDecoder {

    //variables
    private instructionMap:{name:string, code:number}[]

    /**
     * Constructor
     * @param instructions array of possible instructions
     */
    public constructor(instructionMap:{name:string, code:number}[]) {
        this.instructionMap = instructionMap
    }

    /**
     * Translates
     * @param name the name of the instruction
     * @return the code and args that correspond to this instruction name
     */
    public translate(name:string) : {code:number, arg:number} {
        //check if regex matches
        const matches = this.instructionMap.filter(function(entry) {
            const regex = new RegExp(entry.name)
            return regex.test(name)
        })

        //check for issues with instructions
        if(matches.length < 1) {
            console.error(`Instruction '${name}' does not exist`)
            process.exit(1)
        } else if(matches.length > 1) {
            console.error(`Instruction '${name}' is defined more than once`)
            process.exit(1)
        } else {

            //return it
            const match:string[] = matches[0].name.split('')
            const arg:string[] = name.split('').filter((val:string, i:number) => match[i] == '.')
            let n = 1/16
            let num:number = arg.map(function(char:string) {
                switch(char) {
                    case '0': return 0
                    case '1': return 1
                    case '2': return 2
                    case '3': return 3
                    case '4': return 4
                    case '5': return 5
                    case '6': return 6
                    case '7': return 7
                    case '8': return 8
                    case '9': return 9
                    case 'a': case 'A': return 10
                    case 'b': case 'B': return 11
                    case 'c': case 'C': return 12
                    case 'd': case 'D': return 13
                    case 'e': case 'E': return 14
                    case 'f': case 'F': return 15
                    default: console.error(`${char} is not a hexadecimal number`)
                }
            }).reduceRight((acc, cur) => acc + cur * (n*=16), 0)

            return {
                code: matches[0].code,
                arg: num
            }
        }
    }
}
