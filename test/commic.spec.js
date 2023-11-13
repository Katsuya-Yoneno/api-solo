const chai = require('chai');
const chaihttp = require('chai-http');
const server = require('../server');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
chai.should();

describe('should add comic with post api', () => {
    it('should add new commic and return 200/comic', async() => {
        const res = await chai.request(server()).post('/comics').send({title: 'JOJO'});
        expect(res.statusCode).to.equal(200);
        expect(res.body.title).to.equal('JOJO');
    });
});

describe('should return all comics with get api', () => {
    it('should return all comics', async() => {
        const res = await chai.request(server()).get('/comics');
        expect(res.statusCode).to.equal(200);
    });
});