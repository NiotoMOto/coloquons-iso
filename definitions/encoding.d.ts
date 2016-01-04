interface TextEncoder {
  encoding: string; // readonly
  encode(input?: string): Uint8Array;
}
declare var TextEncoder: {
  prototype: TextEncoder;
  new (utfLabel?: string): TextEncoder;
}

interface TextDecoder {
  encoding:  string;
  fatal:     boolean;
  ignoreBOM: boolean;
  decode(input?: any, options?: Object): string;
}
declare var TextDecoder: {
  prototype: TextDecoder;
  new (label?: string, options?: Object): TextDecoder;
}
