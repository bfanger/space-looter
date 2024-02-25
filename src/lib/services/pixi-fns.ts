import type { Application } from "pixi.js";
import { getContext, setContext } from "svelte";

const key = Symbol("pixi");
type PixiContext = {
  app: Application;
};

export function setPixiContext(context: PixiContext): PixiContext {
  return setContext(key, context);
}

export function getPixiContext(): PixiContext {
  const context = getContext<PixiContext | undefined>(key);
  if (!context) {
    throw new Error("Pixi context not found");
  }
  return context;
}
