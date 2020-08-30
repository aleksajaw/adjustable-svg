const { Router } = require('express')
const SettingsTemplate = require('../../models/settingsTemplate')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const SettingsTemplates = await SettingsTemplate.find()
        if (!SettingsTemplates) throw new Error('No Settings Templates')
        res.status(200).json(SettingsTemplates)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newSettingsTemplate = new SettingsTemplate(req.body)
    try {
        const settingsTemplate = await newSettingsTemplate.save()
        if(!settingsTemplate) throw new Error('Something went wrong saving the settingsTemplate')
        res.status(200).json(settingsTemplate)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const response = await SettingsTemplate.findByIdAndUpdate(id, req.body)
        if (!response) throw Error('Something went wrong ')
        const updated = { ...response._doc, ...req.body }
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await SettingsTemplate.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router