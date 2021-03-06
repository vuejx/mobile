var ObserverClass = /** @class */ (function (_super) {
    __extends(ObserverClass, _super);
    function ObserverClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // NOTE: Refactor this - use Typescript property instead of strings....
    ObserverClass.prototype.observeValueForKeyPathOfObjectChangeContext = function (path) {
        if (path === 'selected') {
            this['_owner']._onSelectedChanged();
        }
        else if (path === 'enabled') {
            this['_owner']._onEnabledChanged();
        }
        else if (path === 'highlighted') {
            this['_owner']._onHighlightedChanged();
        }
    };
    return ObserverClass;
}(NSObject));
export class ControlStateChangeListener {
    constructor(control, callback) {
        this._observing = false;
        this._observer = ObserverClass.alloc().init();
        this._observer['_owner'] = this;
        this._control = control;
        this._callback = callback;
    }
    start() {
        if (!this._observing) {
            this._control.addObserverForKeyPathOptionsContext(this._observer, 'highlighted', 1 /* New */, null);
            this._observing = true;
            this._updateState();
        }
    }
    stop() {
        if (this._observing) {
            this._observing = false;
            this._control.removeObserverForKeyPath(this._observer, 'highlighted');
        }
    }
    //@ts-ignore
    _onEnabledChanged() {
        this._updateState();
    }
    //@ts-ignore
    _onSelectedChanged() {
        this._updateState();
    }
    //@ts-ignore
    _onHighlightedChanged() {
        this._updateState();
    }
    _updateState() {
        let state = 'normal';
        if (this._control.highlighted) {
            state = 'highlighted';
        }
        this._callback(state);
    }
}
//# sourceMappingURL=index.ios.js.map