import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import Stats from './jsm/libs/stats.module.js'
import { GUI } from './jsm/libs/lil-gui.module.min.js'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

window.addEventListener(
    'resize',
    () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
    },
    false
)

const stats = Stats()
document.body.appendChild(stats.dom)

const gui = new GUI()
const cubeFolder = gui.addFolder('Cube')
cubeFolder.add(cube.scale, 'x', -5, 5)
cubeFolder.add(cube.scale, 'y', -5, 5)
cubeFolder.add(cube.scale, 'z', -5, 5)
cubeFolder.open()
const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'z', 0, 10)
cameraFolder.open()

function animate() {
    requestAnimationFrame(animate)
    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01
    controls.update()
    render()
    stats.update()
}

function render() {
    renderer.render(scene, camera)
}
// render()
animate()

// import proj4 from 'proj4';
// proj4.defs([

//     [

//         'EPSG:4326',

//         '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees'],

//     [

//         'EPSG:4269',

//         '+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees'

//     ],

//     [

//         'EPSG:28356',

//         '+proj=utm +zone=56 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs '

//     ],

//     [

//         'EPSG:28350',

//         '+proj=utm +zone=50 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs '

//     ]

// ]);

// function projectionTransform(secondProjection, x, y) {
//     let firstProjection = "EPSG:4326"
//     return proj4(firstProjection, secondProjection, [x, y]);
// }
// var y_pole_1=-28.543944504006674
// var x_pole_1=115.51127211328847
// var z_pole_1=294.022
// var l1=projectionTransform("EPSG:28350",x_pole_1,y_pole_1)
// var y_pole_2=-28.543712825505082
// var x_pole_2=115.51157089698127 
// var z_pole_2=292.225
// var l2=projectionTransform("EPSG:28350",x_pole_2,y_pole_2)
// console.log(l1)
// console.log(l2)