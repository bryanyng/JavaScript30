const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(localMediaStream => {
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err => {
            console.log("Please enable webcam!");
        })
}

function paintToCanvas() {
    const w = video.videoWidth;
    const h = video.videoHeight;
    canvas.width = w;
    canvas.height = h;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, w, h);
        let pixels = ctx.getImageData(0, 0, w, h);

        // add filter
        // pixels = redEffect(pixels);
        pixels = rgbSplit(pixels);

        // ctx.globalAplha = 0.1;

        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function takePhoto() {
    snap.currentTime = 0;
    snap.play();

    // get data of image in string form & generate link to it
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
    for(let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 100; // r
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // g
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // b
    }
    return pixels;
}

function rgbSplit(pixels) {
    for(let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i - 150] = pixels.data[i + 0];
        pixels.data[i + 100] = pixels.data[i + 1];
        pixels.data[i - 150] = pixels.data[i + 2];
    }
    return pixels;
}

function greenScreen(pixels) {
    // take rgb array and remove the values in between the threshold of that color
    // e.g. red color find all values of rgb = red then remove then all
}

getVideo();

video.addEventListener('canplay', paintToCanvas);