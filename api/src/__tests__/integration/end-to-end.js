const supertest = require('supertest');
const app = require('../../app');
const request = supertest(app);
const path = require('path');

let companyID, videoId;
describe('GET endpoint of companies and videos', () => {
    it('should responds with 200 and have properties count and companies',  (next) => {
        request
        .get('/companies')
        .end(function(err, res) {
            if (err) return next(err);
            expect(res.body).toHaveProperty("count")
            expect(res.body).toHaveProperty("companies")
            expect(res.status).toBe(200);
            expect(typeof res.body).toBe('object');
            expect(Array.isArray(res.body.companies)).toBeTruthy();
            return next();
        });
        
    });

    it('should responds with 200 and have properties count and videos',  (next) => {
        request
        .get('/videos')
        .end(function(err, res) {
            if (err) return next(err);
            expect(res.body).toHaveProperty("count")
            expect(res.body).toHaveProperty("videos")
            expect(res.status).toBe(200);
            expect(typeof res.body).toBe('object');
            expect(Array.isArray(res.body.videos)).toBeTruthy();
            return next();
        });
        
    })
});


describe('POST endpoint of companies and videos', () => {
    it('POST /companies should responds with 201 and have properties message and company',  (next) => {
        request
        .post('/companies')
        .send({ name:"Company Name", email:"company@example.be" })
        .end(function(err, res) {
            if (err) return next(err);
            expect(res.body).toHaveProperty("message")
            expect(res.body).toHaveProperty("company")
            companyID = res.body.company.id;
            expect(res.status).toBe(201);
            expect(typeof res.body).toBe('object');
            expect(typeof res.body.company).toBe('object');
            expect(typeof res.body.company.id).toBe('number');
            expect(typeof res.body.company.name).toBe('string');
            expect(typeof res.body.company.email).toBe('string');
            return next();
        });
    });

    it('POST /videos | Should responds a 201 and have properties message and video',  (next) => {
        const video = path.resolve(__dirname, `./testFiles/test.mp4`);
        request
            .post("/videos")
            .set('Accept', 'application/json')
            .set('Content-Type', 'multipart/form-data;')
            .field("title", "My title")
            .field("id_company", companyID)
            .attach('file', video)
            .end(function(err, res) {
                if (err) return next(err);
                expect(res.body).toHaveProperty("message")
                expect(res.body).toHaveProperty("video")
                expect(res.status).toBe(201);
                videoId = res.body.video.id;
                expect(typeof res.body).toBe('object');
                expect(typeof res.body.video).toBe('object');
                expect(typeof res.body.video.id).toBe('number');
                expect(typeof res.body.video.title).toBe('string');
                expect(typeof res.body.video.path).toBe('string');
                expect(typeof res.body.video.id_company).toBe('number');
                return next();
        });
    });
})



describe('PUT endpoint of companies and videos and have properties message and company', () => {
    it('PUT /companies/:id | Should responds a 201', (next) => {
        let nameUpdated = "Company Name Updated";
        let emailUpdated = "company-updated@example.be";
        request
            .put(`/companies/${companyID}`)
            .send({ name:nameUpdated, email:emailUpdated})
            .end(function(err, res) {
                if (err) return next(err);
                expect(res.status).toBe(201);
                expect(res.body).toHaveProperty("message")
                expect(res.body).toHaveProperty("company")
                expect(res.status).toBe(201);
                expect(typeof res.body).toBe('object');
                expect(typeof res.body.company).toBe('object');
                expect(typeof res.body.company.id).toBe('number');
                expect(typeof res.body.company.name).toBe('string');
                expect(typeof res.body.company.email).toBe('string');
                return next();
        });
    });


    it('PUT /videos/:id | Should responds a 201 and have properties message and video', (next) => {
        const video = path.resolve(__dirname, `./testFiles/test.mp4`);
        const title = "My title Updated";
        request
            .put(`/videos/${videoId}`)
            .set('Accept', 'application/json')
            .set('Content-Type', 'multipart/form-data;')
            .field("title", title)
            .attach('file', video)
            .end(function(err, res) {
                if (err) return next(err);
                expect(res.status).toBe(201);
                expect(res.body).toHaveProperty("message")
                expect(res.body).toHaveProperty("video")
                expect(typeof res.body).toBe('object');
                expect(typeof res.body.video).toBe('object');
                expect(typeof res.body.video.id).toBe('number');
                expect(typeof res.body.video.title).toBe('string');
                expect(typeof res.body.video.path).toBe('string');
                expect(typeof res.body.video.id_company).toBe('number');
                return next();
        });
    }); 
});



describe('DELETE endpoint of companies and videos', () => {

    it('DELETE /videos/:id | Should responds a 200 and have properties message', (next) => {
        request
            .delete(`/videos/${videoId}`)
            .end(function(err, res) {
                if (err) return next(err);
                expect(res.status).toBe(200);
                expect(res.body).toHaveProperty("message")
                expect(res.body.message).toEqual('Video deleted.');
                expect(typeof res.body.message).toBe('string');
                return next();
        });
    });

    it('DELETE /companies/:id | Should responds a 200 and have properties message', (next) => {
        request
            .delete(`/companies/${companyID}`)
            .end(function(err, res) {
                if (err) return next(err);
                expect(res.body).toHaveProperty("message")
                expect(res.body.message).toEqual('Company deleted.');
                expect(res.status).toBe(200);
                expect(typeof res.body.message).toBe('string');
                return next();
        });
    });
})
