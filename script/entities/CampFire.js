export function campFire(scene, x, y, z) {
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
  setInterval(() => {
    campFireLight.intensity = 0.3 + Math.random() * 0.3;
  }, 70)
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