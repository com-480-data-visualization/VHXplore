import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


let camera, scene, renderer,textGroup,starField;

init();
render();

function init() {
  const container = document.getElementById('intro-canvas-container');

  scene = new THREE.Scene();
  createStarfield();
  const ambientLight = new THREE.AmbientLight(0x888888);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
  directionalLight.position.set(0.5, 1, 1).normalize();
  scene.add(directionalLight);

  const sideLight = new THREE.DirectionalLight(0xffffff, 0.5);
  sideLight.position.set(-1, 0.2, 0.2).normalize();
  scene.add(sideLight);


  scene.background = null;
  const loader = new FontLoader();
  loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
    textGroup = new THREE.Group(); 

    const material = new THREE.MeshPhongMaterial({
      color: 0x00bfff,
      shininess: 150,
      specular: 0xffffff,
      emissive: 0x00bfff, 
      emissiveIntensity: 0.3, 
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide
    });
    
    const matLine = new THREE.LineBasicMaterial({
      color: 0x082099, 
      side: THREE.DoubleSide
    });
    
    const message1 = 'Programming Languages';
    const shapes1 = font.generateShapes(message1, 25);
    const geometry1 = new THREE.ShapeGeometry(shapes1);
    geometry1.computeBoundingBox();
    const xMid1 = -0.5 * (geometry1.boundingBox.max.x - geometry1.boundingBox.min.x);
    geometry1.translate(xMid1, 0, 0);
    
    const text1 = new THREE.Mesh(geometry1, material);
    text1.position.z = 15;
    textGroup.add(text1);
    
    const shapesWithHoles1 = shapes1.concat(
      ...shapes1.flatMap(s => s.holes || [])
    );
    
    const lineGroup1 = new THREE.Object3D();
    for (let shape of shapesWithHoles1) {
      const points = shape.getPoints();
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      lineGeometry.translate(xMid1, 0, 0);
      const lineMesh = new THREE.Line(lineGeometry, matLine);
      lineGroup1.add(lineMesh);
    }
    lineGroup1.position.z = 0;
    textGroup.add(lineGroup1);
    
    const message2 = 'Explorer';
    const shapes2 = font.generateShapes(message2, 43);
    const geometry2 = new THREE.ShapeGeometry(shapes2);
    geometry2.computeBoundingBox();
    const xMid2 = -0.5 * (geometry2.boundingBox.max.x - geometry2.boundingBox.min.x);
    geometry2.translate(xMid2, 0, 0);
    
    const text2 = new THREE.Mesh(geometry2, material);
    text2.position.y = -60;
    text2.position.z = 15;
    textGroup.add(text2);
    
    const shapesWithHoles2 = shapes2.concat(
      ...shapes2.flatMap(s => s.holes || [])
    );
    
    const lineGroup2 = new THREE.Object3D();
    for (let shape of shapesWithHoles2) {
      const points = shape.getPoints();
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      lineGeometry.translate(xMid2, 0, 0);
      const lineMesh = new THREE.Line(lineGeometry, matLine);
      lineGroup2.add(lineMesh);
    }
    lineGroup2.position.y = -60;
    lineGroup2.position.z = 0;
    textGroup.add(lineGroup2);
    
    scene.add(textGroup);
    

  });

  camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 1, 1000);
  camera.position.set(-100, -250, 400);

  renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0); 
  controls.update();

  controls.addEventListener('change', render);

  window.addEventListener('resize', onWindowResize);
}

function createStarfield() {
  const starsGeometry = new THREE.BufferGeometry();
  const starCount = 1000;
  const positions = [];

  for (let i = 0; i < starCount; i++) {
    const x = THREE.MathUtils.randFloatSpread(1000); // -500 ~ 500
    const y = THREE.MathUtils.randFloatSpread(1000);
    const z = THREE.MathUtils.randFloatSpread(1000);
    positions.push(x, y, z);
  }

  starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  const starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1,
    sizeAttenuation: true,
  });

  starField = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(starField);
}


function onWindowResize() {
  const container = document.getElementById('intro-canvas-container');
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
  render();
}

function render(time) {
  requestAnimationFrame(render);

  if (textGroup) {
    const t = time * 0.001; 
    textGroup.position.y = Math.sin(t) * 10;
  }



  renderer.render(scene, camera);
}
