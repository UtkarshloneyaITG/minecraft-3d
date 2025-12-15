export function createTorch(scene, x, y, z) {
  const Torch = BABYLON.MeshBuilder.CreateBox("torch", { width: 0.25, depth: 0.25 }, scene)
  Torch.position.set(x, y, z)
}