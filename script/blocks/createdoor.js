export function createDoor(scene, x, y, z, rotate = 0) {

  // 🔹 Door anchor
  const faceUV = [
    new BABYLON.Vector4(0, 1, 1, 0), // front
    new BABYLON.Vector4(0, 0, 1, 1), // back
    new BABYLON.Vector4(0, 0, 1, 1), // right
    new BABYLON.Vector4(0, 0, 1, 1), // left
    new BABYLON.Vector4(0, 0, 1, 1), // top
    new BABYLON.Vector4(0, 0, 1, 1)  // bottom
  ]
  const DoorMain = new BABYLON.TransformNode("DoorMain", scene);
  DoorMain.position.set(x, y + 1.5, z);   // correct door height
  DoorMain.rotation.y = rotate;

  // 🔹 Door mesh
  const Door = BABYLON.MeshBuilder.CreateBox(
    "Door",
    { width: 1, height: 2, depth: 0.25, faceUV: faceUV },
    scene
  );

  Door.parent = DoorMain;

  // 🔹 Move door so hinge sits on block edge
  Door.position.z = -0.37;
  Door.position.y = -1;

  // 🔹 Set hinge pivot (left edge)
  Door.setPivotPoint(
    new BABYLON.Vector3(-0.5, 0, 0),
    BABYLON.Space.LOCAL
  );

  // 🔹 Textures
  const DoorTexture = new BABYLON.Texture("assets/texture/OakDoor.png", scene);
  const DoorSideTexture = new BABYLON.Texture("assets/texture/trapDoorSide.png", scene);
  DoorSideTexture.uScale = 2;

  const DoorSideMat = new BABYLON.StandardMaterial("DoorSideMat", scene);
  DoorSideMat.diffuseTexture = DoorSideTexture;
  DoorSideMat.specularColor = BABYLON.Color3.Black();

  const DoorMat = new BABYLON.StandardMaterial("DoorMat", scene);
  DoorMat.diffuseTexture = DoorTexture;
  DoorMat.diffuseTexture.hasAlpha = true;
  DoorMat.useAlphaFromDiffuseTexture = true;
  DoorMat.specularColor = BABYLON.Color3.Black();

  const multiMatForDoor = new BABYLON.MultiMaterial("DoorMultiMat", scene);
  multiMatForDoor.subMaterials.push(DoorSideMat);
  multiMatForDoor.subMaterials.push(DoorMat);

  // 🔹 Apply material to MESH (not TransformNode)
  Door.material = multiMatForDoor;

  // 🔹 Correct subMeshes on Door mesh
  const verticesCount = Door.getTotalVertices();
  Door.subMeshes = [];

  new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, Door);
  new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, Door);
  new BABYLON.SubMesh(0, 0, verticesCount, 12, 6, Door);
  new BABYLON.SubMesh(0, 0, verticesCount, 18, 6, Door);
  new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, Door);
  new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, Door);



  return DoorMain;
}
