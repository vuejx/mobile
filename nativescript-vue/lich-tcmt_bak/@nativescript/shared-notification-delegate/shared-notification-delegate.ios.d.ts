import { SharedNotificationDelegateCommon } from './shared-notification-delegate.common';
export interface DelegateObserver {
    userNotificationCenterDidReceiveNotificationResponseWithCompletionHandler?(center: UNUserNotificationCenter, response: UNNotificationResponse, completionHandler: () => void, next: () => void): void;
    userNotificationCenterOpenSettingsForNotification?(center: UNUserNotificationCenter, notification: UNNotification, stop: () => void, next: () => void): void;
    userNotificationCenterWillPresentNotificationWithCompletionHandler?(center: UNUserNotificationCenter, notification: UNNotification, completionHandler: (p1: UNNotificationPresentationOptions) => void, next: () => void): void;
    /**
     * if set to not null/undefined, will ensure only one is registered
     */
    observerUniqueKey?: any;
}
export declare class SharedNotificationDelegateImpl extends SharedNotificationDelegateCommon {
    _observers: Array<{
        observer: DelegateObserver;
        priority: number;
    }>;
    disableUnhandledWarning: boolean;
    private delegate;
    constructor();
    static isUNUserNotificationCenterAvailable(): boolean;
    addObserver(observer: DelegateObserver, priority?: number): void;
    removeObserver(observer: DelegateObserver): void;
    removeObserverByUniqueKey(key: string): void;
    clearObservers(): void;
    private sortObservers;
}
export declare const SharedNotificationDelegate: SharedNotificationDelegateImpl;
