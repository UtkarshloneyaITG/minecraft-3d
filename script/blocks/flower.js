export function createMinecraftFlower(scene, texturePath) {

  const flower = new BABYLON.TransformNode("flower", scene);

  const mat = new BABYLON.StandardMaterial("flowerMat", scene);
  mat.diffuseTexture = new BABYLON.Texture(texturePath, scene);
  mat.diffuseTexture.hasAlpha = true;
  mat.useAlphaFromDiffuseTexture = true;

  mat.backFaceCulling = false;
  mat.specularColor = BABYLON.Color3.Black();
  mat.emissiveColor = new BABYLON.Color3(1, 1, 1);

  const plane1 = BABYLON.MeshBuilder.CreatePlane(
    "flowerPlane1",
    { width: 1, height: 1 },
    scene
  );
  plane1.material = mat;
  plane1.parent = flower;
  plane1.position.y = -0.125;

  const plane2 = plane1.clone("flowerPlane2");
  plane2.rotation.y = Math.PI / 2;

  // plane1.renderingGroupId = 2;
  // plane2.renderingGroupId = 2;

  return flower;
}
