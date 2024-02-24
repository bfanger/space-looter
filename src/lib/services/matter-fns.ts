import {
  Events,
  Composite,
  Body,
  type Engine,
  type ICallback,
} from "matter-js";
import { getContext, onDestroy, setContext } from "svelte";
import type { Writable } from "svelte/store";

const key = Symbol("matter-js");
type MatterContext = {
  engine: Engine;
  player: Writable<Body>;
};

export function setMatterContext(context: MatterContext): MatterContext {
  return setContext(key, context);
}

export function getMatterContext() {
  const context = getContext<MatterContext | undefined>(key);
  if (!context) {
    throw new Error("No matter context available");
  }
  return context;
}

export const onMatterEvent: (typeof Events)["on"] = (
  target: any,
  event: string,
  cb: ICallback<any>,
) => {
  Events.on(target, event, cb);
  onDestroy(() => {
    Events.off(target, event, cb);
  });
};

/**
 * Inject item(s) into the world and remove them when the svelte component is destroyed
 */
export function mountMatter(items: Parameters<typeof Composite.add>[1]) {
  const { engine } = getMatterContext();
  Composite.add(engine.world, items);
  onDestroy(() => {
    Composite.remove(engine.world, items);
  });
}
