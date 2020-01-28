const {equal, deepEqual} = require('assert')

// Adders
const Adder = require('./build/Adder')
describe('Adders', function() {

    describe('8 bit', function() {
        let adder = new Adder.Adder(8)

        it('Bitmask', () => equal( adder.bitMask, 255 ))

        describe('Math', function() {
            it('1+1 = 2', () => equal( adder.add(1, 1), 2 ))
            it('2+2 = 4', () => equal( adder.add(2, 2), 4 ))
            it('1+2 = 3', () => equal( adder.add(1, 2), 3 ))
            it('10+3 = 13', () => equal( adder.add(10, 3), 13 ))
            it('200+55 = 255', () => equal( adder.add(200, 55), 255 ))
        })

        describe('Overflow', function() {
            it('128+128 = 0', () => equal( adder.add(128, 128), 0 ))
            it('300+100 = 144', () => equal( adder.add(300, 100), 144 ))
        })
    })

    describe('2 bit', function() {
        let adder = new Adder.Adder(2)

        it('Bitmask', () => equal( adder.bitMask, 3 ))

        describe('Math', function() {
            it('1+1 = 2', () => equal( adder.add(1, 1), 2 ))
            it('1+2 = 3', () => equal( adder.add(1, 2), 3 ))
        })

        describe('Overflow', function() {
            it('2+2 = 0', () => equal( adder.add(2, 2), 0 ))
            it('255+2 = 1', () => equal( adder.add(255, 2), 1 ))
        })
    })
})


// Multiplexers
const Multiplexer = require('./build/Multiplexer')
describe('Multiplexers', function() {

    describe('2 choices', function() {
        let mux = new Multiplexer.Multiplexer(2)

        it('[1, 2](0) = 1', () => equal( mux.evaluate([1, 2], 0), 1) )
        it('[1, 2](1) = 2', () => equal( mux.evaluate([1, 2], 1), 2) )
    })

})


// Registers
const Register = require('./build/Register')
describe('Registers', function() {

    describe('1 bit', function() {
        let reg = new Register.Register(1)

        it('Starts at 0', () => equal( reg.get(), 0 ))
        it('loads 1s', function() {
            reg.set(1)
            equal( reg.get(), 1 )
        })
        it('loads 0s', function() {
            reg.set(1)
            reg.set(0)
            equal( reg.get(), 0 )
        })
    })

    describe('8 bit', function() {
        let reg = new Register.Register(8)

        it('Starts at 0', () => equal( reg.get(), 0 ))
        it('loads 170', function() {
            reg.set(170)
            equal( reg.get(), 170 )
        })
        it('overflows correctly', function() {
            reg.set(60000)
            equal( reg.get(), 96 )
        })
    })

    describe('16 bit', function() {
        let reg = new Register.Register(16)

        it('Starts at 0', () => equal( reg.get(), 0 ))
        it('loads 300', function() {
            reg.set(300)
            equal( reg.get(), 300 )
        })
        it('loads 60,000', function() {
            reg.set(60000)
            equal( reg.get(), 60000 )
        })
        it('overflows correctly', function() {
            reg.set(70000)
            equal( reg.get(), 4464 )
        })
    })
})

// Register Groups
const RegisterGroup = require('./build/RegisterGroup')
describe('Register Groups', function() {

    describe('3 (1, 2) bit', function() {
        let reg1 = new Register.Register(1)
        let reg2 = new Register.Register(2)


        let reg = new RegisterGroup.RegisterGroup(reg1, reg2)

        const testNumber = 0b101
        reg.set(testNumber)
        it(`sets and gets ${testNumber}`, () =>
            equal( reg.get(), testNumber)
        )
        it(`correctly sets 1 bit register`, () =>
            equal(reg1.get(), 0b1)
        )
        it('correctly sets 2 bit register', () =>
            equal(reg2.get(), 0b10)
        )

    })

    describe('8 (2, 1, 4, 1) bit', function() {
        let reg1 = new Register.Register(2)
        let reg2 = new Register.Register(1)
        let reg3 = new Register.Register(4)
        let reg4 = new Register.Register(1)

        let reg = new RegisterGroup.RegisterGroup(reg1, reg2, reg3, reg4)

        let testNumber = 0b10101010

        reg.set(testNumber)
        it(`sets and gets ${testNumber}`, () =>
            equal( reg.get(), testNumber)
        )
        testNumber = 0b10111000

        reg.set(testNumber)
        it(`sets and gets ${testNumber}`, () =>
            equal( reg.get(), testNumber)
        )

    })

    describe('16 (8, 8) bit', function() {
        let reg1 = new Register.Register(8)
        let reg2 = new Register.Register(8)

        let reg = new RegisterGroup.RegisterGroup(reg1, reg2)

        let testNumber = 0b1010101010101010

        reg.set(testNumber)
        it(`sets and gets ${testNumber}`, () =>
            equal( reg.get(), testNumber)
        )

        testNumber = 0b1011001110001111

        reg.set(testNumber)
        it(`sets and gets ${testNumber}`, () =>
            equal( reg.get(), testNumber)
        )
    })

})

// Memory
const Memory = require('./build/Memory')
describe('Memory', function() {
    let ram = new Memory.Memory(1024*8)

    describe('arrays', function() {
        const testArray = [1, 0, 1, 0, 1, 0, 1, 1]

        it('at 256', function() {
            ram.setArray(256, testArray)
            let actual = ram.getArray(256, testArray.length)
            deepEqual( actual, testArray )
        })
        it('at 512', function() {
            ram.setArray(512, testArray)
            let actual = ram.getArray(512, testArray.length)
            deepEqual( actual, testArray )
        })
        it('at 700', function() {
            ram.setArray(700, testArray)
            let actual = ram.getArray(700, testArray.length)
            deepEqual( actual, testArray )
        })
        it('random data overwrite', function() {
            const randomArray = Array(100).fill().map(() => Math.round(Math.random()))

            ram.setArray(512, randomArray)
            let actual = ram.getArray(512, randomArray.length)
            deepEqual( actual, randomArray )
        })
    })

    describe('numbers', function() {
        const testNumber = 170

        it('at 256', function() {
            ram.set(256, testNumber, 8)
            let actual = ram.get(256, 8)
            equal(actual, testNumber)
        })
        it('at 512', function() {
            ram.set(512, testNumber, 8)
            let actual = ram.get(512, 8)
            equal(actual, testNumber)
        })
        it('at 700', function() {
            ram.set(700, testNumber, 8)
            let actual = ram.get(700, 8)
            equal(actual, testNumber)
        })
        it('random number overwrite', function() {
            const randomNumber = Math.round(Math.random() * 255)
            ram.set(512, randomNumber, 8)
            let actual = ram.get(512, 8)
            equal(actual, randomNumber)
        })
    })

    describe('edge cases', function() {
        const testNumber = 170

        it('at 0', function() {
            ram.set(0, testNumber, 8)
            let actual = ram.get(0, 8)
            equal(actual, testNumber)
        })
        it('at the end', function() {
            ram.set(1015, testNumber, 8)
            let actual = ram.get(1015, 8)
            equal(actual, testNumber)
        })
        it('big number', function() {
            ram.set(256, testNumber, 32)
            let actual = ram.get(256, 32)
            equal(actual, testNumber)
        })
    })

})

// Instruction Decoder
describe('Instruction Decoder', function() {
    const InstructionDecoder = require('./build/InstructionDecoder')
    const decoder = new InstructionDecoder.InstructionDecoder([
        {name: 'nop', code: 0x00},
        {name: 'ld bc, ....', code: 0x01}
    ])

    it('code: nop', () => equal( decoder.translate('nop').code, 0x00 ))
    it('code: ld bc, **', () => equal( decoder.translate('ld bc, a3f0').code, 0x01 ))
    it('arg: ld bc, **', () => equal( decoder.translate('ld bc, a3f0').arg, 0xa3f0 ))

})
