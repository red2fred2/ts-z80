const {equal} = require('assert')

// Adders
const Adder = require('./build/Adder')
describe('Adders', function() {

    describe('8 bit', function() {
        let adder = new Adder.Adder(8);

        it('Bitmask', () => equal( adder.bitMask, 255 ))

        describe('Math', function() {
            it('1+1 = 2',      () => equal( adder.add(1, 1),     2 ))
            it('2+2 = 4',      () => equal( adder.add(2, 2),     4 ))
            it('1+2 = 3',      () => equal( adder.add(1, 2),     3 ))
            it('10+3 = 13',    () => equal( adder.add(10, 3),    13 ))
            it('200+55 = 255', () => equal( adder.add(200, 55),  255 ))
        })

        describe('Overflow', function() {
            it('128+128 = 0',   () => equal( adder.add(128, 128), 0 ))
            it('300+100 = 144', () => equal( adder.add(300, 100), 144 ))
        })
    })

    describe('2 bit', function() {
        let adder = new Adder.Adder(2);

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
        let mux = new Multiplexer.Multiplexer(2);

        it('[1, 2](0) = 1', () => equal( mux.evaluate([1, 2], 0), 1) )
        it('[1, 2](1) = 2', () => equal( mux.evaluate([1, 2], 1), 2) )
    })

})


// Registers
const Register = require('./build/Register')
describe('Registers', function() {

    describe('1 bit', function() {
        let reg = new Register.Register(1);

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
        let reg = new Register.Register(8);

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
        let reg = new Register.Register(16);

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
