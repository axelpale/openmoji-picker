const openmojiPicker = require('../index')
require('../light-theme.css')
require('./style.css')
require('file-loader?name=[name].[ext]!./favicon.ico')
require('file-loader?name=[name].[ext]!./index.html')

const messageInput = document.getElementById('message-input')
const pickerContainer = document.getElementById('picker-container')

pickerContainer.appendChild(openmojiPicker.create(emojiEvent => {
  console.log(emojiEvent.hexcode)
  const emoji = emojiEvent.emoji
  messageInput.value = messageInput.value + emoji
}))
