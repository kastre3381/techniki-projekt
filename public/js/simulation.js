const canvas = document.getElementById("solarSystemCanvas");
const ctx = canvas.getContext("2d");
const sunRadius = 30; 
const glowRadius = 30;
var canvas_before_h = canvas.height;
var canvas_before_w = canvas.width;
const stars = [];
var play = false;
const planetImages = {}; 
var intensity, intensityVal;

const loadPlanetImages = () => {
  planets.forEach(planet => {
    const img = new Image();
    img.src = `../images/${planet.name.toLowerCase()}.png`; 
    planetImages[planet.name] = img;
  });
};



function playOnOff()
{
  if(play)
  {
    var btn = document.getElementById("onoffbtn");
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16">' +
    '<path d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z"/>' +
  '</svg> Rozpocznij animację';
    play = false;
    btn.classList.remove("btn-outline-danger");
    btn.classList.add("btn-outline-success")
  }
  else 
  {
    var btn = document.getElementById("onoffbtn");
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause" viewBox="0 0 16 16">' +
    '<path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5m4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5"/>' +
  '</svg> Zatrymaj animację';
    play = true;
    btn.classList.remove("btn-outline-success");
    btn.classList.add("btn-outline-danger")
  }
}

function saveAsPNG() {
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "screenshow_uklad_sloneczny.png";
  link.click();
}

function generateStars() {
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 2;
    stars.push({ x, y, size });
  }
}

function drawStars() {
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  });
}

function moveStars() {
  stars.forEach(star => {
    star.x -= 0.4;
    if (star.x < 0) {
      star.x = canvas.width;
    }
  });
}


var min = canvas.width < canvas.height ? canvas.width : canvas.height;

const planets = [
  { polos_mala: null, odl_field: null, polos_duza: null, radius: min/30, distance: 0, speed: 0.01, name: "Sun", orbit: null},
  { polos_mala: 0.39, odl_field: 'odl_merkury', polos_duza: 0.47, radius: min/150, distance: min/2 * 0.15, speed: 0.03, name: "Mercury", orbit: [] },
  { polos_mala: 0.72, odl_field: 'odl_wenus', polos_duza: 0.72, radius: min/120, distance: min/2 * 0.20, speed: 0.02, name: "Venus", orbit: [] },
  { polos_mala: 1, odl_field: 'odl_ziemia', polos_duza: 1.0, radius: min/100, distance: min/2 * 0.27, speed: 0.015, name: "Earth", orbit: [] },
  { polos_mala: 1.38, odl_field: 'odl_mars', polos_duza: 1.67, radius: min/120, distance: min/2 * 0.35, speed: 0.01, name: "Mars", orbit: [] },
  { polos_mala: 4.95, odl_field: 'odl_jowisz', polos_duza: 5.46, radius: min/50, distance: min/2 * 0.48, speed: 0.006, name: "Jupiter", orbit: [] },
  { polos_mala: 9.05, odl_field: 'odl_saturn', polos_duza: 10.12, radius: min/60, distance: min/2 * 0.65, speed: 0.004, name: "Saturn", orbit: [] },
  { polos_mala: 18.37, odl_field: 'odl_uran', polos_duza: 20.11, radius: min/100, distance: min/2 * 0.82, speed: 0.003, name: "Uranus", orbit: [] },
  { polos_mala: 29.74, odl_field: 'odl_neptun', polos_duza: 30.44, radius: min/100, distance: min/2 * 0.95, speed: 0.002, name: "Neptune", orbit: [] },
];

loadPlanetImages();

function updatePlanets()
{
  planets[0].radius = min/30;
  planets[1].radius = min/150;
  planets[2].radius = min/120;
  planets[3].radius = min/100;
  planets[4].radius = min/120;
  planets[5].radius = min/50;
  planets[6].radius = min/60;
  planets[7].radius = min/100;
  planets[8].radius = min/100;
  planets[1].distance = min/2 * 0.15;
  planets[2].distance = min/2 * 0.2;
  planets[3].distance = min/2 * 0.27;
  planets[4].distance = min/2 * 0.35;
  planets[5].distance = min/2 * 0.48;
  planets[6].distance = min/2 * 0.65;
  planets[7].distance = min/2 * 0.82;
  planets[8].distance = min/2 * 0.95;
  
}

function updateStarsAfterCanvasChange() {
  const ratioX = canvas.width / canvas_before_w;
  const ratioY = canvas.height / canvas_before_h;

  stars.forEach(star => {
    star.x *= ratioX;
    star.y *= ratioY;
    if (star.x < 0) {
      star.x = canvas.width;
    }
  });
}



generateStars();

function updateIntensity(id1, id2) {
  if(document.getElementById(id1))
  {
    if(document.getElementById(id2))
    {
      intensity = parseFloat(document.getElementById(id1).value);
      document.getElementById(id2).innerHTML = intensity;
      intensityVal = intensity;
    }
  }
}



  function resizeCanvas() {
    canvas_before_h = canvas.height;
    canvas_before_w = canvas.width;
    canvas.width =
      window.innerWidth < window.innerHeight
        ? window.innerWidth * 0.8
        : window.innerHeight * 0.8;
    canvas.height =
      window.innerWidth < window.innerHeight
        ? window.innerWidth * 0.8
        : window.innerHeight * 0.8;
        updateStarsAfterCanvasChange();
        min = canvas.width < canvas.height ? canvas.width : canvas.height;
        updatePlanets();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawStars();
  }
  

  window.addEventListener("resize", resizeCanvas);
 

  resizeCanvas();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawStars();

document.addEventListener("DOMContentLoaded", function() {

  intensityVal = document.getElementById("intensityVal");

  function clearOrbits()
  {
    planets[1].orbit.length = 0;
    planets[2].orbit.length = 0;
    planets[3].orbit.length = 0;
    planets[4].orbit.length = 0;
    planets[5].orbit.length = 0;
    planets[6].orbit.length = 0;
    planets[7].orbit.length = 0;
    planets[8].orbit.length = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawStars(); 
    
    drawSun();

    drawPlanets();
  }

  document.getElementById("orbit-clear").addEventListener("click", clearOrbits);

function drawSun()
{
  const gradient = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    sunRadius - glowRadius,
    canvas.width / 2,
    canvas.height / 2,
    sunRadius
  );
  gradient.addColorStop(0, "rgba(255, 255, 0, 0.7)");
  gradient.addColorStop(1, "rgba(255, 255, 0, 0)");

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, sunRadius, 0, 2 * Math.PI);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.closePath();


  ctx.drawImage(
    planetImages["Sun"],
    canvas.width / 2 - planets[0].radius,
    canvas.height / 2 - planets[0].radius,
    planets[0].radius * 2,
    planets[0].radius * 2
  );
}

function movePlanets()
{
  planets.slice(1).forEach(planet => {
    planet.angle = (planet.angle || 0) + planet.speed*intensity;
  });
}

function drawPlanets()
{
  planets.slice(1).forEach(planet => {
    const a = planet.distance;
    const b = planet.distance * planet.polos_mala / planet.polos_duza; 
    const x = canvas.width / 2 + a * Math.cos(planet.angle);
    const y = canvas.height / 2 + b * Math.sin(planet.angle);


    if(planet.orbit.length >= 1 && x !== planet.orbit[planet.orbit.length-1].x && y !== planet.orbit[planet.orbit.length-1].y)
    planet.orbit.push({x, y});
    else if(planet.orbit.length == 0)
    planet.orbit.push({x, y});
    if(document.getElementById("orbitCheckbox").checked)
    drawOrbit(planet.orbit);      

    let dist = distanceFromSun(x,y) / planet.distance * planet.polos_duza;

    document.getElementById(planet.odl_field).innerHTML = dist.toFixed(4);

    let w = 2;

    if(planet.name == "Saturn") w = 4;

    ctx.drawImage(
      planetImages[planet.name],
      x - planet.radius,
      y - planet.radius,
      planet.radius * w,
      planet.radius * 2
    );
  });
}

const selectElement = document.getElementById('selectForOptions'); 

selectElement.addEventListener('change', function() {
  var selectedOption = this.value.split(',');
  document.getElementById('speedVal').value = selectedOption[0];
  if(selectedOption[1] === 'true')
  document.getElementById('orbitCheckbox').checked = true;
  else
  document.getElementById('orbitCheckbox').checked = false;
  draw();
});

function drawOrbit(orbit)
{
  ctx.beginPath();
  ctx.moveTo(orbit[0].x, orbit[0].y);
  for(let i=1; i<orbit.length; i++) ctx.lineTo(orbit[i].x, orbit[i].y);
  ctx.strokeStyle = "gray";
  ctx.stroke();
  ctx.closePath();
}

function distanceFromSun(x, y)
{
  return Math.sqrt(Math.pow(x-canvas.width/2, 2) + Math.pow(y-canvas.height/2, 2));
}


function draw() {
  if(play)
  {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawStars(); 

    moveStars();
    
    drawSun();

    drawPlanets();
    movePlanets();
  }

  requestAnimationFrame(draw);
  updateIntensity("speedVal", "intensityVal"); 
}



draw();
});