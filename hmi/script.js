const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

/* ====== STAV SIMULACE ====== */
let scene = {
    width: 800,
    height: 600
};

let planet = {
    radius: 50,
    mass: 500
};

/* ====== INIT SCÉNY ====== */
function updateSceneSize() {
    canvas.width = scene.width;
    canvas.height = scene.height;
}

updateSceneSize();

/* ====== KRESLENÍ ====== */
function drawPlanet() {
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
}

/* ====== UI NAPOJENÍ ====== */
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
    updateSceneSize();
}

sceneWidthInput.addEventListener("change", onSceneSizeChange);
sceneHeightInput.addEventListener("change", onSceneSizeChange);

/* ====== HLAVNÍ SMYČKA ====== */
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlanet();
    requestAnimationFrame(loop);
}

loop();