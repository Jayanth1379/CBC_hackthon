import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/controls/OrbitControls.js';

// Create Scene
const scene = new THREE.Scene();

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('3d-container').appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1, 0);
controls.update();

// Load 3D Model
const loader = new GLTFLoader();
loader.load('./Air Squat.gltf', function (gltf) {
    const model = gltf.scene;
    scene.add(model);

    // Animation mixer if animations exist
    let mixer;
    if (gltf.animations && gltf.animations.length) {
        mixer = new THREE.AnimationMixer(model);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
    }

    // Animation loop
    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        if (mixer) {
            mixer.update(clock.getDelta());
        }
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}, undefined, function (error) {
    console.error('An error happened loading the model:', error);
});

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
