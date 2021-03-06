import { SharedNotificationDelegateCommon } from './shared-notification-delegate.common';
function createDeferedPromise() {
    const deferred = {
        promise: undefined,
        reject: undefined,
        resolve: undefined
    };
    deferred.promise = new Promise((resolve, reject) => {
        deferred.resolve = resolve;
        deferred.reject = reject;
    });
    return deferred;
}
function createStopNextPromise() {
    const deferred = createDeferedPromise();
    return Object.assign(Object.assign({}, deferred), { next: () => deferred.resolve(false), stop: () => deferred.resolve(true) });
}
var UNUserNotificationCenterDelegateImpl = /** @class */ (function (_super) {
    __extends(UNUserNotificationCenterDelegateImpl, _super);
    function UNUserNotificationCenterDelegateImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UNUserNotificationCenterDelegateImpl.new = function () {
        if (UNUserNotificationCenterDelegateImpl.ObjCProtocols.length === 0 && typeof (UNUserNotificationCenterDelegate) !== "undefined") {
            UNUserNotificationCenterDelegateImpl.ObjCProtocols.push(UNUserNotificationCenterDelegate);
        }
        return _super.new.call(this);
    };
    UNUserNotificationCenterDelegateImpl.initWithOwner = function (owner) {
        var delegate = UNUserNotificationCenterDelegateImpl.new();
        delegate._owner = owner;
        return delegate;
    };
    UNUserNotificationCenterDelegateImpl.prototype.userNotificationCenterWillPresentNotificationWithCompletionHandler = function (center, notification, completionHandler) {
        var promise = Promise.resolve(false);
        var owner = this._owner.get();
        if (owner) {
            owner._observers.forEach(function (_a) {
                var observer = _a.observer;
                if (observer.userNotificationCenterWillPresentNotificationWithCompletionHandler) {
                    promise = promise.then(function (skip) {
                        if (skip) {
                            return true;
                        }
                        var defPromise = createStopNextPromise();
                        var childHandler = function (p1) {
                            defPromise.stop();
                            completionHandler(p1);
                        };
                        try {
                            observer.userNotificationCenterWillPresentNotificationWithCompletionHandler(center, notification, childHandler, defPromise.next);
                        }
                        catch (ignore) {
                            defPromise.next();
                        }
                        return defPromise.promise;
                    });
                }
            });
            promise.then(function (handled) {
                if (!handled) {
                    completionHandler(0);
                }
                return true;
            });
        }
    };
    UNUserNotificationCenterDelegateImpl.prototype.userNotificationCenterOpenSettingsForNotification = function (center, notification) {
        var promise = Promise.resolve(false);
        var owner = this._owner.get();
        if (owner) {
            owner._observers.forEach(function (_a) {
                var observer = _a.observer;
                if (observer.userNotificationCenterOpenSettingsForNotification) {
                    promise = promise.then(function (skip) {
                        if (skip) {
                            return true;
                        }
                        var defPromise = createStopNextPromise();
                        try {
                            observer.userNotificationCenterOpenSettingsForNotification(center, notification, defPromise.stop, defPromise.next);
                        }
                        catch (ignore) {
                            defPromise.next();
                        }
                        return defPromise.promise;
                    });
                }
            });
        }
    };
    UNUserNotificationCenterDelegateImpl.prototype.userNotificationCenterDidReceiveNotificationResponseWithCompletionHandler = function (center, response, completionHandler) {
        var promise = Promise.resolve(false);
        var owner = this._owner.get();
        if (owner) {
            owner._observers.forEach(function (_a) {
                var observer = _a.observer;
                if (observer.userNotificationCenterDidReceiveNotificationResponseWithCompletionHandler) {
                    promise = promise.then(function (skip) {
                        if (skip) {
                            return true;
                        }
                        var defPromise = createStopNextPromise();
                        var childHandler = function () {
                            defPromise.stop();
                            completionHandler();
                        };
                        try {
                            observer.userNotificationCenterDidReceiveNotificationResponseWithCompletionHandler(center, response, childHandler, defPromise.next);
                        }
                        catch (ignore) {
                            defPromise.next();
                        }
                        return defPromise.promise;
                    });
                }
            });
            promise.then(function (handled) {
                if (!handled) {
                    if (!owner.disableUnhandledWarning) {
                        console.log("WARNING[shared-notification-delegate]: Notification was received but was not handled by any observer");
                    }
                    completionHandler();
                }
                return true;
            });
        }
    };
    UNUserNotificationCenterDelegateImpl.ObjCProtocols = [];
    return UNUserNotificationCenterDelegateImpl;
}(NSObject));
export class SharedNotificationDelegateImpl extends SharedNotificationDelegateCommon {
    constructor() {
        super();
        this._observers = [];
        this.disableUnhandledWarning = false;
        if (SharedNotificationDelegateImpl.isUNUserNotificationCenterAvailable()) {
            this.delegate = UNUserNotificationCenterDelegateImpl.initWithOwner(new WeakRef(this));
            UNUserNotificationCenter.currentNotificationCenter().delegate = this.delegate;
        }
    }
    static isUNUserNotificationCenterAvailable() {
        try {
            // available since iOS 10
            return !!UNUserNotificationCenter;
        }
        catch (ignore) {
            return false;
        }
    }
    addObserver(observer, priority = 100) {
        if (observer.observerUniqueKey != null) {
            this.removeObserverByUniqueKey(observer.observerUniqueKey);
        }
        this._observers.push({ observer, priority });
        this.sortObservers();
    }
    removeObserver(observer) {
        this._observers = this._observers.filter((v) => v.observer !== observer);
    }
    removeObserverByUniqueKey(key) {
        if (key == null) {
            console.log("SharedNotificationDelegate Warning: tried to remove null/undefined keys.");
            return;
        }
        this._observers = this._observers.filter((v) => v.observer.observerUniqueKey !== key);
    }
    clearObservers() {
        this._observers = [];
    }
    sortObservers() {
        this._observers.sort((a, b) => a.priority > b.priority ? 1 : (a.priority < b.priority ? -1 : 0));
    }
}
const instance = new SharedNotificationDelegateImpl();
export const SharedNotificationDelegate = instance;
//# sourceMappingURL=shared-notification-delegate.ios.js.map