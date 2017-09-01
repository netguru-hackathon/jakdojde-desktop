'use strict';

const mappedData = [
	{x: 13, y: 73},
	{x: 8, y: 6},
	{x: 67, y: 13},
	{x: 50, y: 45},
	{x: 89, y: 11},
];

const translateCoords = canvasSize => {
  const transform = canvasSize / 100;

  return ({ x, y }) => ({ x: x * transform, y: y * transform });
};

const clearCanvas = (ctx, size) => {
  ctx.clearRect(0, 0, size, size);
}

const drawHotspots = (ctx, canvasSize, coords) => {
  clearCanvas(ctx, canvasSize);
  ctx.fillStyle = 'black';
  coords.map(translateCoords(canvasSize))
    .forEach(({ x, y }) => {
      ctx.fillRect(x, y, 3, 3);
    });
}

const canvas = () => {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d');
  const canvasSize = Number(canvas.getAttribute('width'));

  drawHotspots(ctx, canvasSize, mappedData);
}

document.addEventListener('DOMContentLoaded', canvas);
