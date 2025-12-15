export function createTrapDoor(scene, x, y, z, rotatex = 0, rotatey = 0) {

  // 🔹 Hinge (this is the anchor)
  const hinge = new BABYLON.TransformNode("trapDoorHinge", scene);
  hinge.position.set(x, y + 0.5, z); // top of block
  hinge.rotation.y = rotatey;

  // 🔹 Trapdoor mesh
  const trapDoor = BABYLON.MeshBuilder.CreateBox(
    "trapDoor",
    { width: 1, height: 1, depth: 0.25 },
    scene
  );

  trapDoor.parent = hinge;

  // 🔹 Move mesh so its edge sits on hinge
  trapDoor.position.z = -0.37;   // half depth
  trapDoor.position.y = -0.5;    // sit flat on block

  // 🔹 Materials (UNCHANGED)
  const trapDoorTexture = new BABYLON.Texture("assets/texture/trapDoor.png", scene);
  const trapDoorSideTexture = new BABYLON.Texture("assets/texture/trapDoorSide.png", scene);
  trapDoorSideTexture.uScale = 2;

  const trapDoorSideMat = new BABYLON.StandardMaterial("trapDoorSideMat", scene);
  trapDoorSideMat.diffuseTexture = trapDoorSideTexture;
  trapDoorSideMat.specularColor = BABYLON.Color3.Black();

  const trapDoorMat = new BABYLON.StandardMaterial("trapDoorMat", scene);
  trapDoorMat.diffuseTexture = trapDoorTexture;
  trapDoorMat.specularColor = BABYLON.Color3.Black();
  trapDoorMat.diffuseTexture.hasAlpha = true;

  const multiMatFortrapDoor = new BABYLON.MultiMaterial("trapDoorMultiMat", scene);
  multiMatFortrapDoor.subMaterials.push(trapDoorSideMat);
  multiMatFortrapDoor.subMaterials.push(trapDoorMat);

  trapDoor.material = multiMatFortrapDoor;

  // 🔹 SubMeshes (UNCHANGED)
  const verticesCount = trapDoor.getTotalVertices();
  trapDoor.subMeshes = [];

  new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, trapDoor);
  new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, trapDoor);
  new BABYLON.SubMesh(0, 0, verticesCount, 12, 6, trapDoor);
  new BABYLON.SubMesh(0, 0, verticesCount, 18, 6, trapDoor);
  new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, trapDoor);
  new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, trapDoor);

  // 🔹 Apply opening rotation on hinge
  hinge.rotation.x = rotatex;

  return hinge;
}
