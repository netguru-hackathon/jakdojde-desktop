'use strict';

const { Menu, Tray, shell } = require('electron');
// const shell = require('shell');

class EddystoneTrayIcon {
  constructor(opts) {
    opts = opts || {};

    this.trayIcon = new Tray(opts.iconForNotFound);

    if (opts.toolTip) {
      this.trayIcon.setToolTip(opts.toolTip);
    }

    if (opts.iconForPressed) {
      this.trayIcon.setPressedImage(opts.iconForPressed);
    }

    this.opts = opts;
    this.beacons = [];
    this.refresh();
  }

  refresh() {
    var contextMenu = null;

    if (this.beacons.length > 0) {
      // this.trayIcon.setImage(this.opts.iconForFound);

      contextMenu = Menu.buildFromTemplate(this.beacons.map(function (beacon) {
        return {
          label: [
            (beacon.url || '').replace('https://', ''), ': ', beacon.distance,
          ].join(' '),
          click: function () {
            shell.openExternal(beacon.url);
          }
        };
      }));
    } else {
      // this.trayIcon.setImage(this.opts.iconForNotFound);

      contextMenu = Menu.buildFromTemplate([{label: 'Not found'}]);
    }

    this.trayIcon.setContextMenu(contextMenu);
  }

  add(beacon) {
    const existingBeacon = this.beacons.find(b => b.url === beacon.url);
    if (existingBeacon) {
      Object.assign(existingBeacon, beacon);
    } else {
      this.beacons.push(beacon);
    }
    this.refresh();
  }

  remove(beacon) {
    this.beacons = this.beacons.filter(b => b.url !== beacon.url);
  }

  clear(beacon) {
    // this.beacons = [];
    // this.refresh();
  }
}

module.exports = EddystoneTrayIcon;
