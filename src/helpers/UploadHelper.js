const Helpers = {
    allowedFormat: (mimetype) => {
        const videoFormatAllowed = ["video/mp4"];
        return !videoFormatAllowed.includes(mimetype);
    }
}

module.exports = Helpers