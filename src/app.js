/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3, LoadingManager } from 'three';
import { SeedScene } from 'scenes';
import { CustomControl } from 'customcontrol';
import { Interface } from 'interface';

// Initialize core ThreeJS components
const load_screen = new Interface();

const loadingManager = new LoadingManager( () => {
    const loadingScreen = document.getElementById( 'loading-screen' );
    loadingScreen.classList.add( 'fade-out' );
} );
const scene = new SeedScene(loadingManager);

loadingManager.onLoad = function() {
    document.getElementById( 'loading-screen' ).remove();
    document.body.style.margin = 0; // Removes margin around page
    document.body.style.overflow = 'hidden'; // Fix scrolling
    document.body.appendChild(window.canvas);
    scene.addGUI();
};

const renderer = new WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, logarithmicDepthBuffer: true });
const controls = new CustomControl();
window.selectId = "Sol";
window.focusId = "Sol";
window.focusObj = scene;
window.cam = new PerspectiveCamera(undefined, undefined, 0.001, 150000000);
window.cam.position.set(42000000, 17000000, 4000000);
window.cam.lookAt(new Vector3(0, 0, 0));
scene.addCamera(window.cam);

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
window.canvas = renderer.domElement;
window.canvas.style.display = 'block'; // Removes padding below canvas

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
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
