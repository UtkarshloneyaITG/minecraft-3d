export function fillBlock(x1, y1, z1, x2, y2, z2, block, rotatex = 0, rotatey = 0) {
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
        // if (B instanceof BABYLON.Mesh) {
        //   shadowGen.addShadowCaster(B);
        //   B.receiveShadows = true;
        // } else if (B instanceof BABYLON.TransformNode) {
        //   B.getChildMeshes().forEach(m => {

        //     shadowGen.addShadowCaster(m);
        //     m.receiveShadows = true;
        //   });
        // }

      }
    }
  }
}

