/* eslint-disable no-param-reassign */
const directions = [
  { x: 0, y: 1 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: -1, y: 0 },
] as const;

const types = [
  "antenna",
  "blaadje",
  "empty",
  "stem",
  "water",
  "wortel",
  "zaad",
] as const;

export type CellType = (typeof types)[number];
export type Cell = {
  type: CellType;
  counter: number;
  energy: number;
};

export type World = EventTarget & {
  width: number;
  height: number;
  grid: Cell[][];
};

export function forEachCell(
  world: World,
  fn: (cell: Cell, x: number, y: number) => void
) {
  for (let x = 0; x < world.width; x += 1) {
    for (let y = 0; y < world.height; y += 1) {
      fn(world.grid[x][y], x, y);
    }
  }
}
export function tick(world: World) {
  forEachCell(world, (cell, x, y) => {
    if (cell.type === "empty") {
      return;
    }
    cell.counter += 1;
    if (cell.type === "zaad" && cell.counter > 2) {
      const direction =
        directions[Math.floor(Math.random() * directions.length)];
      const stemX = x + direction.x;
      const stemY = y + direction.y;

      if (
        inside(world, stemX, stemY) &&
        world.grid[stemX][stemY].type === "empty"
      ) {
        world.grid[stemX][stemY].type = "stem";
        cell.energy -= 1;
        if (cell.energy < 0) {
          cell.type = "empty";
        }
      }
      cell.counter = 0;
    }
  });
  world.dispatchEvent(new Event("tick"));
}

export function randomize(world: World) {
  forEachCell(world, (cell) => {
    if (Math.random() < 0.1) {
      const index = Math.floor(Math.random() * types.length);
      cell.type = types[index];
    } else {
      cell.type = "empty";
    }
  });
}

export function inside(world: World, x: number, y: number) {
  return x >= 0 && x < world.width && y >= 0 && y < world.height;
}
