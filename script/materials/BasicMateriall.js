export function BasicMateriall(scene) {
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


  const cobaltStoneMat = new BABYLON.StandardMaterial("cobaltStoneMat", scene);
  cobaltStoneMat.diffuseTexture = cobaltStoneTexture;
  cobaltStoneMat.specularColor = BABYLON.Color3.Black()

  const oakPlankMat = new BABYLON.StandardMaterial("oakPlankMat", scene);
  oakPlankMat.diffuseTexture = oakPlankTexture;
  oakPlankMat.specularColor = BABYLON.Color3.Black()

  const cobalStoneStairMat = new BABYLON.StandardMaterial("stairCObalMat", scene)
  cobalStoneStairMat.diffuseTexture = cobalStoneStareTexture
  cobalStoneStairMat.specularColor = BABYLON.Color3.Black()
  return { oakPlankMat, cobaltStoneMat, cobalStoneStairMat, dirtMat, groundMat }
}

