const openmojiPicker = require('../index')

const container = document.getElementById('container')
container.appendChild(openmojiPicker(emojiEvent => {
  console.log(emojiEvent.hexcode)
}))
