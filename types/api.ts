export type Direction = {
  id: number;
  ids: number[];
  name: string;
  logo: {
    withBackground: string | null;
    white: string | null;
    simple: string | null;
  };
  currency: string[];
  filter: string[];
  keywords: string[] | string;
  isCurrent?: boolean;
};

export type Directions = Direction[];
