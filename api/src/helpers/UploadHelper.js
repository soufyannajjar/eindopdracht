const Helpers = {
    allowedFormat: (mimetype) => {
        const videoFormatAllowed = [
            "video/mp4","video/x-flv",
            "application/x-mpegURL", "video/MP2T",
            "video/3gpp","video/quicktime",
            "video/x-msvideo","video/x-ms-wmv"];
        return videoFormatAllowed.includes(mimetype);
    }
}

module.exports = Helpers