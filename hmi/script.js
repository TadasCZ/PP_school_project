const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let scene = {
    width: 800,
    height: 600
};

let planet = {
    radius: 50,
    mass: 500
};

let scale = 1;

function resizeCanvas() {
    const controlsHeight = document.querySelector('header')?.offsetHeight || 0; 
    
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight - controlsHeight - 40;

    const scaleX = windowWidth / scene.width;
    const scaleY = windowHeight / scene.height;
    scale = Math.min(scaleX, scaleY);

    canvas.width = scene.width * scale;
    canvas.height = scene.height * scale;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function drawPlanet() {
    ctx.save();
    ctx.scale(scale, scale);
    ctx.beginPath();
    ctx.arc(
        scene.width / 2,
        scene.height / 2,
        planet.radius,
        0,
        Math.PI * 2
    );
    ctx.fillStyle = "blue";
    ctx.fill();

    ctx.restore();
}

const planetSizeInput = document.getElementById("planetSize");
const massSlider = document.getElementById("planetMass");
const massValue = document.getElementById("massValue");
const sceneWidthInput = document.getElementById("sceneWidth");
const sceneHeightInput = document.getElementById("sceneHeight");

planetSizeInput.addEventListener("input", () => {
    planet.radius = Number(planetSizeInput.value);
});

massSlider.addEventListener("input", () => {
    planet.mass = Number(massSlider.value);
    massValue.textContent = planet.mass;
});

function onSceneSizeChange() {
    scene.width = Number(sceneWidthInput.value);
    scene.height = Number(sceneHeightInput.value);
    resizeCanvas();
}

sceneWidthInput.addEventListener("change", onSceneSizeChange);
sceneHeightInput.addEventListener("change", onSceneSizeChange);

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlanet();
    requestAnimationFrame(loop);
}

loop();