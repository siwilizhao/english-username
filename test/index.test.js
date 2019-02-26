const { expect } = require('chai')
describe('indx.js', () => {
    it('data.json', async () => {
        const data = require('../index')
        expect(data).to.be.an('array')
    });
});