let main = require('main');
let should = require('should');
describe('main.test.js',function () {
    it('should equal 55 when n ===10',function () {
        main.fibonacci(10).should.equal(55);
    });
});