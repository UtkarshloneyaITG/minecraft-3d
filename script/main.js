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
    alpha,
    beta,
    radius,
    target,
    scene
  );
  camera.attachControl(canvas, true);

  // LIGHTS
  // const hemi = new BABYLON.HemisphericLight(
  //   "hemi",
  //   new BABYLON.Vector3(0, 1, 0),
  //   scene
  // );
  // hemi.intensity = 0.15;
  // hemi.specular = BABYLON.Color3.Black();
  const lantern = lanternMinecraft(scene, 7, 5, 7)
  // const dirLight = new BABYLON.PointLight(
  //   "dirLight",
  //   directionOffShadow,
  //   scene
  // );
  // dirLight.intensity = 1
  // dirLight.position = new BABYLON.Vector3(20, 40, 20);

  const shadowGen = new BABYLON.ShadowGenerator(1024, lantern.lanternLight);
  shadowGen.bias = 0.02;
  shadowGen.normalBias = 0.05;
  shadowGen.forceBackFacesOnly = true;
  shadowGen.usePoissonSampling = true;




  shadowGen.bias = 0.01;
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

  // const envTexture = new BABYLON.CubeTexture("assets/texture/nightSky.jpg", scene);
  // scene.createDefaultSkybox(envTexture, true, 1000);
  // console.log(envTexture)
  const dirtBlock = BABYLON.MeshBuilder.CreateBox("dirt", {}, scene);
  const oakWoodBlock = BABYLON.MeshBuilder.CreateBox("Oakwood", {}, scene);
  const cobalStoneBlock = BABYLON.MeshBuilder.CreateBox(
    "cobalStone",
    {},
    scene
  );
  // dirtBlock.disableLighting = true
  const oakPlankBlock = BABYLON.MeshBuilder.CreateBox("oakPlank", {}, scene);


  wheel.rotation.x = Math.PI / 2;

  // TEXTURES
  const grassTexture = new BABYLON.Texture(
    "assets/texture/grassBlockTop.png",
    scene
  );
  grassTexture.uScale = 100;
  grassTexture.vScale = 100;
  const dirtTexture = new BABYLON.Texture(
    "assets/texture/dirtBlock.jfif",
    scene
  );
  const coinTexture = new BABYLON.Texture(
    "assets/texture/oakPlank.webp",
    scene
  );
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
  const cobalStoneStareTexture = new BABYLON.Texture("assets/texture/cobalStone.jpg", scene)
  cobalStoneStareTexture.uScale = 1;
  cobalStoneStareTexture.vScale = 0.5;
  // MATERIALS
  const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
  groundMat.diffuseTexture = grassTexture
  groundMat.specularColor = BABYLON.Color3.Black();
  // groundMat.specularPower = 0;
  const wheelMat = new BABYLON.StandardMaterial("wheelMat", scene);
  wheelMat.diffuseTexture = coinTexture;
  wheelMat.specularColor = BABYLON.Color3.Black()

  const dirtMat = new BABYLON.StandardMaterial("dirtMat", scene);
  dirtMat.diffuseTexture = dirtTexture;
  dirtMat.specularColor = BABYLON.Color3.Black()

  const OakwoodMat = new BABYLON.StandardMaterial("woodMat", scene);
  OakwoodMat.diffuseTexture = woodTextureLeftRight;
  oakPlankBlock.specularColor = BABYLON.Color3.Black()

  const oakWoodFBMat = new BABYLON.StandardMaterial("woodMat", scene);
  oakWoodFBMat.diffuseTexture = woodTexTureFrontBack;
  oakWoodFBMat.specularColor = BABYLON.Color3.Black()

  const OakwoodCutMat = new BABYLON.StandardMaterial("woodCutMat", scene);
  OakwoodCutMat.diffuseTexture = woodTextureUpDown;
  OakwoodCutMat.specularColor = BABYLON.Color3.Black()

  const cobaltStoneMat = new BABYLON.StandardMaterial("cobaltStoneMat", scene);
  cobaltStoneMat.diffuseTexture = cobaltStoneTexture;
  cobaltStoneMat.specularColor = BABYLON.Color3.Black()

  const oakPlankMat = new BABYLON.StandardMaterial("oakPlankMat", scene);
  oakPlankMat.diffuseTexture = oakPlankTexture;
  oakPlankMat.specularColor = BABYLON.Color3.Black()

  const cobalStoneStairMat = new BABYLON.StandardMaterial("stairCObalMat", scene)
  cobalStoneStairMat.diffuseTexture = cobalStoneStareTexture
  cobalStoneStairMat.specularColor = BABYLON.Color3.Black()
  // MultiMaterial for Oakwood
  const multiMatForOakWood = new BABYLON.MultiMaterial(
    "multiMatForOakWood",
    scene
  );
  multiMatForOakWood.specularColor = BABYLON.Color3.Black()
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




  shadowGen.addShadowCaster(ground);
  ground.receiveShadows = true;

  //
  // const house = new BABYLON.TransformNode("parent");
  // POSITIONING
  const GroundCood = 0.5;
  wheel.position.set(15, 1, 0);
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
  /// helpers ======================================
  function fillBlock(x1, y1, z1, x2, y2, z2, block, rotatex = 0, rotatey = 0) {
    const xs = Math.min(x1, x2);
    const xe = Math.max(x1, x2);

    const ys = Math.min(y1, y2);
    const ye = Math.max(y1, y2);

    const zs = Math.min(z1, z2);
    const ze = Math.max(z1, z2);

    const dx = Math.floor(xe - xs) + 1;
    const dy = Math.floor(ye - ys) + 1;
    const dz = Math.floor(ze - zs) + 1;

    let id = 0;

    for (let i = 0; i < dx; i++) {
      for (let j = 0; j < dy; j++) {
        for (let k = 0; k < dz; k++) {
          const bx = xs + i;
          const by = ys + j;
          const bz = zs + k;

          const B = block.clone("block_" + id++);
          B.position.set(bx, by, bz);
          B.rotation.x = rotatex
          B.rotation.y = rotatey
          if (B instanceof BABYLON.Mesh) {
            shadowGen.addShadowCaster(B);
            B.receiveShadows = true;
          } else if (B instanceof BABYLON.TransformNode) {
            B.getChildMeshes().forEach(m => {

              shadowGen.addShadowCaster(m);
              m.receiveShadows = true;
            });
          }

        }
      }
    }
  }
  function createMinecraftStair(scene, cobalStoneStairMat, rotatex = 0, rotatey = 0) {
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

    if (stair instanceof BABYLON.TransformNode) {
      stair.getChildMeshes().forEach(m => {
        shadowGen.addShadowCaster(m);
        m.receiveShadows = true;
      });
    }
    return stair;
  }

  function createLeafBlock(scene) {
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
  function lanternMinecraft(scene, x, y, z) {
    const lantern = new BABYLON.TransformNode("lantern", scene);
    const lanternLight = new BABYLON.PointLight(
      "lanternLight",
      new BABYLON.Vector3(x, y, z),
      scene
    );
    scene.onBeforeRenderObservable.add(() => {
      lanternLight.intensity = 1 + Math.random() * 0.1;
    });
    const lampparticals = new BABYLON.ParticleSystem("lampparticle", 300, scene);

    lampparticals.particleTexture = new BABYLON.Texture(
      "assets/texture/flare.png",
      scene
    );

    lampparticals.emitter = lantern;

    lampparticals.minEmitBox = new BABYLON.Vector3(-0.1, 0.35, -0.1);
    lampparticals.maxEmitBox = new BABYLON.Vector3(0.1, 0.45, 0.1);

    // Colors (hot spark)
    lampparticals.color1 = new BABYLON.Color4(1, 0.9, 0.6, 1);
    lampparticals.color2 = new BABYLON.Color4(1, 0.6, 0.2, 1);
    lampparticals.colorDead = new BABYLON.Color4(1, 0.3, 0, 0);

    lampparticals.minSize = 0.05;
    lampparticals.maxSize = 0.15;

    lampparticals.minLifeTime = 0.15;
    lampparticals.maxLifeTime = 0.5;

    lampparticals.emitRate = 70;

    lampparticals.direction1 = new BABYLON.Vector3(-1, -1, -1);
    lampparticals.direction2 = new BABYLON.Vector3(1, -1, 1);

    lampparticals.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;
    lampparticals.gravity = new BABYLON.Vector3(0, -1.5, 0);

    lampparticals.start();
    const bottom = BABYLON.MeshBuilder.CreateBox("bottom", {
      width: 0.5,
      height: 0.6,
      depth: 0.5
    }, scene);
    const texturebottom = new BABYLON.Texture("assets/texture/lanternBottom.png", scene)
    const LanternBottomMat = new BABYLON.StandardMaterial("lanternBottomMat", scene)
    LanternBottomMat.diffuseTexture = texturebottom
    bottom.material = LanternBottomMat;
    bottom.parent = lantern;
    bottom.position.x = 0
    bottom.position.y = 0
    // Top half - block
    const middle = BABYLON.MeshBuilder.CreateBox("middle", {
      // width: 1,
      height: 0.2,
      width: 0.3,
      depth: 0.3
    }, scene);

    middle.material = LanternBottomMat;
    middle.position.y = 0.4;     // Lift half-block so its middle is flush at 1.0 height
    middle.position.z = 0;    // Push backwards to form the stair slope
    middle.parent = lantern;
    LanternBottomMat.emissiveColor = new BABYLON.Color3(0.9, 0.7, 0.4);
    lantern.position.set(x, y, z)
    return { lantern, lanternLight };
  }

  function campFire(scene, x, y, z) {
    const campFire = new BABYLON.TransformNode("campfire", scene)
    const campFireTexture = new BABYLON.Texture("assets/texture/oakWoodlogSide.jpg", scene)
    const campFireMat = new BABYLON.StandardMaterial("campFireMat", scene)
    campFireMat.diffuseTexture = campFireTexture
    campFireMat.specularColor = BABYLON.Color3.Black()
    const charCoolTexture = new BABYLON.Texture("assets/texture/charcoolTexture.png", scene)
    const charcoolMat = new BABYLON.StandardMaterial("charcoolTexture", scene)
    charcoolMat.specularColor = BABYLON.Color3.Black()
    charcoolMat.diffuseTexture = charCoolTexture

    // light and partical
    const campFireLight = new BABYLON.PointLight("campFireLight", new BABYLON.Vector3(x, y, z), scene)
    const firePartical = new BABYLON.ParticleSystem("fireParical", 2000, scene)
    firePartical.particleTexture = new BABYLON.Texture("assets/texture/campFire_fire_.png", scene)
    firePartical.emitter = campFire

    firePartical.minEmitBox = new BABYLON.Vector3(-0.3, -0.5, -0.3)
    firePartical.maxEmitBox = new BABYLON.Vector3(0.3, 1, 0.3)

    firePartical.color1 = new BABYLON.Color4(1, 0.9, 0.6, 1);
    firePartical.color2 = new BABYLON.Color4(1, 0.6, 0.2, 1);
    firePartical.colorDead = new BABYLON.Color4(1, 0.3, 0, 0);

    firePartical.minSize = 0.05;
    firePartical.maxSize = 0.15;

    firePartical.minLifeTime = 0.15;
    firePartical.maxLifeTime = 0.7;

    firePartical.emitRate = 1500;

    firePartical.direction1 = new BABYLON.Vector3(0, 1, 0);

    firePartical.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;
    firePartical.gravity = new BABYLON.Vector3(0, 1.5, 0);

    firePartical.start()
    const woodSize = {
      height: 0.25,
      depth: 0.25
    }
    const wood1 = BABYLON.MeshBuilder.CreateBox("wood1", { height: 0.25, depth: 0.25 }, scene)
    const wood2 = BABYLON.MeshBuilder.CreateBox("wood2", { height: 0.25, depth: 0.25 }, scene)
    const wood3 = BABYLON.MeshBuilder.CreateBox("wood3", { height: 0.25, depth: 0.25 }, scene)
    const wood4 = BABYLON.MeshBuilder.CreateBox("wood4", { height: 0.25, depth: 0.25 }, scene)
    const charcool = BABYLON.MeshBuilder.CreateBox("charcool", { depth: 0.35, height: 0.10 }, scene)

    wood1.position.set(0, -0.38, -0.30)
    wood2.position.set(0, -0.38, 0.30)


    wood3.position.set(0.30, -0.13, 0)
    wood3.rotation.y = Math.PI / 2
    wood4.position.set(-0.30, -0.13, 0)
    wood4.rotation.y = Math.PI / 2

    charcool.position.set(0, -0.45, 0)

    wood1.parent = campFire
    wood2.parent = campFire
    wood3.parent = campFire
    wood4.parent = campFire
    charcool.parent = campFire
    campFire.position.set(x, y, z)

    wood1.material = campFireMat
    wood2.material = campFireMat
    wood3.material = campFireMat
    wood4.material = campFireMat
    charcool.material = charcoolMat


  }
  function createTree(x, y, z, wood, leaf) {
    fillBlock(x, y, z, x, y + 4, z, wood)
    fillBlock(x - 3, y + 5, z - 2, x + 3, y + 6, z + 2, leaf)
    fillBlock(x - 2, y + 5, z - 3, x + 2, y + 6, z - 3, leaf)
    fillBlock(x - 2, y + 5, z + 3, x + 2, y + 6, z + 3, leaf)

    fillBlock(x - 2, y + 7, z - 1, x + 2, y + 8, z + 1, leaf)
    fillBlock(x - 1, y + 7, z - 2, x + 1, y + 8, z - 2, leaf)
    fillBlock(x - 1, y + 7, z + 2, x + 1, y + 8, z + 2, leaf)

    fillBlock(x - 1, y + 9, z - 1, x + 1, y + 9, z + 1, leaf)
  }
  function createGrassBlock(scene, x, y, z) {
    const grassBlock = BABYLON.MeshBuilder.CreateBox("grassBlock", {}, scene)
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

    grassBlock.SubMesh = []


    grassBlock.position.set(x, y, z)
  }
  const dirtBlock1 = createGrassBlock(scene, 6, GroundCood, 6)
  const leafBlock = createLeafBlock(scene)
  createTree(14, GroundCood, 17, oakWoodBlock, leafBlock)
  createTree(10, GroundCood, 10, oakWoodBlock, leafBlock)
  createTree(15, GroundCood, 26, oakWoodBlock, leafBlock)
  createTree(20, GroundCood, 10, oakWoodBlock, leafBlock)
  createTree(30, GroundCood, 18, oakWoodBlock, leafBlock)
  createTree(-10, GroundCood, 0, oakWoodBlock, leafBlock)
  const campFire1 = campFire(scene, 10, GroundCood, 3)
  dirtBlock.position.set(9, GroundCood, 3);



  // function createMinecraftDoor(scene) {
  //   const door = BABYLON.MeshBuilder.CreateBox("door", { height: 2, width: 0.25 }, scene)
  //   const texture = new BABYLON.Texture("assets/texture/door.jpg", scene)
  //   const doorMat = new BABYLON.StandardMaterial("doorMat", scene)
  //   doorMat.diffuseTexture = texture
  //   doorMat.diffuseTexture.wAng = Math.PI / 2
  //   door.material = doorMat
  //   return door
  // }



  // const door = createMinecraftDoor(scene)
  // door.position.set(3.38, GroundCood * 2 + 1, 2)



  // =========================================


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




  fillBlock()

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (x + 1 == 1 || x + 1 == 2) {
        if (y + 1 == 2) continue;
      }
      const cloneOakPlankFront = oakPlankBlock.clone(x + "oakPlank1" + y);
      cloneOakPlankFront.position.set(3, x + 1 + GroundCood, y + 1);
    }
  }

  const stair = createMinecraftStair(scene, cobalStoneStairMat, Math.PI / 2, Math.PI / 2);
  stair.position.set(4, GroundCood, 2);
  // roof
  const woodenstaier = createMinecraftStair(scene, oakPlankMat)

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


  scene.meshes.forEach(mesh => {
    shadowGen.addShadowCaster(mesh);
    mesh.receiveShadows = true;
  });

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
