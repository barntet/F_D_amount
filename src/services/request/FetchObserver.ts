/**
 * @description 先实现一个被废弃的草案
 * @url https://developer.mozilla.org/zh-CN/docs/Web/API/FetchObserver
 */
export class FetchObserver implements FetchObserver {
  /** @description 由于查不到state的枚举值所以未实现 */
  readonly state = null;

  /** @description 由于查不到state的枚举值所以未实现 */
  onstatechange = null;

  private evt = new EventTarget();

  onrequestprogress: ((this: FetchObserver, ev: ProgressEvent) => any) | null =
    null;

  onresponseprogress: ((this: FetchObserver, ev: ProgressEvent) => any) | null =
    null;

  addEventListener<K extends keyof FetchObserverEventMap>(
    type: K,
    listener: FetchObserverListener<K>,
    options?: boolean | AddEventListenerOptions
  ): void {
    return this.evt.addEventListener(type, listener as EventListener, options);
  }

  removeEventListener<K extends keyof FetchObserverEventMap>(
    type: K,
    listener: FetchObserverListener<K>,
    options?: boolean | EventListenerOptions
  ): void {
    this.evt.removeEventListener(type, listener as EventListener, options);
  }

  dispatchEvent(event: Event): boolean {
    return this.evt.dispatchEvent(event);
  }
}

export type FetchObserverListener<K extends keyof FetchObserverEventMap> =
  | ((ev: FetchObserverEventMap[K]) => any)
  | null;

export interface FetchObserverEventMap {
  requestprogress: ProgressEvent;
  responseprogress: ProgressEvent;
}

export type FetchObserverCallback = (observer: FetchObserver) => void;
