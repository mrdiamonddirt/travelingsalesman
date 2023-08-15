const canvas = document.getElementById('canvas');
const routeCounterElement = document.getElementById('routeCounter');
const routeLengthElement = document.getElementById('routeLength');
const routesCalculatedElement = document.getElementById('routesCalculated');
const bestRouteLengthElement = document.getElementById('bestRouteLength');
const timeTakenElement = document.getElementById('timeTaken');
const startButton = document.getElementById('startButton');
const numCitiesInput = document.getElementById('numCitiesInput');
const ctx = canvas.getContext('2d');

let numCities = parseInt(numCitiesInput.value, 10);
let cities = generateRandomCities(numCities);

let routesCalculated = 0;
let bestRouteLength = Infinity;
let bestRoute = [];
let startTime;

startButton.addEventListener('click', () => {
  numCities = parseInt(numCitiesInput.value, 10);
  cities = generateRandomCities(numCities);
  routesCalculated = 0;
  bestRouteLength = Infinity;
  bestRoute = [];
  timeTakenElement.textContent = '';
  visualizeRandomRoutes();
});

function generateRandomCities(numCities) {
  const generatedCities = [];
  for (let i = 0; i < numCities; i++) {
    const city = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height
    };
    generatedCities.push(city);
  }
  return generatedCities;
}

function calculateRouteLength(route) {
  let length = 0;
  for (let i = 0; i < route.length - 1; i++) {
    const cityA = cities[route[i]];
    const cityB = cities[route[i + 1]];
    length += calculateDistance(cityA, cityB);
  }
  // Return to the starting city
  length += calculateDistance(cities[route[numCities - 1]], cities[route[0]]);
  return length;
}

function calculateDistance(cityA, cityB) {
  return Math.sqrt((cityA.x - cityB.x) ** 2 + (cityA.y - cityB.y) ** 2);
}

function generateRandomRoute() {
  const route = Array.from({ length: numCities }, (_, index) => index);
  for (let i = route.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [route[i], route[j]] = [route[j], route[i]];
  }
  return route;
}

async function visualizeRandomRoutes() {
  startTime = performance.now();
  drawCities();
  const totalPossibleRoutes = calculateAmountOfRoutes();
  routeCounterElement.textContent = `Total Possible Routes: ${totalPossibleRoutes}`;
  
  for (let i = 0; i < totalPossibleRoutes; i++) {
    const randomRoute = generateRandomRoute();
    drawRoute(randomRoute);
    
    const routeLen = calculateRouteLength(randomRoute);
    routeLengthElement.textContent = `Route Length: ${routeLen.toFixed(2)}`;

    if (routeLen < bestRouteLength) {
      bestRouteLength = routeLen;
      bestRoute = randomRoute.slice(); // Store a copy of the current best route
      bestRouteLengthElement.textContent = `Best Route Length: ${bestRouteLength.toFixed(2)}`;
    }

    routesCalculated++;
    routesCalculatedElement.textContent = `Routes Calculated: ${routesCalculated}`;

    await sleep(1); // Minimal delay

    drawCities();
  }

  const endTime = performance.now();
  const timeTaken = (endTime - startTime) / 1000; // Convert to seconds
  timeTakenElement.textContent = `Time Taken: ${timeTaken.toFixed(2)} seconds`;

  // Display the best route at the end of the visualization
  drawBestRoute(bestRoute);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function calculateAmountOfRoutes() {
  let amountOfRoutes = 1;
  for (let i = 1; i <= numCities; i++) {
    amountOfRoutes *= i;
  }
  return amountOfRoutes;
}

function drawCities() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'blue';
  ctx.strokeStyle = 'blue';

  for (const city of cities) {
    ctx.beginPath();
    ctx.arc(city.x, city.y, 5, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawRoute(route) {
  ctx.strokeStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(cities[route[0]].x, cities[route[0]].y);
  for (const cityIndex of route) {
    ctx.lineTo(cities[cityIndex].x, cities[cityIndex].y);
  }
  ctx.closePath();
  ctx.stroke();
}

function drawBestRoute(route) {
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cities[route[0]].x, cities[route[0]].y);
  for (const cityIndex of route) {
    ctx.lineTo(cities[cityIndex].x, cities[cityIndex].y);
  }
  ctx.closePath();
  ctx.stroke();
}

visualizeRandomRoutes();