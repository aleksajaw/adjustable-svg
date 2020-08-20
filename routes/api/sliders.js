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

router.put('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const response = await Slider.findByIdAndUpdate(id, req.body)
        if (!response) throw Error('Something went wrong ')
        const updated = { ...response._doc, ...req.body }
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router