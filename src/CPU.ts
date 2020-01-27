import {Adder} from './Adder'
import {ControlUnit} from './ControlUnit'
import {Instruction} from './Instruction'
import {InstructionDecoder} from './InstructionDecoder'
import {Memory} from './Memory'
import {Multiplexer} from './Multiplexer'
import {Register} from './Register'

export class CPU {

    //registers
    private regA:Register
    private regAInverse:Register
    private regF:Register
    private regFInverse:Register

    private regB:Register
    private regBInverse:Register
    private regC:Register
    private regCInverse:Register
    private regD:Register
    private regDInverse:Register
    private regE:Register
    private regEInverse:Register
    private regH:Register
    private regHInverse:Register
    private regL:Register
    private regLInverse:Register
    private regW:Register
    private regWInverse:Register
    private regZ:Register
    private regZInverse:Register

    private regTEMP:Register

    private regIX:Register
    private regIY:Register

    private stackPointer:Register
    private programCounter:Register

    //memory
    private ram:Memory

    //instruction decoder
    private decoder:InstructionDecoder

    //control unit
    private control:ControlUnit

    /**
     * Constructor
     */
    public constructor() {

        this.regA = new Register(8)
        this.regAInverse = new Register(8)
        this.regF = new Register(8)
        this.regFInverse = new Register(8)

        this.regB = new Register(8)
        this.regBInverse = new Register(8)
        this.regC = new Register(8)
        this.regCInverse = new Register(8)
        this.regD = new Register(8)
        this.regDInverse = new Register(8)
        this.regE = new Register(8)
        this.regEInverse = new Register(8)
        this.regH = new Register(8)
        this.regHInverse = new Register(8)
        this.regL = new Register(8)
        this.regLInverse = new Register(8)
        this.regW = new Register(8)
        this.regWInverse = new Register(8)
        this.regZ = new Register(8)
        this.regZInverse = new Register(8)

        this.regTEMP = new Register(8)

        this.regIX = new Register(16)
        this.regIY = new Register(16)

        this.stackPointer = new Register(16)
        this.programCounter = new Register(16)

        //add RAM
        this.ram = new Memory(8 * Math.pow(2, 16))

        //instruction decoder
        this.decoder = new InstructionDecoder(require('./instructionMap'))

        //define codes
        let codes:Instruction[] = []

        //nop
        codes.push(new Instruction(0x00, function() {}))



        //control unit
        this.control = new ControlUnit(codes)
    }

    /**
     * Runs a give instruction on the CPU
     * @param instruction instruction to run on the CPU
     * @return whatever the function returns
     */
    public run(instruction:string) {
        const {code, arg} = this.decoder.translate(instruction)
        return this.control.run(code, arg)
    }
}
