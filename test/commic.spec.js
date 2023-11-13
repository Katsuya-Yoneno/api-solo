const chai = require('chai');
const chaihttp = require('chai-http');
const server = require('../server');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
chai.should();

describe('should add comic with post api', () => {
    it('should add new commic and return 200/comic', async() => {
        const res = await chai.request(server()).post('/api/comics').send({title: 'JOJO'});
        expect(res.statusCode).to.equal(200);
        expect(res.body.title).to.equal('JOJO');
    });
});

describe('should return all comics with get api', () => {
    it('should return all comics', async() => {
        const res = await chai.request(server()).get('/api/comics');
        expect(res.statusCode).to.equal(200);
    });
});

describe('should modify a info of comic with patch api', () => {
    it('should modify a info of comic by id', async() => {
        const res = await chai.request(server()).patch('/api/comics/1')
        .send({title: 'test1'});
        expect(res.statusCode).to.equal(200);
    });
    
    it('should modify a info of comic by title', async() => {
        const res = await chai.request(server()).patch('/api/comics/JOJO')
        .send({title: 'test2'});
        expect(res.statusCode).to.equal(200);
    });
});

describe('should delete comic with delete api', () => {
    it('should delete a comic by id', async() => {
        const res = await chai.request(server()).delete('/api/comics/1')
        expect(res.statusCode).to.equal(200);
    });
    
    it('should delete a comic by id', async() => {
        const res = await chai.request(server()).delete('/api/comics/BREACH')
        expect(res.statusCode).to.equal(200);
    });
});