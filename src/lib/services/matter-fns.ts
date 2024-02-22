import {
  Events,
  type Engine,
  type IEngineCallback,
  Composite,
  Body,
} from "matter-js";
import { getContext, onDestroy, setContext } from "svelte";

const key = Symbol("matter-js");

type MatterContext = {
  engine: Engine;
};

export function setMatterContext(context: MatterContext) {
  setContext(key, context);
}

export function getMatterContext() {
  const context = getContext<MatterContext | undefined>(key);
  if (!context) {
    throw new Error("No matter context found");
  }
  return context;
}

export function onEngineBeforeUpdate(cb: IEngineCallback) {
  const { engine } = getMatterContext();
  Events.on(engine, "beforeUpdate", cb);
  onDestroy(() => {
    Events.off(engine, "beforeUpdate", cb);
  });
}

export function onEngineAfterUpdate(cb: IEngineCallback) {
  const { engine } = getMatterContext();
  Events.on(engine, "afterUpdate", cb);
  onDestroy(() => {
    Events.off(engine, "afterUpdate", cb);
  });
}

export function worldAdd(...bodies: Body[]) {
  const { engine } = getMatterContext();
  Composite.add(engine.world, bodies);
  onDestroy(() => {
    Composite.remove(engine.world, bodies);
  });
}
