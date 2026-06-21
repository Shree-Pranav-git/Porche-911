export type AccentColor = 'red' | 'green' | 'yellow' | 'silver';

export interface TechSpec {
  label: string;
  value: string;
  suffix: string;
  description: string;
}

export interface CabinTheme {
  id: AccentColor;
  name: string;
  hex: string;
  glowClass: string;
  bgGlowClass: string;
  textClass: string;
  bgClass: string;
}

export interface VideoSource {
  url: string;
  name: string;
  isLocal: boolean;
}

export type WheelOption = 'modern' | 'classic';
export type AeroOption = 'standard' | 'sport';

export interface CarColorOption {
  id: string;
  name: string;
  hex: string;
  blendMode: 'multiply' | 'color' | 'overlay' | 'hue';
}
