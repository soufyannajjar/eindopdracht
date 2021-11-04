const supertest = require('supertest');
const app = require('../../app');
const request = supertest(app);


describe('GET /companies', () => {
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
        
    })
})