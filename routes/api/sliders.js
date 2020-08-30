const { Router } = require('express')
const Slider = require('../../models/slider')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const Sliders = await Slider.find()
        if (!Sliders) throw new Error('No Sliders')
        res.status(200).json(Sliders)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router