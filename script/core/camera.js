export function createCamera(scene, canvas) {
const camera = new BABYLON.ArcRotateCamera(
"Camera",
Math.PI / 4,
Math.PI / 3,
20,
new BABYLON.Vector3(5, 2, 5),
scene
);
camera.attachControl(canvas, true);
}