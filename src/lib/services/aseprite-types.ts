type AsepriteFrame = {
  frame: { x: number; y: number; w: number; h: number };
  rotated: boolean;
  trimmed: boolean;
  spriteSourceSize: { x: number; y: number; w: number; h: number };
  sourceSize: { w: number; h: number };
  duration: number;
};

type AsepriteLayer = {
  name: string;
  opacity: number;
  blendMode: string;
};

type AsepriteMeta = {
  app: string;
  version: string;
  image: string;
  format: string;
  size: { w: number; h: number };
  scale: string;
  frameTags: any[];
  layers: AsepriteLayer[];
  slices: any[];
};

export type AsepriteJson = {
  frames: { [key: string]: AsepriteFrame };
  meta: AsepriteMeta;
};
