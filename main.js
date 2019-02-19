//thanks to the Aviator tutorial
//https://tympanus.net/codrops/2016/04/26/the-aviator-animating-basic-3d-scene-threejs/
var scene, camera, FOV, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH, renderer, container;
var hemisphereLight, shadowLight;


function handleWindowResize(){
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
}

function init() {
	createScene();
	createLights();
	loop();
}

function createScene(){
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;

	scene = new THREE.Scene();

	scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

	aspectRatio = WIDTH/HEIGHT;
	FOV = 50;
	nearPlane = 1;
	farPlane = 10000;
	camera = new THREE.PerspectiveCamera(FOV, aspectRatio, nearPlane, farPlane);
	camera.position = (0, 200, 100);

	renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
	renderer.setSize(WIDTH, HEIGHT);
	renderer.shadowMap.enable = true;

	container = document.getElementById('world');
	container.appendChild(renderer.domElement);

	window.addEventListener('resize', handleWindowResize, false);
}

function createLights(){
	hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);
	shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);

	shadowLight.position.set(150, 350, 350);
	shadowLight.castShadow = true;
	shadowLight.shadow.camera.left = -400;
	shadowLight.shadow.camera.right = 400;
	shadowLight.shadow.camera.top = 400;
	shadowLight.shadow.camera.bottom = -400;
	shadowLight.shadow.camera.near = 1;
	shadowLight.shadow.camera.far = 1000;
	shadowLight.shadow.mapSize.width = 2048;
	shadowLight.shadow.mapSize.height = 2048;

	scene.add(hemisphereLight);
	scene.add(shadowLight);
}

function loop(){
	renderer.render(scene, camera);
	requestAnimationFrame(loop);
}

window.addEventListener('load', init, false);