const supertest = require('supertest');
const app = require('../../app');
const path = require('path');
const request = supertest(app);

let companyID, videoId;

describe("Handle POST method", ()=> {
    it('POST /companies should responds with 201',  (next) => {
        request
        .post('/companies')
        .send({ name:"Company Name", email:"company@example.be" })
        .end(function(err, res) {
            if (err) return next(err);
            companyID = res.body.company.id;
            expect(res.status).toBe(201);
            return next();
        });
    });

    it('POST /videos | Should responds a 201',  (next) => {
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
                expect(res.status).toBe(201);
                videoId = res.body.video.id;
                return next();
        });
    });
})


describe("Handle GET method", ()=> {
    describe("GET for companies", () => {
        it('GET /companies should responds with 200',  (next) => {
            request
            .get('/companies')
            .end(function(err, res) {
                if (err) return next(err);
                expect(res.status).toBe(200);
                return next();
            });
        });
    
    
        it('GET /companies/:id should responds with 200', (next) => {
            request
            .get(`/companies/${companyID}`)
            .end(function(err, res) {
                if (err) return next(err);
                const {company} =  res.body;
                expect(res.status).toBe(200);
                expect(company.id).toBe(companyID);
                expect(company.name).toEqual("Company Name");
                expect(company.email).toEqual("company@example.be");
                return next();
            });
        });
    })

    describe("GET for videos", () => {
        it('GET /videos should responds with 200',  (next) => {
            request
            .get('/videos')
            .end(function(err, res) {
                if (err) return next(err);
                expect(res.status).toBe(200);
                return next();
            });
        });
    
        it('GET /videos/:id should responds with 200',  (next) => {
            request
            .get(`/videos/${videoId}`)
            .end(function(err, res) {
                if (err) return next(err);
                const {video} =  res.body;
    
                expect(res.status).toBe(200);
                expect(video.id).toBe(videoId);
                expect(video.title).toEqual("My title");
                return next();
            });
        });
    })
})



describe('Handle PUT method', () => {
    describe("PUT for companies", () => {
        it('PUT /companies/:id | Should responds a 201', (next) => {
            let nameUpdated = "Company Name Updated";
            let emailUpdated = "company-updated@example.be";
            request
                .put(`/companies/${companyID}`)
                .send({ name:nameUpdated, email:emailUpdated})
                .end(function(err, res) {
                    if (err) return next(err);
                    expect(res.status).toBe(201);
                    const {name, id, email} = res.body.company;
                    expect(name).toEqual(nameUpdated);
                    expect(email).toEqual(emailUpdated);
                    expect(id).toBe(companyID);
                    expect(res.body.message).toEqual(`The company '${nameUpdated}' has been modified.`);
                    return next();
            });
        });
    })


    describe("PUT for videos", () => {
        it('PUT /videos/:id | Should responds a 400 when no file is uploaded', (next) => {
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

        it('PUT /videos/:id | Should responds a 201', (next) => {
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
                    const {video} = res.body;
                    expect(video.id).toBe(videoId);
                    expect(video.title).toBe(title);
                    return next();
            });
        });        
    })
});


describe('Remove /companies & /movies endpoints', () => {
    it('DELETE /videos/:id | Should responds a 404 when video does not exist', (next) => {
        request
            .delete(`/videos/9999`)
            .end(function(err, res) {
                if (err) return next(err);
                expect(res.status).toBe(404);
                expect(res.body.message).toEqual('Video does not exist.');
                return next();
        });
    });

    it('DELETE /videos/:id | Should responds a 200 when is correctly removed', (next) => {
        request
            .delete(`/videos/${videoId}`)
            .end(function(err, res) {
                if (err) return next(err);
                expect(res.status).toBe(200);
                expect(res.body.message).toEqual('Video deleted.');
                return next();
        });
    });

    it('DELETE /companies/:id | Should responds a 200 when is correctly removed', (next) => {
        request
            .delete(`/companies/${companyID}`)
            .end(function(err, res) {
                if (err) return next(err);
                expect(res.status).toBe(200);
                return next();
        });
    });
})


