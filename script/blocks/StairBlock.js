export function createMinecraftStairs(scene, cobalStoneStairMat, rotatex = 0, rotatey = 0) {
  // Parent node for the stair
  const stair = new BABYLON.TransformNode("stair", scene);
  // stair.disableLighting = true
  stair.reflectionTexture = null
  // Bottom full block
  const bottom = BABYLON.MeshBuilder.CreateBox("bottom", {
    // width: 1,
    height: 0.5,
    // depth: 1
  }, scene);

  // Use same material/texture as baseBlock
  bottom.material = cobalStoneStairMat;
  bottom.parent = stair;
  bottom.position.x = 0
  bottom.position.y = -0.25
  // Top half-block
  const top = BABYLON.MeshBuilder.CreateBox("top", {
    // width: 1,
    height: 0.5,
    depth: 0.5
  }, scene);

  top.material = cobalStoneStairMat;
  top.position.y = 0.25;     // Lift half-block so its top is flush at 1.0 height
  top.position.z = 0.25;    // Push backwards to form the stair slope
  top.parent = stair;
  stair.rotation.x = rotatex
  stair.rotation.y = rotatey

  // if (stair instanceof BABYLON.TransformNode) {
  //   stair.getChildMeshes().forEach(m => {
  //     shadowGen.addShadowCaster(m);
  //     m.receiveShadows = true;
  //   });
  // }
  return stair;
}