const WIDTH = 64;
const HEIGHT = 64;
const RATIO = 4;

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('user-input');
    const context = canvas.getContext('2d');

    canvas.setAttribute('width', WIDTH * RATIO);
    canvas.setAttribute('height', HEIGHT * RATIO);

    let mousedown = false;
    let oldx = 0;
    let oldy = 0;

    canvas.addEventListener('mousemove', (mouseevent) => {

        const x = mouseevent.clientX - 10.0 | 0;
        const y = mouseevent.clientY - 10.0 | 0;

        if (mousedown) {
            context.lineWidth = 1 * RATIO;
            context.beginPath();
            context.moveTo(oldx, oldy);
            context.lineTo(x, y);
            context.stroke();
        }

        oldx = x;
        oldy = y;
    });

    canvas.addEventListener('mousedown', (mouseevent) => {
        mousedown = true;
    });

    canvas.addEventListener('mouseup', (mouseevent) => {
        mousedown = false;
    })
});
