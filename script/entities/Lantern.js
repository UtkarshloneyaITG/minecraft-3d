export function lanternMinecraft(scene, x, y, z) {
  const lantern = new BABYLON.TransformNode("lantern", scene);
  const lanternLight = new BABYLON.PointLight(
    "lanternLight",
    new BABYLON.Vector3(x, y, z),
    scene
  );

  setInterval(() => {
    lanternLight.intensity = 0.7 + Math.random() * 0.;
  }, 300)
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
  return { lantern, mesh: bottom, lanternLight };
}