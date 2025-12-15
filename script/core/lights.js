import { createLantern } from "../entities/Lantern.js";


export function createLights(scene) {
const { light } = createLantern(scene, 7, 5, 7);


const shadowGen = new BABYLON.ShadowGenerator(1024, light);
shadowGen.usePoissonSampling = true;
shadowGen.bias = 0.01;
shadowGen.normalBias = 0.05;


return shadowGen;
}