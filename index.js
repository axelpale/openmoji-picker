const omSprites = require('../openmoji-sprites')
const resolve = require.context('../openmoji-sprites/docs/png72', true, /\.(png|css)$/i)

// Preprocess
const groups = omSprites.includeGroups.map(groupName => {
  const group = omSprites.groups[groupName]

  // Import css sprites.
  // PNGs are included with file-loader.
  group.sheets.forEach(sheet => {
    // NOTE class .openmoji will be inserted multiple times. Simple but excess.
    const sheetName = groupName + sheet.postfix
    resolve('./' + sheetName + '.css')
  })

  return group
})

exports.create = (onEmoji) => {
  // Returns div.

  // Create container
  const root = document.createElement('div')
  root.className = 'om-picker'

  // Create container for tabs
  const tabsEl = document.createElement('div')
  tabsEl.className = 'om-picker-tabs'
  root.appendChild(tabsEl)

  // Create container for sheet view
  const viewEl = document.createElement('div')
  viewEl.className = 'om-picker-view'
  root.appendChild(viewEl)

  // Create tabs
  groups.forEach(group => {
    const tabEl = document.createElement('span')
    tabEl.className = 'om-picker-tab openmoji openmoji-' + group.icon.hexcode
    tabEl.dataset.groupName = group.name
    tabsEl.appendChild(tabEl)
  })

  const selectGroup = (groupName) => {
    // DEBUG console.log('select group:', groupName)
    // Remove possible old sheets.
    while (viewEl.firstChild) {
      viewEl.removeChild(viewEl.firstChild)
    }

    // Create new sheet
    const sheetEl = document.createElement('div')
    sheetEl.className = 'om-picker-sheet'
    viewEl.appendChild(sheetEl)

    // Emoji group
    const selectedGroup = omSprites.groups[groupName]

    selectedGroup.sheets.forEach(sheet => {
      // DEBUG console.log('select sheet:', groupName + sheet.postfix)
      // Create emojis for the selected group
      const emojiEls = sheet.hexcodes.map(hexcode => {
        const emojiEl = document.createElement('span')
        emojiEl.className = 'openmoji openmoji-' + hexcode
        emojiEl.dataset.hexcode = hexcode
        return emojiEl
      })
      emojiEls.forEach(emojiEl => {
        sheetEl.appendChild(emojiEl)
      })
    })

    // Define emoji input
    sheetEl.addEventListener('click', ev => {
      const hexcode = ev.target.dataset.hexcode
      onEmoji({
        emoji: String.fromCodePoint('0x' + hexcode),
        hexcode: hexcode
      })
    })
  }

  // Default group
  selectGroup('smileys-emotion')

  // Define tab input
  tabsEl.addEventListener('click', ev => {
    const groupName = ev.target.dataset.groupName
    console.log('tab clicked:', groupName)
    if (groupName) {
      selectGroup(groupName)
    }
  })

  return root
}
