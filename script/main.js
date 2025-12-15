import { fillBlock } from "./utils/FillBlock.js";
import { createTree } from "./utils/CreateTree.js";
import { lanternMinecraft } from "./entities/Lantern.js";
import { createLeafBlock } from "./blocks/LeafBlock.js";
import { createMinecraftStairs } from "./blocks/StairBlock.js";
import { campFire } from "./entities/CampFire.js";
import { createGrassBlock } from "./blocks/GrassBlock.js";
import { createOakLog } from "./blocks/createOakLog.js";
import { BasicMateriall } from "./materials/BasicMateriall.js";
import { createTrapDoor } from "./blocks/trapDoor.js";
import { createMinecraftFlower } from "./blocks/flower.js";
import { createDoor } from "./blocks/createdoor.js";
// import { createTorch } from "./blocks/createTorch.js";s
const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3.Black();

  const alpha = Math.PI / 4;
  const beta = Math.PI / 3;
  const radius = 8;
  const target = new BABYLON.Vector3(9, 1, 3);

  const camera = new BABYLON.ArcRotateCamera(
    "Camera",
    Math.PI / 4,
    Math.PI / 3,
    8,
    BABYLON.Vector3.Zero(),
    scene
  );

  camera.attachControl(canvas, true);

  // ---------- FRAMING ----------
  camera.useFramingBehavior = true;
  const framing = camera.framingBehavior;

  framing.mode = BABYLON.FramingBehavior.FitFrustumSidesMode;
  framing.radiusScale = 1.3;
  framing.positionScale = 0.5;
  framing.defaultElevation = 0.25;
  framing.elevationReturnTime = 1500;
  framing.elevationReturnWaitTime = 1000;
  framing.zoomStopsAnimation = true;
  framing.framingTime = 1200;

  // ---------- AUTO ROTATION ----------
  camera.useAutoRotationBehavior = true;
  camera.autoRotationBehavior.idleRotationSpinupTime = 2000;
  camera.autoRotationBehavior.idleRotationWaitTime = 2000;
  camera.autoRotationBehavior.rotationSpeed = 0.03;

  // ---------- AFTER MESH CREATION ----------
  const lantern = lanternMinecraft(scene, 7, 5, 7);

  const targetMesh = lantern.mesh;

  camera.useFramingBehavior = true;
  camera.setTarget(targetMesh);
  camera.framingBehavior.zoomOnMesh(targetMesh);

  const ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { height: 100, width: 100 },
    scene
  );
  const wheel = BABYLON.MeshBuilder.CreateCylinder(
    "wheel",
    { height: 0.3, diameter: 2, tessellation: 50 },
    scene
  );


  const dirtBlock = BABYLON.MeshBuilder.CreateBox("dirt", {}, scene);
  const cobalStoneBlock = BABYLON.MeshBuilder.CreateBox(
    "cobalStone",
    {},
    scene
  );

  const oakPlankBlock = BABYLON.MeshBuilder.CreateBox("oakPlank", {}, scene);


  wheel.rotation.x = Math.PI / 2;

  const { groundMat, oakPlankMat, cobaltStoneMat, dirtMat, cobalStoneStairMat } = BasicMateriall()
  ground.material = groundMat;
  dirtBlock.material = dirtMat;

  cobalStoneBlock.material = cobaltStoneMat;
  oakPlankBlock.material = oakPlankMat;


  const oakWoodBlock = createOakLog(scene)

  const GroundCood = 0.5;
  wheel.position.set(15, 1, 0);

  cobalStoneBlock.position.set(-2, GroundCood, -2);
  oakPlankBlock.position.set(-3, GroundCood, 2);
  // SUBMESHES: assign material indices

  function createTorch(scene, x, y, z) {
    const faceUV = [
      new BABYLON.Vector4(0, 1, 1, 0), // front
      new BABYLON.Vector4(0, 0, 1, 1), // back
      new BABYLON.Vector4(0, 0, 1, 1), // right (INTENTIONALLY horizontal)
      new BABYLON.Vector4(0, 0, 1, 1), // left  (INTENTIONALLY horizontal)
      new BABYLON.Vector4(0, 0, 1, 1), // top
      new BABYLON.Vector4(1, 1, 1, 1)  // bottom
    ];


    const Torch = BABYLON.MeshBuilder.CreateBox("torch", { width: 0.15, depth: 0.15, height: 0.70, faceUV: faceUV }, scene)
    const torchLght = new BABYLON.PointLight("torchLight", new BABYLON.Vector3(x, y, z), scene)
    const torchTextureside = new BABYLON.Texture("assets/texture/minecraftTorch.jpg", scene)
    const torchsideMat = new BABYLON.StandardMaterial("torchSideMat", scene)
    torchsideMat.emissiveColor = new BABYLON.Color3(0.9, 0.7, 0.4);
    torchsideMat.diffuseTexture = torchTextureside
    torchsideMat.specularColor = BABYLON.Color3.Black()
    const torchSideTexture2 = new BABYLON.Texture("assets/texture/minecraftTorch - Copy.jpg", scene)
    const torchSideMat2 = new BABYLON.StandardMaterial("TorchSide2Mat", scene)
    torchSideMat2.diffuseTexture = torchSideTexture2
    torchSideMat2.emissiveColor = new BABYLON.Color3(0.9, 0.7, 0.4);
    torchSideMat2.specularColor = BABYLON.Color3.Black()

    const torchTopTexture = new BABYLON.Texture("assets/texture/minecraftTorchTop.jpg")
    const torchTopMat = new BABYLON.StandardMaterial("torchTopmat", scene)
    torchTopMat.diffuseTexture = torchTopTexture
    torchTopMat.emissiveColor = new BABYLON.Color3(0.9, 0.7, 0.4);
    torchTopMat.specularColor = BABYLON.Color3.Black()

    const multiTorchMaterial = new BABYLON.MultiMaterial("multiMaterialForTorch", scene)
    multiTorchMaterial.subMaterials.push(torchsideMat)
    multiTorchMaterial.subMaterials.push(torchTopMat)
    multiTorchMaterial.subMaterials.push(torchSideMat2)


    Torch.material = multiTorchMaterial

    const verticesCount = Torch.getTotalVertices();
    Torch.subMeshes = [];

    new BABYLON.SubMesh(0, 0, verticesCount, 0, 6, Torch)
    new BABYLON.SubMesh(0, 0, verticesCount, 6, 6, Torch)
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, Torch)
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, Torch)
    new BABYLON.SubMesh(1, 0, verticesCount, 24, 6, Torch)
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, Torch)
    Torch.position.set(x, y, z)
    Torch.rotation.x = Math.PI / 5
    Torch.rotation.y = Math.PI / 2
  }
  const torch1 = createTorch(scene, 3.7, GroundCood + 3, 2)

  const trapDoor1 = createTrapDoor(scene, 5, GroundCood, 3, 0, Math.PI / 2)
  const trapDoor2 = createTrapDoor(scene, 4, GroundCood, 4)
  const trapDoor3 = createTrapDoor(scene, 4, GroundCood, 0, 0, 180 * (Math.PI / 180))
  const trapDoor4 = createTrapDoor(scene, 5, GroundCood, 1, 0, Math.PI / 2)

  const oakDoor = createDoor(scene, 3, GroundCood + 1, 2, -Math.PI / 2)

  const flower1 = createMinecraftFlower(scene, "assets/texture/popyflower.png")
  flower1.position.set(4, GroundCood + 1, 1)

  const flower2 = createMinecraftFlower(scene, "assets/texture/popyflower.png")
  flower2.position.set(4, GroundCood + 1, 3)

  const dirtBlock1 = createGrassBlock(scene, 4, GroundCood, 3)
  const dirtBlock2 = createGrassBlock(scene, 4, GroundCood, 1)
  const leafBlock = createLeafBlock(scene)
  createTree(14, GroundCood, 17, oakWoodBlock, leafBlock)
  createTree(10, GroundCood, 10, oakWoodBlock, leafBlock)
  createTree(15, GroundCood, 26, oakWoodBlock, leafBlock)
  createTree(20, GroundCood, 10, oakWoodBlock, leafBlock)
  createTree(30, GroundCood, 18, oakWoodBlock, leafBlock)
  createTree(-10, GroundCood, 0, oakWoodBlock, leafBlock)
  const campFire1 = campFire(scene, 10, GroundCood, 3)
  dirtBlock.position.set(9, GroundCood, 3);



  // pileres
  fillBlock(3, 0.5, 0, 3, 4.5, 0, oakWoodBlock);
  fillBlock(0, 0.5, 0, 0, 4.5, 0, oakWoodBlock);
  fillBlock(0, 0.5, 4, 0, 4.5, 4, oakWoodBlock);
  fillBlock(3, 0.5, 4, 3, 4.5, 4, oakWoodBlock);

  fillBlock(1, GroundCood + 4, 0, 2, GroundCood + 4, 0, oakWoodBlock, Math.PI / 2, Math.PI / 2);
  fillBlock(1, GroundCood + 4, 4, 2, GroundCood + 4, 4, oakWoodBlock, Math.PI / 2, Math.PI / 2);
  fillBlock(0, GroundCood + 4, 1, 0, GroundCood + 4, 3, oakWoodBlock, Math.PI / 2);
  fillBlock(3, GroundCood + 4, 1, 3, GroundCood + 4, 3, oakWoodBlock, Math.PI / 2);

  // cobalstone boundry
  fillBlock(1, GroundCood, 0, 2, GroundCood, 0, cobalStoneBlock, Math.PI / 2);
  fillBlock(1, GroundCood, 4, 2, GroundCood, 4, cobalStoneBlock, Math.PI / 2);
  fillBlock(0, GroundCood, 1, 0, GroundCood, 3, cobalStoneBlock, Math.PI / 2);
  fillBlock(3, GroundCood, 1, 3, GroundCood, 3, cobalStoneBlock, Math.PI / 2);


  // wall 

  fillBlock(1, GroundCood + 1, 0, 3, GroundCood + 3, 0, oakPlankBlock)
  fillBlock(1, GroundCood + 1, 4, 3, GroundCood + 3, 4, oakPlankBlock)
  fillBlock(0, GroundCood + 1, 1, 0, GroundCood + 3, 4, oakPlankBlock)
  fillBlock(3, GroundCood + 1, 0, 3, GroundCood + 3, 0, oakPlankBlock)


  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (x + 1 == 1 || x + 1 == 2) {
        if (y + 1 == 2) continue;
      }
      const cloneOakPlankFront = oakPlankBlock.clone(x + "oakPlank1" + y);
      cloneOakPlankFront.position.set(3, x + 1 + GroundCood, y + 1);
    }
  }

  const stair = createMinecraftStairs(scene, cobalStoneStairMat, Math.PI / 2, Math.PI / 2);
  stair.position.set(4, GroundCood, 2);
  // roof
  const woodenstaier = createMinecraftStairs(scene, oakPlankMat)

  fillBlock(4, GroundCood + 4, 5, -1, GroundCood + 4, 5, woodenstaier, Math.PI / 2);
  fillBlock(4, (GroundCood + 5), 4, -1, GroundCood + 5, 4, woodenstaier, Math.PI / 2);
  fillBlock(4, GroundCood + 6, 3, -1, GroundCood + 6, 3, woodenstaier, Math.PI / 2);

  fillBlock(4, GroundCood + 4, -1, -1, GroundCood + 4, -1, woodenstaier,);
  fillBlock(4, (GroundCood + 5), 0, -1, GroundCood + 5, 0, woodenstaier,);
  fillBlock(4, GroundCood + 6, 1, -1, GroundCood + 6, 1, woodenstaier);

  fillBlock(4, GroundCood + 6, 2, -1, GroundCood + 6, 2, oakPlankBlock)

  // roof front
  fillBlock(4, GroundCood + 5, 3, 4, GroundCood + 5, 3, woodenstaier, Math.PI, Math.PI);
  fillBlock(4, GroundCood + 4, 4, 4, GroundCood + 4, 4, woodenstaier, Math.PI, Math.PI);

  fillBlock(4, GroundCood + 5, 1, 4, GroundCood + 5, 1, woodenstaier, Math.PI);
  fillBlock(4, GroundCood + 4, 0, 4, GroundCood + 4, 0, woodenstaier, Math.PI);
  // roof back
  fillBlock(-1, GroundCood + 5, 3, -1, GroundCood + 5, 3, woodenstaier, Math.PI, Math.PI);
  fillBlock(-1, GroundCood + 4, 4, -1, GroundCood + 4, 4, woodenstaier, Math.PI, Math.PI);

  fillBlock(-1, GroundCood + 5, 1, -1, GroundCood + 5, 1, woodenstaier, Math.PI);
  fillBlock(-1, GroundCood + 4, 0, -1, GroundCood + 4, 0, woodenstaier, Math.PI);

  fillBlock(0, GroundCood + 5, 1, 0, GroundCood + 5, 3, oakPlankBlock)
  fillBlock(3, GroundCood + 5, 1, 3, GroundCood + 5, 3, oakPlankBlock)

  // floor
  fillBlock(1, GroundCood, 1, 2, GroundCood, 3, cobalStoneBlock)

  woodenstaier.dispose()
  cobalStoneBlock.dispose()
  oakPlankBlock.dispose()
  oakWoodBlock.dispose()
  dirtBlock.dispose()
  leafBlock.dispose()

  return scene;
};

const scene = createScene();
engine.runRenderLoop(() => scene.render());
