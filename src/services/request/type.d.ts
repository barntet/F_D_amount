declare module 'whatwg-fetch' {
  export const Headers: typeof globalThis.Headers;
  export const Response: typeof globalThis.Response;
  export const Request: typeof globalThis.Request;
  export const DOMException: typeof globalThis.DOMException;
  export function fetch(
    input: RequestInfo,
    init?: RequestInit,
  ): Promise<Response>;
}
