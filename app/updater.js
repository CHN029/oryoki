const {app, dialog, ipcMain} = require('electron')
const request = require('request')

const menus = require('./menus')

const tmp = null
var status = 'no-update'

const feed = 'http://oryoki.io/latest.json'
var latest = null

function init () {

  checkForUpdate(false)
}

function checkForUpdate (alert) {
  console.log('[updater] Checking for update...')
  request(feed, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      latest = JSON.parse(body)
      compareVersions(alert)
    }
    if (error) {
      console.log('[updater] ' + error)

      if (alert) {
        dialog.showMessageBox(
          {
            type: 'info',
            message: 'Oops! There was a problem checking for update.',
            detail: 'It seems like the Internet connection is offline.',
            buttons: ['OK'],
            defaultId: 0
          }
        )
      }
    }
  }.bind(this))
}

function compareVersions (alert) {
  var current = app.getVersion().split('.')
  var suspect = latest.version.split('.')

  for (var i = 0; i < suspect.length; i++) {
    // major.minor.revision, single digits

    if (parseInt(suspect[i]) > parseInt(current[i])) {
      console.log('[updater] Available: ' + latest.version)

      status = 'update-available'
      menus.refresh()

      // if (UserManager.getPreferenceByName('download_updates_in_background')) this.downloadUpdate()
      // else {
      //   new Notification('Update available!', {
      //     body: 'Ōryōki ' + this.latest.version + ' is available.',
      //     silent: true
      //   })

      //   if (Oryoki.focusedWindow) {
      //     for (var i = 0; i < Oryoki.windows.length; i++) {
      //       Oryoki.windows[i].browser.webContents.send('update-available', this.latest)
      //     }
      //   }
      // }

      break
    }
  }

  console.log('[updater] No update available')

  if (alert) {
    dialog.showMessageBox(
      {
        type: 'info',
        message: 'Ōryōki is up to date.',
        detail: 'Version ' + app.getVersion() + ' is the latest version.',
        buttons: ['OK'],
        defaultId: 0
      }
    )
  }
}

function getStatus() {
  return status
}

function getLatest() {
  return latest
}

module.exports = {
  init: init,
  checkForUpdate: checkForUpdate,
  getStatus: getStatus,
  getLatest: getLatest
}