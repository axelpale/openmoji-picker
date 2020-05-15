const openmojiPicker = require('../index')
require('../light-theme.css')
require('./style.css')
require('file-loader?name=[name].[ext]!./favicon.ico')
require('file-loader?name=[name].[ext]!./index.html')

const container = document.getElementById('container')
container.appendChild(openmojiPicker.create(emojiEvent => {
  console.log(emojiEvent.hexcode)
}))
