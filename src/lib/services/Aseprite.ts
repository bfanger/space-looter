import { Rectangle, Sprite, Texture, Ticker, UPDATE_PRIORITY } from "pixi.js";
import type { AsepriteJson } from "./aseprite-types";

export default class Aseprite extends Sprite {
  private frames: Texture[] | undefined;

  private durations: number[] | undefined;

  private currentFrameIndex: number;

  private accumulator: number;

  constructor(url: string) {
    const { source } = Texture.from(url.replace(/\.json$/, ".png"));
    source.scaleMode = "nearest";
    super(new Texture({ source, frame: new Rectangle(0, 0, 0, 0) }));

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
          new Texture({ source, frame: new Rectangle(x, y, w, h) }),
      );
      this.durations = data.map((frame) => frame.duration);
      Ticker.shared.add(this.update, this, UPDATE_PRIORITY.LOW);
    })();
  }

  update(ticker: Ticker): void {
    if (!this.frames || !this.durations) {
      return;
    }
    this.accumulator += ticker.deltaMS;
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
