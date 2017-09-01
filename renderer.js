// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const EddystoneBeaconScanner = require('eddystone-beacon-scanner');
const beaconsListEl = document.getElementById('beacons-list');
let beacons = [];

function handleNewBeacon(beacon) {
  const { url } = beacon;

  const foundBeacon = beacons.find(beacon => beacon.url === url);

  if (foundBeacon) {
    Object.assign(foundBeacon, beacon);
  } else {
    beacons.push(beacon);
  }
}

EddystoneBeaconScanner.on('found', function(beacon) {
  handleNewBeacon(beacon);
  displayBeacons();
});

EddystoneBeaconScanner.on('updated', function(beacon) {
  handleNewBeacon(beacon);
  displayBeacons();
});

EddystoneBeaconScanner.startScanning(true);

setInterval(function () {
  console.log('Start beacon scanning');
  EddystoneBeaconScanner.startScanning();
}, 500);

function displayBeacons() {
  beaconsListEl.innerHTML = '';

  beacons.forEach(beacon => {
    const { distance, url } = beacon;
    const listEl = document.createElement('li');

    const label = `${url.replace('https://', '')} is ${distance.toFixed(2)}m from here`;
    listEl.innerText = label;

    beaconsListEl.appendChild(listEl);
  });
}
