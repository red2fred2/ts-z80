import {Adder} from './Adder'
import {ControlUnit} from './ControlUnit'
import {Instruction} from './Instruction'
import {InstructionDecoder} from './InstructionDecoder'
import {Memory} from './Memory'
import {Multiplexer} from './Multiplexer'
import {Register} from './Register'

const instructionMap = require('./instructionMap')

const DEBUG = true

//registers
let regA = new Register(8)
let regAInverse = new Register(8)
let regF = new Register(8)
let regFInverse = new Register(8)

let regB = new Register(8)
let regBInverse = new Register(8)
let regC = new Register(8)
let regCInverse = new Register(8)
let regD = new Register(8)
let regDInverse = new Register(8)
let regE = new Register(8)
let regEInverse = new Register(8)
let regH = new Register(8)
let regHInverse = new Register(8)
let regL = new Register(8)
let regLInverse = new Register(8)
let regW = new Register(8)
let regWInverse = new Register(8)
let regZ = new Register(8)
let regZInverse = new Register(8)

let regTEMP = new Register(8)

let regIX = new Register(16)
let regIY = new Register(16)

let stackPointer = new Register(16)
let programCounter = new Register(16)

//add RAM
let ram:Memory = new Memory(8 * Math.pow(2, 16))

//instruction to codes map
const decoder:InstructionDecoder = new InstructionDecoder(instructionMap)


//initialize instruction set
let instructionSet:Instruction[] = []

// no op
instructionSet.push(new Instruction(0x00, function() {}))

let running:boolean = true


//create control unit
let control:ControlUnit = new ControlUnit(instructionSet)

//interactive loop


while(running) {

    //take input
    let instruction = ''

    //run command
    let {code, arg} = decoder.translate(instruction)
    let out = control.run(code, arg)

    //give output
    console.log(`(${instruction}) returned ${out}`)

    running = false
}

