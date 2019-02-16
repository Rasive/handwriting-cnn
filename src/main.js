import * as mobilenet from "@tensorflow-models/mobilenet"

const WIDTH = 64;
const HEIGHT = 64;
const RATIO = 4;

const CURSOR_OFFSET_X = 2;
const CURSOR_OFFSET_Y = 2;

document.addEventListener('DOMContentLoaded', async () => {
    const model = await mobilenet.load();

    const predictionsDiv = document.getElementById('predictions');
    const canvas = document.getElementById('user-input');
    const context = canvas.getContext('2d');

    const canvasBoundingClientRect = canvas.getBoundingClientRect();

    canvas.setAttribute('width', WIDTH * RATIO);
    canvas.setAttribute('height', HEIGHT * RATIO);

    let mousedown = false;
    let oldx = 0;
    let oldy = 0;

    canvas.addEventListener('mousemove', async (mouseevent) => {
        const x = mouseevent.clientX - canvasBoundingClientRect.left - CURSOR_OFFSET_X | 0;
        const y = mouseevent.clientY - canvasBoundingClientRect.top - CURSOR_OFFSET_Y | 0;

        if (mousedown) {
            context.lineWidth = 1 * RATIO;
            context.beginPath();
            context.moveTo(oldx, oldy);
            context.lineTo(x, y);
            context.stroke();

            let predictions = await model.classify(canvas);


            addPredictions(predictionsDiv, predictions);
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

function clearPredictions(div) {
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

function addPredictions(div, predictions) {
    clearPredictions(div);

    predictions.map(prediction => {
        const predictionDiv = document.createElement('div');
        predictionDiv.className = 'prediction';

        const title = document.createElement('span');
        title.innerHTML = prediction.className;
        title.className = 'title';
        predictionDiv.appendChild(title);

        const prob = document.createElement('span');
        prob.innerHTML = prediction.probability;
        prob.className = 'prob';
        predictionDiv.appendChild(prob);

        div.appendChild(predictionDiv);
    });
}
