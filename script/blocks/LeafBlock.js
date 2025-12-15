export function createLeafBlock(scene) {
  const leafBlock = BABYLON.MeshBuilder.CreateBox("leaf", {}, scene)
  const texture = new BABYLON.Texture("assets/texture/output-onlinepngtools.png", scene)
  const leafMat = new BABYLON.StandardMaterial("leafMat", scene)
  leafMat.diffuseTexture = texture
  leafMat.diffuseTexture.hasAlpha = true;
  leafMat.useAlphaFromDiffuseTexture = true;
  leafMat.specularColor = new BABYLON.Color3(0, 0, 0)
  // doorMat.diffuseTexture.wAng = Math.PI / 2
  leafBlock.material = leafMat
  return leafBlock
}