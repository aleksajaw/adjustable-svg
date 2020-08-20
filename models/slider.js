const { Schema, model } = require('mongoose')

const SliderSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    input: {
        type: Object || String,
        required: true
    },
    checked: {
        type: Boolean,
        required: true
    },
    randomize: {
        type: Boolean,
        required: true,
    },
    target: {
        type: String,
        required: true
    },
})

const Slider = model('slider', SliderSchema)

module.exports = Slider