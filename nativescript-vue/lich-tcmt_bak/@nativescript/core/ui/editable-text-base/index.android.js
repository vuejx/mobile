import { EditableTextBase as EditableTextBaseCommon, keyboardTypeProperty, returnKeyTypeProperty, editableProperty, autocapitalizationTypeProperty, autocorrectProperty, hintProperty, placeholderColorProperty, maxLengthProperty } from './editable-text-base-common';
import { textTransformProperty, textProperty, resetSymbol } from '../text-base';
import { Color } from '../../color';
import { ad } from '../../utils';
export * from './editable-text-base-common';
//https://github.com/NativeScript/NativeScript/issues/2942
export let dismissKeyboardTimeoutId;
export let dismissKeyboardOwner;
let EditTextListeners;
function clearDismissTimer() {
    dismissKeyboardOwner = null;
    if (dismissKeyboardTimeoutId) {
        clearTimeout(dismissKeyboardTimeoutId);
        dismissKeyboardTimeoutId = null;
    }
}
function dismissSoftInput(owner) {
    clearDismissTimer();
    if (!dismissKeyboardTimeoutId) {
        dismissKeyboardTimeoutId = setTimeout(() => {
            const owner = dismissKeyboardOwner && dismissKeyboardOwner.get();
            const activity = (owner && owner._context);
            const nativeView = owner && owner.nativeViewProtected;
            dismissKeyboardTimeoutId = null;
            dismissKeyboardOwner = null;
            const focused = activity && activity.getCurrentFocus();
            if (!focused || !(focused instanceof android.widget.EditText)) {
                ad.dismissSoftInput(nativeView);
            }
        }, 10);
    }
}
function initializeEditTextListeners() {
    if (EditTextListeners) {
        return;
    }
    var EditTextListenersImpl = /** @class */ (function (_super) {
    __extends(EditTextListenersImpl, _super);
    function EditTextListenersImpl(owner) {
        var _this = _super.call(this) || this;
        _this.owner = owner;
        return global.__native(_this);
    }
    EditTextListenersImpl.prototype.beforeTextChanged = function (text, start, count, after) {
        //
    };
    EditTextListenersImpl.prototype.onTextChanged = function (text, start, before, count) {
        // const owner = this.owner;
        // let selectionStart = owner.android.getSelectionStart();
        // owner.android.removeTextChangedListener(owner._editTextListeners);
        // owner.android.addTextChangedListener(owner._editTextListeners);
        // owner.android.setSelection(selectionStart);
    };
    EditTextListenersImpl.prototype.afterTextChanged = function (editable) {
        var owner = this.owner;
        if (!owner || owner._changeFromCode) {
            return;
        }
        switch (owner.updateTextTrigger) {
            case 'focusLost':
                owner._dirtyTextAccumulator = editable.toString();
                break;
            case 'textChanged':
                textProperty.nativeValueChange(owner, editable.toString());
                break;
            default:
                throw new Error('Invalid updateTextTrigger: ' + owner.updateTextTrigger);
        }
    };
    EditTextListenersImpl.prototype.onFocusChange = function (view, hasFocus) {
        var owner = this.owner;
        if (!owner) {
            return;
        }
        if (hasFocus) {
            clearDismissTimer();
            owner.notify({
                eventName: EditableTextBase.focusEvent,
                object: owner,
            });
        }
        else {
            if (owner._dirtyTextAccumulator || owner._dirtyTextAccumulator === '') {
                textProperty.nativeValueChange(owner, owner._dirtyTextAccumulator);
                owner._dirtyTextAccumulator = undefined;
            }
            owner.notify({
                eventName: EditableTextBase.blurEvent,
                object: owner,
            });
            dismissSoftInput(owner);
        }
    };
    EditTextListenersImpl.prototype.onEditorAction = function (textView, actionId, event) {
        var owner = this.owner;
        if (!owner) {
            return false;
        }
        if (actionId === android.view.inputmethod.EditorInfo.IME_ACTION_DONE || actionId === android.view.inputmethod.EditorInfo.IME_ACTION_UNSPECIFIED || (event && event.getKeyCode() === android.view.KeyEvent.KEYCODE_ENTER)) {
            // If it is TextField, close the keyboard. If it is TextView, do not close it since the TextView is multiline
            // https://github.com/NativeScript/NativeScript/issues/3111
            if (textView.getMaxLines() === 1) {
                owner.dismissSoftInput();
            }
            owner._onReturnPress();
        }
        else if (actionId === android.view.inputmethod.EditorInfo.IME_ACTION_NEXT || actionId === android.view.inputmethod.EditorInfo.IME_ACTION_PREVIOUS) {
            // do not close keyboard for ACTION_NEXT or ACTION_PREVIOUS
            owner._onReturnPress();
        }
        return false;
    };
    EditTextListenersImpl = __decorate([
        Interfaces([android.text.TextWatcher, android.view.View.OnFocusChangeListener, android.widget.TextView.OnEditorActionListener])
    ], EditTextListenersImpl);
    return EditTextListenersImpl;
}(java.lang.Object));
    EditTextListeners = EditTextListenersImpl;
}
export class EditableTextBase extends EditableTextBaseCommon {
    _onReturnPress() {
        //
    }
    createNativeView() {
        return new android.widget.EditText(this._context);
    }
    initNativeView() {
        super.initNativeView();
        const editText = this.nativeTextViewProtected;
        this._configureEditText(editText);
        initializeEditTextListeners();
        const listeners = new EditTextListeners(this);
        editText.addTextChangedListener(listeners);
        editText.setOnFocusChangeListener(listeners);
        editText.setOnEditorActionListener(listeners);
        editText.listener = listeners;
        this._inputType = editText.getInputType();
    }
    disposeNativeView() {
        this.nativeTextViewProtected.listener.owner = null;
        this._keyListenerCache = null;
        super.disposeNativeView();
    }
    resetNativeView() {
        super.resetNativeView();
        this.nativeTextViewProtected.setInputType(this._inputType);
    }
    onUnloaded() {
        this.dismissSoftInput();
        super.onUnloaded();
    }
    dismissSoftInput() {
        const nativeView = this.nativeTextViewProtected;
        if (!nativeView) {
            return;
        }
        ad.dismissSoftInput(nativeView);
    }
    focus() {
        const nativeView = this.nativeTextViewProtected;
        if (!nativeView) {
            return;
        }
        const result = super.focus();
        if (result) {
            ad.showSoftInput(this.nativeTextViewProtected);
        }
        return result;
    }
    _setInputType(inputType) {
        const nativeView = this.nativeTextViewProtected;
        try {
            this._changeFromCode = true;
            nativeView.setInputType(inputType);
        }
        finally {
            this._changeFromCode = false;
        }
        // setInputType will change the keyListener so we should cache it again
        const listener = nativeView.getKeyListener();
        if (listener) {
            this._keyListenerCache = listener;
        }
        // clear these fields instead of clearing listener.
        // this allows input Type to be changed even after editable is false.
        if (!this.editable) {
            nativeView.setFocusable(false);
            nativeView.setFocusableInTouchMode(false);
            nativeView.setLongClickable(false);
            nativeView.setClickable(false);
        }
    }
    [textProperty.getDefault]() {
        return resetSymbol;
    }
    [textProperty.setNative](value) {
        try {
            this._changeFromCode = true;
            this._setNativeText(value === resetSymbol);
        }
        finally {
            this._changeFromCode = false;
        }
    }
    [keyboardTypeProperty.getDefault]() {
        return this.nativeTextViewProtected.getInputType();
    }
    [keyboardTypeProperty.setNative](value) {
        let newInputType;
        switch (value) {
            case 'datetime':
                newInputType = android.text.InputType.TYPE_CLASS_DATETIME | android.text.InputType.TYPE_DATETIME_VARIATION_NORMAL;
                break;
            case 'phone':
                newInputType = android.text.InputType.TYPE_CLASS_PHONE;
                break;
            case 'number':
                newInputType = android.text.InputType.TYPE_CLASS_NUMBER | android.text.InputType.TYPE_NUMBER_VARIATION_NORMAL | android.text.InputType.TYPE_NUMBER_FLAG_SIGNED | android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL;
                break;
            case 'url':
                newInputType = android.text.InputType.TYPE_CLASS_TEXT | android.text.InputType.TYPE_TEXT_VARIATION_URI;
                break;
            case 'email':
                newInputType = android.text.InputType.TYPE_CLASS_TEXT | android.text.InputType.TYPE_TEXT_VARIATION_EMAIL_ADDRESS;
                break;
            case 'integer':
                newInputType = android.text.InputType.TYPE_CLASS_NUMBER;
                break;
            default:
                newInputType = value;
                break;
        }
        this._setInputType(newInputType);
    }
    [returnKeyTypeProperty.getDefault]() {
        let ime = this.nativeTextViewProtected.getImeOptions();
        switch (ime) {
            case android.view.inputmethod.EditorInfo.IME_ACTION_DONE:
                return 'done';
            case android.view.inputmethod.EditorInfo.IME_ACTION_GO:
                return 'go';
            case android.view.inputmethod.EditorInfo.IME_ACTION_NEXT:
                return 'next';
            case android.view.inputmethod.EditorInfo.IME_ACTION_SEARCH:
                return 'search';
            case android.view.inputmethod.EditorInfo.IME_ACTION_SEND:
                return 'send';
            default:
                return ime.toString();
        }
    }
    [returnKeyTypeProperty.setNative](value) {
        let newImeOptions;
        switch (value) {
            case 'done':
                newImeOptions = android.view.inputmethod.EditorInfo.IME_ACTION_DONE;
                break;
            case 'go':
                newImeOptions = android.view.inputmethod.EditorInfo.IME_ACTION_GO;
                break;
            case 'next':
                newImeOptions = android.view.inputmethod.EditorInfo.IME_ACTION_NEXT;
                break;
            case 'search':
                newImeOptions = android.view.inputmethod.EditorInfo.IME_ACTION_SEARCH;
                break;
            case 'send':
                newImeOptions = android.view.inputmethod.EditorInfo.IME_ACTION_SEND;
                break;
            default:
                let ime = +value;
                if (!isNaN(ime)) {
                    newImeOptions = ime;
                }
                else {
                    newImeOptions = android.view.inputmethod.EditorInfo.IME_ACTION_UNSPECIFIED;
                }
                break;
        }
        this.nativeTextViewProtected.setImeOptions(newImeOptions);
    }
    [editableProperty.setNative](value) {
        const nativeView = this.nativeTextViewProtected;
        if (value) {
            nativeView.setKeyListener(this._keyListenerCache);
        }
        else {
            if (!this._keyListenerCache) {
                this._keyListenerCache = nativeView.getKeyListener();
            }
            nativeView.setKeyListener(null);
        }
    }
    [autocapitalizationTypeProperty.getDefault]() {
        let inputType = this.nativeTextViewProtected.getInputType();
        if ((inputType & android.text.InputType.TYPE_TEXT_FLAG_CAP_WORDS) === android.text.InputType.TYPE_TEXT_FLAG_CAP_WORDS) {
            return 'words';
        }
        else if ((inputType & android.text.InputType.TYPE_TEXT_FLAG_CAP_SENTENCES) === android.text.InputType.TYPE_TEXT_FLAG_CAP_SENTENCES) {
            return 'sentences';
        }
        else if ((inputType & android.text.InputType.TYPE_TEXT_FLAG_CAP_CHARACTERS) === android.text.InputType.TYPE_TEXT_FLAG_CAP_CHARACTERS) {
            return 'allcharacters';
        }
        else {
            return inputType.toString();
        }
    }
    [autocapitalizationTypeProperty.setNative](value) {
        let inputType = this.nativeTextViewProtected.getInputType();
        inputType = inputType & ~28672; //28672 (0x00070000) 13,14,15bits (111 0000 0000 0000)
        switch (value) {
            case 'none':
                //Do nothing, we have lowered the three bits above.
                break;
            case 'words':
                inputType = inputType | android.text.InputType.TYPE_TEXT_FLAG_CAP_WORDS; //8192 (0x00020000) 14th bit
                break;
            case 'sentences':
                inputType = inputType | android.text.InputType.TYPE_TEXT_FLAG_CAP_SENTENCES; //16384(0x00040000) 15th bit
                break;
            case 'allcharacters':
                inputType = inputType | android.text.InputType.TYPE_TEXT_FLAG_CAP_CHARACTERS; //4096 (0x00010000) 13th bit
                break;
            default:
                let number = +value;
                // We set the default value.
                if (!isNaN(number)) {
                    inputType = number;
                }
                else {
                    inputType = inputType | android.text.InputType.TYPE_TEXT_FLAG_CAP_SENTENCES;
                }
                break;
        }
        this._setInputType(inputType);
    }
    [autocorrectProperty.getDefault]() {
        let autocorrect = this.nativeTextViewProtected.getInputType();
        if ((autocorrect & android.text.InputType.TYPE_TEXT_FLAG_AUTO_CORRECT) === android.text.InputType.TYPE_TEXT_FLAG_AUTO_CORRECT) {
            return true;
        }
        return false;
    }
    [autocorrectProperty.setNative](value) {
        let inputType = this.nativeTextViewProtected.getInputType();
        switch (value) {
            case true:
                inputType = inputType | android.text.InputType.TYPE_TEXT_FLAG_AUTO_COMPLETE;
                inputType = inputType | android.text.InputType.TYPE_TEXT_FLAG_AUTO_CORRECT;
                inputType = inputType & ~android.text.InputType.TYPE_TEXT_FLAG_NO_SUGGESTIONS;
                break;
            case false:
                inputType = inputType & ~android.text.InputType.TYPE_TEXT_FLAG_AUTO_COMPLETE;
                inputType = inputType & ~android.text.InputType.TYPE_TEXT_FLAG_AUTO_CORRECT;
                inputType = inputType | android.text.InputType.TYPE_TEXT_FLAG_NO_SUGGESTIONS;
                break;
            default:
                // We can't do anything.
                break;
        }
        this._setInputType(inputType);
    }
    [hintProperty.getDefault]() {
        return this.nativeTextViewProtected.getHint();
    }
    [hintProperty.setNative](value) {
        const text = value === null || value === undefined ? null : value.toString();
        this.nativeTextViewProtected.setHint(text);
    }
    [placeholderColorProperty.getDefault]() {
        return this.nativeTextViewProtected.getHintTextColors();
    }
    [placeholderColorProperty.setNative](value) {
        const color = value instanceof Color ? value.android : value;
        this.nativeTextViewProtected.setHintTextColor(color);
    }
    [textTransformProperty.setNative](value) {
        //
    }
    [maxLengthProperty.setNative](value) {
        if (value === Number.POSITIVE_INFINITY) {
            this.nativeTextViewProtected.setFilters([]);
        }
        else {
            const lengthFilter = new android.text.InputFilter.LengthFilter(value);
            const filters = this.nativeTextViewProtected.getFilters();
            const newFilters = [];
            // retain existing filters
            for (let i = 0; i < filters.length; i++) {
                const filter = filters[i];
                if (!(filter instanceof android.text.InputFilter.LengthFilter)) {
                    newFilters.push(filter);
                }
            }
            newFilters.push(lengthFilter);
            this.nativeTextViewProtected.setFilters(newFilters);
        }
    }
}
//# sourceMappingURL=index.android.js.map