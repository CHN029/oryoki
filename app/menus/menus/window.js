const windows = require('./../../windows')

module.exports = function () {
  let win = windows.getFocused()
  
  let isAlwaysOnTop = false
  if (win !== null) isAlwaysOnTop = win.isAlwaysOnTop()

  const submenu = [
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize' // Also adds Minimize All
      },
      {
        role: 'zoom'
      },
      {
        type: 'separator'
      },
      {
        label: 'Float on Top',
        type: 'checkbox',
        checked: isAlwaysOnTop,
        click: function (i, win) {
          if (win) {
            win.setAlwaysOnTop(!win.isAlwaysOnTop())
          }
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Window Helper',
        accelerator: 'CmdOrCtrl+Alt+M',
        type: 'checkbox',
        click () {
          
        }
      },
      {
        label: 'Size',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        label: 'Cycle Through Windows',
        accelerator: 'Ctrl+Tab',
        // accelerator: 'CmdOrCtrl+`',
        click () {
          windows.cycle()
        }
      },
      {
        label: 'Bring All to Front',
        role: 'front'
      },
      {
        type: 'separator'
      }
  ]

  return {
    label: 'Window',
    role: 'window',
    submenu
  }
}