export const defaultColorScheme = 'gray';

export type ColorScheme =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'gray';

export const ColorSchemes: readonly ColorScheme[] = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'pink',
  'gray',
];

export const ColorSchemesBg = {
  red: 'bg-red-500',
  orange: 'bg-orange-500',
  yellow: 'bg-yellow-500',
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
  pink: 'bg-pink-500',
  gray: 'bg-gray-500',
};

export const ColorSchemesOutline = {
  red: 'outline-red-500',
  orange: 'outline-orange-500',
  yellow: 'outline-yellow-500',
  green: 'outline-green-500',
  blue: 'outline-blue-500',
  purple: 'outline-purple-500',
  pink: 'outline-pink-500',
  gray: 'outline-gray-500',
};

export const ColorSchemesText = {
  red: 'text-red-500',
  orange: 'text-orange-500',
  yellow: 'text-yellow-300',
  green: 'text-green-500',
  blue: 'text-blue-500',
  purple: 'text-purple-500',
  pink: 'text-pink-500',
  gray: 'text-gray-500',
};
