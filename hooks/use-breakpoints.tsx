import { useMediaQuery } from 'react-responsive';

import tailwindConfig from '@/tailwind.config';

// Define more specific types for the Tailwind config
type ScreenConfig = {
  [key: string]: string;
};

type TailwindTheme = {
  container?: {
    screens?: ScreenConfig;
  };
  screens?: ScreenConfig;
};

type TailwindConfig = {
  theme?: TailwindTheme;
};

// Cast the imported config to our type definition
const config = tailwindConfig as unknown as TailwindConfig;

// Safely access the screens with fallbacks
const screens = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1400px',
  ...(config.theme?.container?.screens || {}),
  ...(config.theme?.screens || {})
};

export function useBreakpoint<K extends string>(breakpointKey: K) {
  const breakpointValue = screens[breakpointKey as keyof typeof screens];

  const bool = useMediaQuery({
    query: `(max-width: ${breakpointValue})`
  });

  const capitalizedKey =
    breakpointKey[0].toUpperCase() + breakpointKey.substring(1);

  type KeyAbove = `isAbove${Capitalize<K>}`;
  type KeyBelow = `isBelow${Capitalize<K>}`;

  return {
    [breakpointKey]: Number(String(breakpointValue).replace(/[^0-9]/g, '')),
    [`isAbove${capitalizedKey}`]: !bool,
    [`isBelow${capitalizedKey}`]: bool
  } as Record<K, number> & Record<KeyAbove | KeyBelow, boolean>;
}
