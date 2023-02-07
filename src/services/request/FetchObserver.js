/**
 * @description 先实现一个被废弃的草案
 * @url https://developer.mozilla.org/zh-CN/docs/Web/API/FetchObserver
 */
export class FetchObserver {
    /** @description 由于查不到state的枚举值所以未实现 */
    state = null;
    /** @description 由于查不到state的枚举值所以未实现 */
    onstatechange = null;
    evt = new EventTarget();
    onrequestprogress = null;
    onresponseprogress = null;
    addEventListener(type, listener, options) {
        return this.evt.addEventListener(type, listener, options);
    }
    removeEventListener(type, listener, options) {
        this.evt.removeEventListener(type, listener, options);
    }
    dispatchEvent(event) {
        return this.evt.dispatchEvent(event);
    }
}
//# sourceMappingURL=FetchObserver.js.map