export function createGrassBlock(scene, x, y, z) {
  const faceUV = [
    new BABYLON.Vector4(0, 0, 1, 1), // front
    new BABYLON.Vector4(0, 0, 1, 1), // back
    new BABYLON.Vector4(0, 0, 1, 1), // right
    new BABYLON.Vector4(0, 0, 1, 1), // left
    new BABYLON.Vector4(0, 0, 1, 1), // top
    new BABYLON.Vector4(0, 0, 1, 1)  // bottom
  ]
  const grassBlock = BABYLON.MeshBuilder.CreateBox("grassBlock", { faceUV: faceUV, wrap: true }, scene)
  const grassBlockSideTexture = new BABYLON.Texture("assets/texture/grassBlockSide.jpg", scene)
  const grassBlockTopTexture = new BABYLON.Texture("assets/texture/grassBlockTop.png", scene)
  const grassBlockBottomTexture = new BABYLON.Texture("assets/texture/dirtBlock.jfif", scene)

  const grassTopMat = new BABYLON.StandardMaterial("grassTopMat", scene)
  grassTopMat.diffuseTexture = grassBlockTopTexture
  grassTopMat.specularColor = BABYLON.Color3.Black()

  const grassBlockSideMat = new BABYLON.StandardMaterial("grassBlocksideMat", scene)
  grassBlockSideMat.diffuseTexture = grassBlockSideTexture
  grassBlockSideMat.specularColor = BABYLON.Color3.Black()

  const grassBlockBottomMat = new BABYLON.StandardMaterial("grassBlockBottomMat", scene)
  grassBlockBottomMat.diffuseTexture = grassBlockBottomTexture
  grassBlockBottomMat.specularColor = BABYLON.Color3.Black()

  const multiMatForGrassBlock = new BABYLON.MultiMaterial("gassBlockFull", scene)

  multiMatForGrassBlock.subMaterials.push(grassBlockSideMat)
  multiMatForGrassBlock.subMaterials.push(grassTopMat)
  multiMatForGrassBlock.subMaterials.push(grassBlockBottomMat)

  grassBlock.material = multiMatForGrassBlock

  const verticesCount = grassBlock.getTotalVertices();
  grassBlock.subMeshes = [];

  new BABYLON.SubMesh(0, 0, verticesCount, 0, 6, grassBlock)
  new BABYLON.SubMesh(0, 0, verticesCount, 6, 6, grassBlock)
  new BABYLON.SubMesh(0, 0, verticesCount, 12, 6, grassBlock)
  new BABYLON.SubMesh(0, 0, verticesCount, 18, 6, grassBlock)
  new BABYLON.SubMesh(1, 0, verticesCount, 24, 6, grassBlock)
  new BABYLON.SubMesh(2, 0, verticesCount, 30, 6, grassBlock)

  grassBlock.position.set(x, y, z)
}