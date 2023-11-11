const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    courseName: {
        type: String,
        require: true
    },
    ShortName: {
        type: String,
        require: true
    },
    courseFee: {
        type: Number,
        require: true
    }
}, {
    timeStamp: true
})
const courseModel = mongoose.model('course', courseSchema)

module.exports = courseModel