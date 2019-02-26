const { expect } = require('chai')
describe('indx.js', () => {
    it('data.json', async () => {
        const data = require('../index')
        expect(data).to.be.an('array')
        for (const iterator of data) {
            expect(iterator).to.be.an('object')
            expect(iterator).to.have.property('english')
            expect(iterator).to.have.property('sexy')
            expect(iterator).to.have.property('phonetic_symbol')
            expect(iterator).to.have.property('chinese')
            expect(iterator).to.have.property('source')
        }
    });
});