import { fillBlock } from "./FillBlock.js"

export function createTree(x, y, z, wood, leaf) {
  fillBlock(x, y, z, x, y + 4, z, wood)
  fillBlock(x - 3, y + 5, z - 2, x + 3, y + 6, z + 2, leaf)
  fillBlock(x - 2, y + 5, z - 3, x + 2, y + 6, z - 3, leaf)
  fillBlock(x - 2, y + 5, z + 3, x + 2, y + 6, z + 3, leaf)

  fillBlock(x - 2, y + 7, z - 1, x + 2, y + 8, z + 1, leaf)
  fillBlock(x - 1, y + 7, z - 2, x + 1, y + 8, z - 2, leaf)
  fillBlock(x - 1, y + 7, z + 2, x + 1, y + 8, z + 2, leaf)

  fillBlock(x - 1, y + 9, z - 1, x + 1, y + 9, z + 1, leaf)
}