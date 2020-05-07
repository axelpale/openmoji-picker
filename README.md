# openmoji-picker

An efficient emoji picker for web developers.

    const omPicker = require('openmoji-picker')

    const picker = omPicker.create()
    picker.on('emoji', om => {
      console.log(om.emoji, om.hexcode)
    })

    document.body.appendChild(picker)
