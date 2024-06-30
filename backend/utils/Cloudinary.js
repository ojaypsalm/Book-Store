const cloudinary = require('cloudinary').v2


cloudinary.config({
    cloud_name: 'CLOUDINARY_CLOUD_NAME',
    api_key: 'CLOUDINARY_API_KEY',
    api_secret: 'BHrazBwK5uIW6Qvf0LbNk7HrWIE' 
    //api environment variable: 'CLOUDINARY_URL=cloudinary://615426354229647:BHrazBwK5uIW6Qvf0LbNk7HrWIE@divsjisaw'
})

module.exports = cloudinary;