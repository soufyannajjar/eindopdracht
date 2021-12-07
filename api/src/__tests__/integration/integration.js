const supertest = require('supertest');
const app = require('../../app');
const fs = require('fs');
const request = supertest(app);


describe('Handle /companies endpoint', () => {
    it('GET /companies should responds with 200',  (next) => {
        request
        .get('/companies')
        .end(function(err, res) {
            if (err) return next(err);
            expect(res.status).toBe(200);
            expect(typeof res.body).toBe('object')
            return next();
        });
        
    })
})

describe('Delete /videos/:id', () => {
    it('Should responds a 404 when video does not exist', (next) => {
        request
            .delete(`/videos/9999`)
            .end(function(err, res) {
                if (err) return next(err);
                expect(res.status).toBe(404);
                expect(res.body.message).toEqual('Video does not exist.');
                return next();
        });
    });
})


describe('Update /videos/:id', () => {
    it('Should responds a 400 when no file is uploaded', (next) => {
        request
            .put(`/videos/999`)
            .send({ title:"My title" })
            .end(function(err, res) {
                if (err) return next(err);
                expect(res.status).toBe(400);
                expect(res.body.message).toEqual('No video file is uploaded.');
                return next();
        });
    });


   /* it('Should responds a 404 when video does not exist', (next) => {
        const filePath = `${__dirname}/testFiles/test.mp4`;
        request
            .put(`/videos/999`)
            .set('content-type', 'multipart/form-data')
            .send({ title:"My title" })
            .attach('file', fs.readFileSync(filePath), 'testFiles/test.mp4')
            .end(function(err, res) {
                if (err) return next(err);
                expect(res.status).toBe(404);
                expect(res.body.message).toEqual('Video does not exist.');
                return next();
        });
    });*/
})
