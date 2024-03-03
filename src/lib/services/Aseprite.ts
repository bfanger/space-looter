import {
  Rectangle,
  SCALE_MODES,
  Sprite,
  Texture,
  Ticker,
  UPDATE_PRIORITY,
} from "pixi.js";
import type { AsepriteJson } from "./aseprite-types";

const FRAME_TIME = 1000 / 60;

export default class Aseprite extends Sprite {
  private frames: Texture[] | undefined;

  private durations: number[] | undefined;

  private currentFrameIndex: number;

  private accumulator: number;

  constructor(url: string) {
    super(
      Texture.from(url.replace(/\.json$/, ".png"), {
        scaleMode: SCALE_MODES.NEAREST,
      }),
    );
    this.texture.frame = new Rectangle(0, 0, 0, 0);
    this.currentFrameIndex = 0;
    this.accumulator = 0;
    (async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load ${url}`);
      }
      const json: AsepriteJson = await response.json();
      const data = Object.values(json.frames);

      this.frames = data.map(
        ({ frame: { x, y, w, h } }) =>
          new Texture(this.texture.baseTexture, new Rectangle(x, y, w, h)),
      );
      this.durations = data.map((frame) => frame.duration / FRAME_TIME);
      Ticker.shared.add(this.update, this, UPDATE_PRIORITY.LOW);
    })();
  }

  update(deltaTime: number): void {
    if (!this.frames || !this.durations) {
      return;
    }
    this.accumulator += deltaTime;
    if (this.accumulator > this.durations[this.currentFrameIndex]) {
      this.accumulator -= this.durations[this.currentFrameIndex];
      this.currentFrameIndex =
        (this.currentFrameIndex + 1) % this.frames.length;
      this.texture = this.frames[this.currentFrameIndex];
    }
  }

  destroy(options?: boolean | { children?: boolean; texture?: boolean }): void {
    Ticker.shared.remove(this.update, this);
    super.destroy(options);
  }
}
