/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3, LoadingManager } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SeedScene, LoadingScreen } from 'scenes';
import { CustomControl } from 'customcontrol';

// Initialize core ThreeJS components
var RESOURCES_LOADED = false;
var loadingManager = new LoadingManager();
const scene = new SeedScene(loadingManager);

loadingManager.onLoad = function() {
    RESOURCES_LOADED = true;
    scene.addGUI();
};
const loadingscreen = new LoadingScreen();

const renderer = new WebGLRenderer({ antialias: true });
const controls = new CustomControl();
window.selectId = "Sol";
window.focusId = "Sol";
window.focusObj = scene;
window.cam = new PerspectiveCamera(undefined, undefined, 0.001, 1500000000);
window.cam.position.set(42000000, 17000000, 4000000);
window.cam.lookAt(new Vector3(0, 0, 0));
scene.addCamera(window.cam);

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    if (RESOURCES_LOADED == false) {
        renderer.render(loadingscreen.scene, loadingscreen.camera);
        loadingscreen.scene.update && loadingscreen.scene.update(timeStamp);
        window.requestAnimationFrame(onAnimationFrameHandler);
        return;
    }
    renderer.render(scene, window.cam);
    scene.update && scene.update(timeStamp);
    window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    window.cam.aspect = innerWidth / innerHeight;
    window.cam.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);
