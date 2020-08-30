const { Schema, model } = require('mongoose')

const SettingsTemplateSchema = new Schema(
    {
        page_backgroundColor: {
            type: Object,
            required: true,
            default:{
                input: '',
                opacity: false,
                checked: true,
                randomize: false
            }
        },
        feTurbulance_baseFrequency: {
            type: Object,
            required: true,
            default: {
                input: {
                    value: ''
                },
                checked: true,
                randomize: false
            }
        },
        feTurbulance_numOctaves: {
            type: Object,
            required: true,
            default: {
                input: {
                    value: ''
                },
                checked: true,
                randomize: false
            }
        },
        feDisplacementMap_scale: {
            type: Object,
            required: true,
            default: {
                input: {
                    value: ''
                },
                checked: true,
                randomize: false
            }
        },
        svgElement_width: {
            type: Object,
            required: true,
            default: {
                input: {
                    value: ''
                },
                checked: true,
                randomize: false
            }
        },
        svgElement_height: {
            type: Object,
            required: true,
            default: {
                input: {
                    value: ''
                },
                checked: true,
                randomize: false
            }
        },
        svgPattern_width: {
            type: Object,
            required: true,
            default: {
                input: {
                    value: ''
                },
                checked: true,
                randomize: false
            }
        },
        svgPattern_height: {
            type: Object,
            required: true,
            default: {
                input: {
                    value: ''
                },
                checked: true,
                randomize: false
            }
        },
        svg_strokeWidth: {
            type: Object,
            required: true,
            default: {
                input: {
                    value: ''
                },
                checked: true,
                randomize: false
            }
        },
        svg_strokeColor: {
            type: Object,
            required: true,
            default:{
                input: '',
                opacity: false,
                checked: true,
                randomize: false
            }
        },
        svg_fillColor: {
            type: Object,
            required: true,
            default:{
                input: '',
                opacity: false,
                checked: true,
                randomize: false
            }
        },
        svg_opacity: {
            type: Object,
            required: true,
            default: {
                input: {
                    value: ''
                },
                checked: true,
                randomize: false
            }
        },
        svg_viewBoxWidth: {
            type: Object,
            required: true,
            default: {
                input: {
                    value: ''
                },
                checked: true,
                randomize: false
            }
        },
        svg_viewBoxHeight: {
            type: Object,
            required: true,
            default: {
                input: {
                    value: ''
                },
                checked: true,
                randomize: false
            }
        },
        svgElement_x: {
            type: Object,
            required: true,
            default: {
                input: {
                    value: ''
                },
                checked: true,
                randomize: false
            }
        },
        svgElement_y: {
            type: Object,
            required: true,
            default: {
                input: {
                    value: ''
                },
                checked: true,
                randomize: false
            }
        },
        svg_viewBoxX: {
            type: Object,
            required: true,
            default: {
                input: {
                    value: ''
                },
                checked: true,
                randomize: false
            }
        },
        svg_viewBoxY: {
            type: Object,
            required: true,
            default: {
                input: {
                    value: ''
                },
                checked: true,
                randomize: false
            }
        },
        svgPattern_x: {
            type: Object,
            required: true,
            default: {
                input: {
                    value: ''
                },
                checked: true,
                randomize: false
            }
        },
        svgPattern_y: {
            type: Object,
            required: true,
            default: {
                input: {
                    value: ''
                },
                checked: true,
                randomize: false
            }
        }
    }
)

const SettingsTemplate = model('settingsTemplate', SettingsTemplateSchema)

module.exports = SettingsTemplate