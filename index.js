const omSprites = require('openmoji-sprites')
// import animalsNature from 'openmoji-sprites/docs/png/animals-nature-00.png'
const resolve = require.context('openmoji-sprites/docs/png')

const groups = omSprites.includeGroups.map(groupName => {
  const group = omSprites.groups[groupName]
  return Object.assign({}, group, {
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
  tabsEl.className = 'om-picker-tabs'
  root.appendChild(tabsEl)

  // Create container for sheet view
  const viewEl = document.createElement('div')
  viewEl.className = 'om-picker-view'
  root.appendChild(viewEl)

  // Create tabs
  groups.forEach(group => {
    const tabEl = document.createElement('div')
    tabEl.className = 'om-picker-tab'
    tabEl.innerHTML = group.icon
    tabEl.dataset.groupName = group.name
    tabsEl.appendChild(tabEl)
  })

  const selectGroup = (groupName) => {
    // Remove possible old sheets
    while (viewEl.firstChild) {
      viewEl.removeChild(viewEl.firstChild)
    }

    // Create new sheet
    const sheetEl = document.createElement('div')
    sheetEl.className = 'om-picker-sheet'
    viewEl.appendChild(sheetEl)

    // Default group smileys
    const selectedGroup = omSprites.groups[groupName]

    selectedGroup.sheets.forEach(sheet => {
      // Create emojis for the selected group
      sheet.hexcodes.forEach(hexcode => {
        const emojiEl = document.createElement('span')
        emojiEl.className = 'openmoji openmoji-' + hexcode
        emojiEl.dataset.hexcode = hexcode
        sheetEl.appendChild(emojiEl)
      })
      // Import positions dynamically
      // TODO ensure same styles are not inserted multiple times
      const sheetName = groupName + sheet.postfix
      resolve('./' + sheetName + '.css')
    })

    // Define emoji input
    sheetEl.addEventListener('click', ev => {
      onEmoji({
        emoji: 'TODO',
        hexcode: ev.target.dataset.hexcode
      })
    })
  }

  // Default group
  selectGroup('smileys-emotion')

  // Define tab input
  tabsEl.addEventListener('click', ev => {
    const groupName = ev.target.dataset.groupName
    if (groupName) {
      selectGroup(groupName)
    }
  })

  return root
}
