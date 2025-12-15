import { createCamera } from "./camera.js";
import { createLights } from "./lights.js";
import { buildWorld } from "../world/WorldBuilder.js";


export function createScene(engine, canvas) {
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = BABYLON.Color3.Black();


  createCamera(scene, canvas);
  const shadowGen = createLights(scene);
  buildWorld(scene, shadowGen);


  return scene;
}