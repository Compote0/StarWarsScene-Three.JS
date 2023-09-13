import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.156.1/examples/jsm/controls/OrbitControls.js'; 
import { GLTFLoader } from 'https://unpkg.com/three@0.156.1/examples/jsm/loaders/GLTFLoader.js';

// Scene Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Camera looking at the object
const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, 2.5);

// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// Controls around the target
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();


// Sun
const sunLight = new THREE.PointLight(0xffffff, 10000, 0);
sunLight.position.set(-10, 10, -10);
scene.add(sunLight);
//Luminous halo
const sunGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
sunMesh.position.set(10, 10, 10); 
scene.add(sunMesh);


// Environement loader
const envLoader = new GLTFLoader();
envLoader.load('models/skypano/scene.gltf', function(gltf) {
    const envModel = gltf.scene;
    envModel.scale.set(30, 30, 30);
    scene.add(envModel);
}, undefined, function(error) {
    console.error(error);
});

// Death Star loader
const starLoader = new GLTFLoader();
starLoader.load('models/deathstar/scene.gltf', function(gltf) {
    const starModel = gltf.scene;
    starModel.position.set(-3, 1, -100); 
    starModel.scale.set(1, 1, 1);
    scene.add(starModel);
}, undefined, function(error) {
    console.error(error);
});

// Xwing loader
const xwingLoader = new GLTFLoader();
xwingLoader.load('models/xwing/scene.gltf', function(gltf) {
    const xwingModel = gltf.scene;
    xwingModel.position.set(1, 0, 6);
    xwingModel.scale.set(0.4, 0.4, 0.4);
    xwingModel.rotation.y += 0.8;
    xwingModel.rotation.x += 0.8;
    scene.add(xwingModel);
}, undefined, function(error) {
    console.error(error);
});

// TIE Loader
const tieLoader = new GLTFLoader();
tieLoader.load('models/tie/scene.gltf', function(gltf) {
    const tieModel = gltf.scene;
    tieModel.position.set(-3, 1, -4); 
    tieModel.scale.set(0.6, 0.6, 0.6);
    scene.add(tieModel);
}, undefined, function(error) {
    console.error(error);
});


// Animation loop
function animate() {
requestAnimationFrame(animate);
controls.update();
renderer.render(scene, camera);

// Update camera position
const position = camera.position;
document.getElementById('cameraPosition').innerText = `x: ${position.x.toFixed(2)}, y: ${position.y.toFixed(2)}, z: ${position.z.toFixed(2)}`;
}

animate();