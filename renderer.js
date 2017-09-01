// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const EddystoneBeaconScanner = require('eddystone-beacon-scanner');
const beaconsListEl = document.getElementById('beacons-list');
let beacons = [];

EddystoneBeaconScanner.on('found', function(beacon) {
  const { url } = beacon;

  let foundBeacon = beacons.find(beacon => {
    if (beacon.url === url) return beacon;
  });

  if (!foundBeacon) {
    beacons.push(beacon);
  } else {
  }

  displayBeacons();
});

EddystoneBeaconScanner.on('updated', function(beacon) {
  console.log(beacon);
  const { distance, url } = beacon;

  let foundBeacon = beacons.find(beacon => {
    if (beacon.url === url) return beacon;
  });

  const foundBeaconIndex = beacons.indexOf(foundBeacon);

  beacons[foundBeaconIndex].distance = distance;

  displayBeacons();
});

EddystoneBeaconScanner.startScanning(true);

function displayBeacons() {
  beaconsListEl.innerHTML = '';

  beacons.forEach(beacon => {
    const { distance, url } = beacon;
    const listEl = document.createElement('li');

    listEl.innerText = `${url} is ${distance} away from here`;

    beaconsListEl.appendChild(listEl);
  });
}
