const Helpers = require("../helpers/UploadHelper");


describe('Helpers allowed format', ()=> {
    test('should not accept format : image/jpeg & application/pdf & audio/wav', () => {
        expect(Helpers.allowedFormat('image/jpeg')).toBeFalsy();
        expect(Helpers.allowedFormat('application/pdf')).toBeFalsy();
        expect(Helpers.allowedFormat('audio/wav')).toBeFalsy();
    })

    test('should accept any format video', () => {
        expect(Helpers.allowedFormat('video/mp4')).toBeTruthy();
        expect(Helpers.allowedFormat('application/x-mpegURL')).toBeTruthy();
        expect(Helpers.allowedFormat('video/x-ms-wmv')).toBeTruthy();
    })
    
    
})
