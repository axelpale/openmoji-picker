const omSprites = require('openmoji-sprites')

const groups = omSprites.includeGroups.map(groupName => {
  const group = omSprites.groups[groupName]
  return Object.assign({}, group, {
    name: groupName,
    images: group.sheets.map(sheet => require(sheet.files.png.png)),
    styles: group.sheets.map(sheet => require(sheet.files.png.css))
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
    tabEl.dataset.groupName = group.name
    tabsEl.appendChild(tabEl)
  })

  const selectGroup = (groupName) => {
    // Create new sheet
    const sheetEl = document.createElement('div')
    viewEl.appendChild(sheetEl)

    // Remove possible old sheet
    if (viewEl.children.length > 1) {
      viewEl.removeChild(viewEl.firstChild)
    }

    // Default group smileys
    let selectedGroup = omSprites.groups[groupName]

    // Create emojis for the selected group
    selectedGroup.sheets.forEach(sheet => {
      sheet.hexcodes.forEach(hexcode => {
        const emojiEl = document.createElement('span')
        emojiEl.className = 'openmoji openmoji-' + hexcode
        emojiEl.dataset.hexcode = hexcode
        sheetEl.appendChild(emojiEl)
      })
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
