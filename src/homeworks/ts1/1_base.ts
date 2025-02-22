/**
 * Нужно превратить файл в ts и указать типы аргументов и типы возвращаемого значения
 * */

export const removePlus = (string: string): string => string.replace(/^\+/, '');

export const addPlus = (string: string): string => `+${string}`;

export const removeFirstZeros = (value: string): string => value.replace(/^(-)?[0]+(-?\d+.*)$/, '$1$2');

export const getBeautifulNumber = (separator = ' ', value?: number): string =>
  value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);

export const round = (value: number, accuracy = 2): number => {
  const d: number = 10 ** accuracy;
  return Math.round(value * d) / d;
};

const transformRegexp =
  /(matrix\(-?\d+(\.\d+)?, -?\d+(\.\d+)?, -?\d+(\.\d+)?, -?\d+(\.\d+)?, )(-?\d+(\.\d+)?), (-?\d+(\.\d+)?)\)/;

type transformResult = {
  x: number;
  y: number;
};

export const getTransformFromCss = (transformCssString: string): transformResult => {
  const data: string[] | null = transformCssString.match(transformRegexp);
  if (!data) return { x: 0, y: 0 };
  return {
    x: parseInt(data[6], 10),
    y: parseInt(data[8], 10),
  };
};

export const getColorContrastValue = (colors: [red: number, green: number, blue: number]): number => {
  // http://www.w3.org/TR/AERT#color-contrast
  const [red, green, blue] = colors;
  return Math.round((red * 299 + green * 587 + blue * 114) / 1000);
};

type contrastType = 'black' | 'white';

export const getContrastType = (contrastValue: number): contrastType => (contrastValue > 125 ? 'black' : 'white');

export const shortColorRegExp = /^#[0-9a-f]{3}$/i;
export const longColorRegExp = /^#[0-9a-f]{6}$/i;

export const checkColor = (color: string): never | void => {
  if (!longColorRegExp.test(color) && !shortColorRegExp.test(color)) throw new Error(`invalid hex color: ${color}`);
};

export const hex2rgb = (color: string): [number, number, number] => {
  checkColor(color);
  if (shortColorRegExp.test(color)) {
    const red: number = parseInt(color.substring(1, 2), 16);
    const green: number = parseInt(color.substring(2, 3), 16);
    const blue: number = parseInt(color.substring(3, 4), 16);
    return [red, green, blue];
  }
  const red: number = parseInt(color.substring(1, 3), 16);
  const green: number = parseInt(color.substring(3, 5), 16);
  const blue: number = parseInt(color.substring(5, 8), 16);
  return [red, green, blue];
};

export const getNumberedArray = <T>(arr: Array<T>): { value: T; number: number }[] =>
  arr.map((value, number) => ({ value, number }));

export const toStringArray = <T>(arr: { value: T; number: number }[]): string[] =>
  arr.map(({ value, number }) => `${value}_${number}`);

type Customer = {
  id: number;
  name: string;
  age: number;
  isSubscribed: boolean;
};

type CustomerResult = Record<number, Omit<Customer, 'id'>>;

export const transformCustomers = (customers: Customer[]): CustomerResult => {
  return customers.reduce((acc: CustomerResult, customer) => {
    acc[customer.id] = { name: customer.name, age: customer.age, isSubscribed: customer.isSubscribed };
    return acc;
  }, {});
};
