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

  // 强化平行光，调整角度让光斜打进来
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
  directionalLight.position.set(0.5, 1, 1).normalize();
  scene.add(directionalLight);

  // 再加一个从侧面打光的补光（更戏剧性）
  const sideLight = new THREE.DirectionalLight(0xffffff, 0.5);
  sideLight.position.set(-1, 0.2, 0.2).normalize();
  scene.add(sideLight);


  scene.background = null;
  const loader = new FontLoader();
  loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
    textGroup = new THREE.Group(); // 包含文字 mesh 和 line
    const message = 'Programming Languages';
    const shapes = font.generateShapes(message,35);

    const geometry = new THREE.ShapeGeometry(shapes);
    geometry.computeBoundingBox();

    const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
    geometry.translate(xMid, 0, 0); // 居中

    const material = new THREE.MeshPhongMaterial({
      color: 0x00bfff,
      shininess: 150,
      specular: 0xffffff,
      emissive: 0x00bfff, // 与主色相同
      emissiveIntensity: 0.3, // 0.2~0.5 之间最自然
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide
    });




    const text = new THREE.Mesh(geometry, material);
    text.position.z = -150;
    textGroup.add(text);

    // 获取文字 shapes 中的 hole（字母中的洞，比如 "o", "a"）
    const holeShapes = [];
    for (let i = 0; i < shapes.length; i++) {
      const shape = shapes[i];
      if (shape.holes && shape.holes.length > 0) {
        for (let j = 0; j < shape.holes.length; j++) {
          holeShapes.push(shape.holes[j]);
        }
      }
    }

    // 把所有 hole 也加入 shapes 中（用于 line 描边）
    shapes.push(...holeShapes);

    // 为每个 shape 生成线条
    const matLine = new THREE.LineBasicMaterial({
      color: 0x00bfff, // 或 new THREE.Color('#00bfff')
      side: THREE.DoubleSide
    });

    const lineGroup = new THREE.Object3D();

    for (let i = 0; i < shapes.length; i++) {
      const shape = shapes[i];
      const points = shape.getPoints();
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      lineGeometry.translate(xMid, 0, 0);

      const lineMesh = new THREE.Line(lineGeometry, matLine);
      lineGroup.add(lineMesh);
    }

    textGroup.add(lineGroup);
    scene.add(textGroup);

  });

  camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 1, 1000);
  camera.position.z = 500;

  renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0); // 让摄像机围绕中心转
  controls.update();

  // 每次拖动视角时触发 render()
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
    const t = time * 0.001; // 毫秒转秒
    textGroup.position.y = Math.sin(t) * 10; // 浮动范围 10 单位
  }



  renderer.render(scene, camera);
}
