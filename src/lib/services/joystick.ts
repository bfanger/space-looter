import { writable } from "svelte/store";

type Joystick = {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
};
const state: Joystick = {
  up: false,
  down: false,
  left: false,
  right: false,
};
const joystick = writable(state);

if (typeof window === "object") {
  window.addEventListener("keydown", (e) => {
    // Arrow keys
    if (e.key === "ArrowUp") {
      state.up = true;
    }
    if (e.key === "ArrowDown") {
      state.down = true;
    }
    if (e.key === "ArrowLeft") {
      state.left = true;
    }
    if (e.key === "ArrowRight") {
      state.right = true;
    }
    // WASD
    if (e.key === "w") {
      state.up = true;
    }
    if (e.key === "a") {
      state.left = true;
    }
    if (e.key === "s") {
      state.down = true;
    }
    if (e.key === "d") {
      state.right = true;
    }

    joystick.set(state);
  });
  window.addEventListener("keyup", (e) => {
    // Arrow keys
    if (e.key === "ArrowUp") {
      state.up = false;
    }
    if (e.key === "ArrowDown") {
      state.down = false;
    }
    if (e.key === "ArrowLeft") {
      state.left = false;
    }
    if (e.key === "ArrowRight") {
      state.right = false;
    }
    // WASD
    if (e.key === "w") {
      state.up = false;
    }
    if (e.key === "a") {
      state.left = false;
    }
    if (e.key === "s") {
      state.down = false;
    }
    if (e.key === "d") {
      state.right = false;
    }
    joystick.set(state);
  });
}

export default joystick;
