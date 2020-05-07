const omSprites = require('openmoji-sprites')

const groups = omSprites.includeGroups.map(groupName => {
  return Object.assign({}, omSprites.groups[groupName], {
    name: groupName
  })
})

exports.create = (onEmoji) => {
  // Returns div.

  // Create container
  const root = document.createElement('div')
  root.style.position = 'relative'
  root.style.width = '600px'
  root.style.height = '400px'

  // Create container for tabs
  const tabsEl = document.createElement('div')
  root.appendChild(tabsEl)

  // Create container for sheet view
  const viewEl = document.createElement('div')
  root.appendChild(viewEl)

  // Create tabs
  groups.forEach(group => {
    const tabEl = document.createElement('div')
    tabEl.innerHTML = group.icon
    tabsEl.appendChild(tabEl)
  })

  // Create sheet
  const sheetEl = document.createElement('div')
  viewEl.appendChild(sheetEl)

  // Default group smileys
  let selectedGroup = omSprites.groups['smileys-emotion']

  // Create emojis
  selectedGroup.sheets.forEach(sheet => {
    sheet.hexcodes.forEach(hexcode => {
      const emojiEl = document.createElement('span')
      emojiEl.className = 'openmoji openmoji-1F435'
      emojiEl.dataset.hexcode = hexcode
      sheetEl.appendChild(emojiEl)
    })
  })

  // Define input
  sheetEl.addEventListener('click', ev => {
    onEmoji({
      emoji: 'TODO',
      hexcode: ev.target.dataset.hexcode)
    })
  })

  return root
}
