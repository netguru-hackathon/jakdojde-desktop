'use strict';

document.addEventListener('DOMContentLoaded', function(){
	const ctx = document.getElementById('canvas').getContext('2d');
	// ctx.fillRect(10, 10, 100, 100);

	const mappedData = [
		{x: 13, y: 73},
		{x: 8, y: 6},
		{x: 67, y: 13},
		{x: 50, y: 45},
		{x: 89, y: 11},
	];

	function translateCoords({ x, y }) {
		return { x: x*4, y: y*4 };
	}

	function drawHotspots(coords) {
		ctx.clearRect(0, 0, 400, 400);
		ctx.fillStyle = 'black';
		coords.map(translateCoords).forEach(({x, y}) => {
			ctx.fillRect(x, y, 3, 3);
		});
	}

	drawHotspots(mappedData);

}, false);
