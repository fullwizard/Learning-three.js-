import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

const loader = new STLLoader();
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

let mesh;

loader.load(
    "/models/testScrew.stl",

    function (geometry) {

        geometry.center();

        const material = new THREE.MeshNormalMaterial();

        mesh = new THREE.Mesh(geometry, material);

        scene.add(mesh);
    },

    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + "% loaded");
    },

    function (error) {
        console.error(error);
    }
);



const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 100;

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);


const viewer = document.querySelector("#model-viewer");

viewer.appendChild(renderer.domElement);


window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

});

function animate() {
    if (mesh) {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);