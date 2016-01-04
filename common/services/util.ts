'use strict';

export const filters = {
  all: new RegExp(''),
  listeners: /^on.+/,
};

export function getInObject(obj: any, ...keys: Array<string | symbol>): any {
  return keys.reduce((agg: any, key: string | symbol): any => {
    if (obj.hasOwnProperty(key)) {
      agg[key] = obj[key];
    }
    return agg;
  }, {});
};

export function dashify(str: string): string {
  return str.replace(/[\/\s\.]+/g, '-').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

export function base64ToUint8Array(str: string): Uint8Array {
  return new Uint8Array(Array.from(atob(str)).map(char => char.charCodeAt(0)));
};

export function Uint8ArrayToJSON(ui8a: Uint8Array): any {
  return JSON.parse(new TextDecoder('utf-8').decode(ui8a));
};

export function base64ToJSON(str: string): any {
  return Uint8ArrayToJSON(base64ToUint8Array(str));
};

export function autobind(target: any, regexpOrfilter: RegExp | Types.Filter<string>): void {
  const filter = regexpOrfilter instanceof RegExp ? key => (regexpOrfilter as RegExp).test(key) : regexpOrfilter;

  Object.keys(Object.getPrototypeOf(target)).filter(filter as Types.Filter<string>).forEach(met => {
    target[met] = target[met].bind(target);
  });
}
