export function createOakLog(scene) {
  const oakWoodBlock = BABYLON.MeshBuilder.CreateBox("Oakwood", {}, scene);
  const woodTextureLeftRight = new BABYLON.Texture(
    "assets/texture/oakWoodlogSide.jpg",
    scene
  );
  const woodTexTureFrontBack = new BABYLON.Texture(
    "assets/texture/oakWoodlogSide90.jpg",
    scene
  );
  const woodTextureUpDown = new BABYLON.Texture(
    "assets/texture/oakWoodlogTop.jpg",
    scene
  );
  const OakwoodMat = new BABYLON.StandardMaterial("woodMat", scene);
  OakwoodMat.diffuseTexture = woodTextureLeftRight;
  OakwoodMat.specularColor = BABYLON.Color3.Black()

  const oakWoodFBMat = new BABYLON.StandardMaterial("woodMat", scene);
  oakWoodFBMat.diffuseTexture = woodTexTureFrontBack;
  oakWoodFBMat.specularColor = BABYLON.Color3.Black()

  const OakwoodCutMat = new BABYLON.StandardMaterial("woodCutMat", scene);
  OakwoodCutMat.diffuseTexture = woodTextureUpDown;
  OakwoodCutMat.specularColor = BABYLON.Color3.Black()

  const multiMatForOakWood = new BABYLON.MultiMaterial(
    "multiMatForOakWood",
    scene
  );
  multiMatForOakWood.specularColor = BABYLON.Color3.Black()
  multiMatForOakWood.subMaterials.push(OakwoodMat); // index 0
  multiMatForOakWood.subMaterials.push(oakWoodFBMat); // index 2
  multiMatForOakWood.subMaterials.push(OakwoodCutMat); // index 1

  oakWoodBlock.material = multiMatForOakWood;

  const verticesCount = oakWoodBlock.getTotalVertices();
  oakWoodBlock.subMeshes = [];

  new BABYLON.SubMesh(0, 0, verticesCount, 0, 6, oakWoodBlock); // front
  new BABYLON.SubMesh(0, 0, verticesCount, 6, 6, oakWoodBlock); // back
  new BABYLON.SubMesh(1, 0, verticesCount, 12, 6, oakWoodBlock); // right
  new BABYLON.SubMesh(1, 0, verticesCount, 18, 6, oakWoodBlock); // left
  new BABYLON.SubMesh(2, 0, verticesCount, 24, 6, oakWoodBlock); // top
  new BABYLON.SubMesh(2, 0, verticesCount, 30, 6, oakWoodBlock); // bottom
  return oakWoodBlock
}