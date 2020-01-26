const {equal} = require('assert')

// Adders
const Adder = require("./build/Adder");
describe('Adders', function() {

    describe('8 bit', function() {
        let adder = new Adder.Adder(8);

        it('Bitmask', () => equal( adder.bitMask, 255 ))

        describe('Math', function() {
            it('1+1=2',      () => equal( adder.add(1, 1),     2 ))
            it('2+2=4',      () => equal( adder.add(2, 2),     4 ))
            it('1+2=3',      () => equal( adder.add(1, 2),     3 ))
            it('10+3=13',    () => equal( adder.add(10, 3),    13 ))
            it('200+55=255', () => equal( adder.add(200, 55),  255 ))
        })

        describe('Overflow', function() {
            it('128+128=0',   () => equal( adder.add(128, 128), 0 ))
            it('300+100=144', () => equal( adder.add(300, 100), 144 ))
        })
    })

    describe('2 bit', function() {
        let adder = new Adder.Adder(2);

        it('Bitmask', () => equal( adder.bitMask, 3 ))

        describe('Math', function() {
            it('1+1=2', () => equal( adder.add(1, 1), 2 ))
            it('1+2=3', () => equal( adder.add(1, 2), 3 ))
        })

        describe('Overflow', function() {
            it('2+2=0', () => equal( adder.add(2, 2), 0 ))
            it('255+2=1', () => equal( adder.add(255, 2), 1 ))
        })
    })


})
