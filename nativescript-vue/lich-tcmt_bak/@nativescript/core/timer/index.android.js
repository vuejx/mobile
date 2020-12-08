/**
 * Android specific timer functions implementation.
 */
let timeoutHandler;
const timeoutCallbacks = {};
let timerId = 0;
function createHandlerAndGetId() {
    if (!timeoutHandler) {
        timeoutHandler = new android.os.Handler(android.os.Looper.myLooper());
    }
    timerId++;
    return timerId;
}
export function setTimeout(callback, milliseconds = 0, ...args) {
    // Cast to Number
    milliseconds += 0;
    const id = createHandlerAndGetId();
    const invoke = () => callback(...args);
    const zoneBound = zonedCallback(invoke);
    const runnable = new java.lang.Runnable({
        run: () => {
            zoneBound();
            if (timeoutCallbacks[id]) {
                delete timeoutCallbacks[id];
            }
        },
    });
    if (!timeoutCallbacks[id]) {
        timeoutCallbacks[id] = runnable;
    }
    timeoutHandler.postDelayed(runnable, long(milliseconds));
    return id;
}
export function clearTimeout(id) {
    let index = id;
    if (timeoutCallbacks[index]) {
        timeoutHandler.removeCallbacks(timeoutCallbacks[index]);
        delete timeoutCallbacks[index];
    }
}
export function setInterval(callback, milliseconds = 0, ...args) {
    // Cast to Number
    milliseconds += 0;
    const id = createHandlerAndGetId();
    const handler = timeoutHandler;
    const invoke = () => callback(...args);
    const zoneBound = zonedCallback(invoke);
    const runnable = new java.lang.Runnable({
        run: () => {
            zoneBound();
            if (timeoutCallbacks[id]) {
                handler.postDelayed(runnable, long(milliseconds));
            }
        },
    });
    if (!timeoutCallbacks[id]) {
        timeoutCallbacks[id] = runnable;
    }
    timeoutHandler.postDelayed(runnable, long(milliseconds));
    return id;
}
export const clearInterval = clearTimeout;
//# sourceMappingURL=index.android.js.map