const scene =
new THREE.Scene();

const camera =
new THREE.PerspectiveCamera(
  75,
  window.innerWidth /
  window.innerHeight,
  0.1,
  1000
);

const renderer =
new THREE.WebGLRenderer({
  canvas:
  document.getElementById("bg"),

  antialias:true,
  alpha:true
});

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

renderer.setPixelRatio(
  window.devicePixelRatio
);

camera.position.z = 30;

/* Geometry */

const geometry =
new THREE.TorusKnotGeometry(
  10,
  3,
  120,
  16
);

/* Material */

const material =
new THREE.MeshStandardMaterial({

  color:0x7c3aed,

  wireframe:true
});

/* Mesh */

const torus =
new THREE.Mesh(
  geometry,
  material
);

scene.add(torus);

/* Lights */

const pointLight =
new THREE.PointLight(
  0xffffff,
  1
);

pointLight.position.set(
  20,
  20,
  20
);

scene.add(pointLight);

const ambientLight =
new THREE.AmbientLight(
  0xffffff,
  0.5
);

scene.add(ambientLight);

/* Animation */

function animate(){

  requestAnimationFrame(
    animate
  );

  torus.rotation.x += 0.003;
  torus.rotation.y += 0.005;

  renderer.render(
    scene,
    camera
  );
}

animate();

/* Resize */

window.addEventListener(
  "resize",
  ()=>{

    camera.aspect =
    window.innerWidth /
    window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );
  }
);