const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3.Black();

  const alpha = Math.PI / 4;
  const beta = Math.PI / 3;
  const radius = 8;
  const target = new BABYLON.Vector3(3, 1, 1);

  const camera = new BABYLON.ArcRotateCamera(
    "Camera",
    alpha,
    beta,
    radius,
    target,
    scene
  );
  camera.attachControl(canvas, true);

  // LIGHTS
  const hemi = new BABYLON.HemisphericLight(
    "hemi",
    new BABYLON.Vector3(1, 1, 0),
    scene
  );
  const dirLight = new BABYLON.DirectionalLight(
    "dirLight",
    new BABYLON.Vector3(-1, -2, -1),
    scene
  );
  dirLight.position = new BABYLON.Vector3(20, 40, 20);

  const shadowGen = new BABYLON.ShadowGenerator(2048, dirLight);
  shadowGen.useExponentialShadowMap = true;

  // MESHES
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
  const oakWoodBlock = BABYLON.MeshBuilder.CreateBox("Oakwood", {}, scene);
  const cobalStoneBlock = BABYLON.MeshBuilder.CreateBox(
    "cobalStone",
    {},
    scene
  );
  const oakPlankBlock = BABYLON.MeshBuilder.CreateBox("oakPlank", {}, scene);

  wheel.rotation.x = Math.PI / 2;

  // TEXTURES
  const grassTexture = new BABYLON.Texture(
    "assets/texture/grassBlockTop.jpg",
    scene
  );
  grassTexture.uScale = 100;
  grassTexture.vScale = 100;
  const dirtTexture = new BABYLON.Texture(
    "assets/texture/dirtBlock.jfif",
    scene
  );
  const coinTexture = new BABYLON.Texture("textures/images.jpg", scene);
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
  const cobaltStoneTexture = new BABYLON.Texture(
    "assets/texture/cobalStone.jpg",
    scene
  );
  const oakPlankTexture = new BABYLON.Texture(
    "assets/texture/oakPlank.webp",
    scene
  );
  // MATERIALS
  const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
  groundMat.diffuseTexture = grassTexture;

  const wheelMat = new BABYLON.StandardMaterial("wheelMat", scene);
  wheelMat.diffuseTexture = coinTexture;

  const dirtMat = new BABYLON.StandardMaterial("dirtMat", scene);
  dirtMat.diffuseTexture = dirtTexture;

  const OakwoodMat = new BABYLON.StandardMaterial("woodMat", scene);
  OakwoodMat.diffuseTexture = woodTextureLeftRight;

  const oakWoodFBMat = new BABYLON.StandardMaterial("woodMat", scene);
  oakWoodFBMat.diffuseTexture = woodTexTureFrontBack;

  const OakwoodCutMat = new BABYLON.StandardMaterial("woodCutMat", scene);
  OakwoodCutMat.diffuseTexture = woodTextureUpDown;

  const cobaltStoneMat = new BABYLON.StandardMaterial("cobaltStoneMat", scene);
  cobaltStoneMat.diffuseTexture = cobaltStoneTexture;

  const oakPlankMat = new BABYLON.StandardMaterial("oakPlankMat", scene);
  oakPlankMat.diffuseTexture = oakPlankTexture;
  // MultiMaterial for Oakwood
  const multiMatForOakWood = new BABYLON.MultiMaterial(
    "multiMatForOakWood",
    scene
  );
  multiMatForOakWood.subMaterials.push(OakwoodMat); // index 0
  multiMatForOakWood.subMaterials.push(oakWoodFBMat); // index 2
  multiMatForOakWood.subMaterials.push(OakwoodCutMat); // index 1

  // ASSIGN MATERIALS
  ground.material = groundMat;
  wheel.material = wheelMat;
  dirtBlock.material = dirtMat;
  oakWoodBlock.material = multiMatForOakWood;
  cobalStoneBlock.material = cobaltStoneMat;
  oakPlankBlock.material = oakPlankMat;
  // SHADOWS
  shadowGen.addShadowCaster(wheel);
  shadowGen.addShadowCaster(dirtBlock);
  ground.receiveShadows = true;

  //
  const house = new BABYLON.TransformNode("parent");
  // POSITIONING
  const GroundCood = 0.5;
  wheel.position.set(15, 1, 0);
  dirtBlock.position.set(5, GroundCood, 5);
  oakWoodBlock.position.set(-2, GroundCood, 2);
  cobalStoneBlock.position.set(-2, GroundCood, -2);
  oakPlankBlock.position.set(-3, GroundCood, 2);
  // SUBMESHES: assign material indices
  const verticesCount = oakWoodBlock.getTotalVertices();
  oakWoodBlock.subMeshes = [];

  new BABYLON.SubMesh(0, 0, verticesCount, 0, 6, oakWoodBlock); // front
  new BABYLON.SubMesh(0, 0, verticesCount, 6, 6, oakWoodBlock); // back
  new BABYLON.SubMesh(1, 0, verticesCount, 12, 6, oakWoodBlock); // right
  new BABYLON.SubMesh(1, 0, verticesCount, 18, 6, oakWoodBlock); // left
  new BABYLON.SubMesh(2, 0, verticesCount, 24, 6, oakWoodBlock); // top
  new BABYLON.SubMesh(2, 0, verticesCount, 30, 6, oakWoodBlock); // bottom

  // piller
  for (let i = 0; i < 5; i++) {
    const cloneOakWood1 = oakWoodBlock.clone("oakWood1" + i);
    cloneOakWood1.position.set(3, i + GroundCood, 0);
    const cloneOakWood2 = oakWoodBlock.clone("oakWood2" + i);
    cloneOakWood2.position.set(3, i + GroundCood, 4);
    const cloneOakWood3 = oakWoodBlock.clone("oakWood3" + i);
    cloneOakWood3.position.set(0, i + GroundCood, 4);
    const cloneOakWood4 = oakWoodBlock.clone("oakWood4" + i);
    cloneOakWood4.position.set(0, i + GroundCood, 0);
    shadowGen.addShadowCaster(cloneOakWood1);
    shadowGen.addShadowCaster(cloneOakWood2);
    shadowGen.addShadowCaster(cloneOakWood3);
    shadowGen.addShadowCaster(cloneOakWood4);
    if (i < 2) {
      const cloneOakWood1 = oakWoodBlock.clone("oakWood5" + i);
      cloneOakWood1.rotation = new BABYLON.Vector3(
        BABYLON.Tools.ToRadians(90), // rotate X
        BABYLON.Tools.ToRadians(90), // rotate Y
        BABYLON.Tools.ToRadians(0) // rotate Z
      );
      cloneOakWood1.position.set(i + 1, 5 - GroundCood, 0);

      const cloneOakWood2 = oakWoodBlock.clone("oakWood6" + i);
      cloneOakWood2.rotation = new BABYLON.Vector3(
        BABYLON.Tools.ToRadians(90), // rotate X
        BABYLON.Tools.ToRadians(90), // rotate Y
        BABYLON.Tools.ToRadians(0) // rotate Z
      );
      cloneOakWood2.position.set(i + 1, 5 - GroundCood, 4);

      // cobalStone blocks
      const cobalStoneBlock1 = cobalStoneBlock.clone("cobalStone7" + i);
      cobalStoneBlock1.position.set(i + 1, GroundCood, 0);
      const cobalStoneBlock2 = cobalStoneBlock.clone("cobalStone8" + i);
      cobalStoneBlock2.position.set(i + 1, GroundCood, 4);

      //shadow

      shadowGen.addShadowCaster(cloneOakWood1);
      shadowGen.addShadowCaster(cloneOakWood2);
      shadowGen.addShadowCaster(cobalStoneBlock1);
      shadowGen.addShadowCaster(cobalStoneBlock2);
    }
    if (i < 3) {
      const cloneOakWood3 = oakWoodBlock.clone("oakWood9" + i);
      cloneOakWood3.rotation = new BABYLON.Vector3(
        BABYLON.Tools.ToRadians(90), // rotate X
        BABYLON.Tools.ToRadians(0), // rotate Y
        BABYLON.Tools.ToRadians(0) // rotate Z
      );
      cloneOakWood3.position.set(0, 5 - GroundCood, i + 1);
      const cloneOakWood4 = oakWoodBlock.clone("oakWood0" + i);
      cloneOakWood4.rotation = new BABYLON.Vector3(
        BABYLON.Tools.ToRadians(90), // rotate X
        BABYLON.Tools.ToRadians(0), // rotate Y
        BABYLON.Tools.ToRadians(0) // rotate Z
      );
      cloneOakWood4.position.set(3, 5 - GroundCood, i + 1);

      // cobalStone blocks

      const cobalStoneBlock3 = cobalStoneBlock.clone("cobalStone12" + i);
      cobalStoneBlock3.position.set(0, GroundCood, i + 1);
      const cobalStoneBlock4 = cobalStoneBlock.clone("cobalStone13" + i);
      cobalStoneBlock4.position.set(3, GroundCood, i + 1);

      //shadow

      shadowGen.addShadowCaster(cloneOakWood3);
      shadowGen.addShadowCaster(cloneOakWood4);
      shadowGen.addShadowCaster(cobalStoneBlock3);
      shadowGen.addShadowCaster(cobalStoneBlock4);
    }
  }

  // wall

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (y < 2) {
        const cloneOakPlankleft = oakPlankBlock.clone(x + "oakPlank" + y);
        cloneOakPlankleft.position.set(y + 1, x + 1 + GroundCood, 0);
        const cloneOakPlankright = oakPlankBlock.clone(x + "oakPlank" + y);
        cloneOakPlankright.position.set(y + 1, x + 1 + GroundCood, 4);

        // floor
        const cobalStoneFloor = cobalStoneBlock.clone(x + "cobalStone" + y);
        cobalStoneFloor.position.set(y +1, GroundCood, x +1);
      }
      const cloneOakPlankback = oakPlankBlock.clone(x + "oakPlank1" + y);
      cloneOakPlankback.position.set(0, x + 1 + GroundCood, y + 1);
            if(x+1 == 1 || x+1 == 2){ if( y+ 1 == 2 ) continue}
      const cloneOakPlankFront = oakPlankBlock.clone(x + "oakPlank1" + y);
      cloneOakPlankFront.position.set(3, x + 1 + GroundCood, y + 1);
    }
  }

  return scene;
};

const scene = createScene();
engine.runRenderLoop(() => scene.render());
