'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var isBrowser$1 = function () {
    return typeof window !== "undefined";
};
var emptyFunction = function () { };
var setIfNotEqual = function (variable, value) {
};
var tryJSONparse = function (obj) {
    try {
        return JSON.parse(obj);
    }
    catch (_a) {
        return obj;
    }
};
var tryJSONStringify = function (obj) {
    if (typeof obj === "string")
        return obj;
    try {
        return JSON.stringify(obj);
    }
    catch (_a) {
        return obj;
    }
};
var transform = function (value, actualRange, targetRange) {
    var minActualRange = actualRange[0], maxActualRange = actualRange[1];
    var minTargetRange = targetRange[0], maxTargetRange = targetRange[1];
    if (value >= maxActualRange)
        return maxTargetRange;
    if (value <= minActualRange)
        return minTargetRange;
    var tranformedValue = ((value - minActualRange) / (maxActualRange - minActualRange)) *
        (maxTargetRange - minTargetRange) +
        minTargetRange;
    return tranformedValue;
};
var memoComparer = function (prevProps, nextProps, props) {
    if (Object.keys(prevProps).length !== Object.keys(nextProps).length)
        return false;
    var isEqual = true;
    props.forEach(function (prop) {
        if (isEqual) {
            isEqual = prevProps[prop] === nextProps[prop];
        }
    });
    return isEqual;
};
var isPointInRect = function (point, rect, includeBorders) {
    if (includeBorders === void 0) { includeBorders = false; }
    var x = point.x, y = point.y;
    var top = rect.top, right = rect.right, bottom = rect.bottom, left = rect.left;
    if (top === bottom || right === left)
        return false;
    if (includeBorders)
        return x >= left && x <= right && y >= top && y <= bottom;
    return x > left && x < right && y > top && y < bottom;
};
var isInRange = function (range, num, includeFrom, includeTo) {
    if (includeFrom === void 0) { includeFrom = true; }
    if (includeTo === void 0) { includeTo = true; }
    var from = range[0], to = range[1];
    var checkFrom = includeFrom ? num >= from : num > from;
    var checkTo = includeTo ? num <= to : num < to;
    return checkFrom && checkTo;
};
var deepCompare = function (obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
};
var getIsWebkit = function () {
    var UA = navigator.userAgent;
    return (/\b(iPad|iPhone|iPod)\b/.test(UA) && /WebKit/.test(UA) && !/Edge/.test(UA) && !window.MSStream);
};
var isEqualJSON = function (json1, json2) {
    if (json1 === void 0) { json1 = {}; }
    if (json2 === void 0) { json2 = {}; }
    return JSON.stringify(json1) === JSON.stringify(json2);
};
var deepCopy = function (json) {
    if (json === void 0) { json = {}; }
    return JSON.parse(JSON.stringify(json));
};
var combineReducers = function (reducers) {
    return function (state, action) {
        if (state === void 0) { state = {}; }
        var newState = {};
        for (var key in reducers) {
            newState[key] = reducers[key](state[key], action);
        }
        return newState;
    };
};
var transformObj = function (obj) {
    return Object.keys(obj).reduce(function (acc, key) {
        if (key.indexOf('.') >= 0) {
            var _a = key.split('.'), parentKey = _a[0], childKey = _a[1];
            acc[parentKey] = acc[parentKey] || {};
            acc[parentKey][childKey] = obj[key];
        }
        else {
            acc[key] = obj[key];
        }
        return acc;
    }, {});
};
var JSONToArray = function (json, key, valueKey) {
    if (json === void 0) { json = {}; }
    return Object.keys(json).map(function (_key) {
        var _a, _b;
        return (__assign(__assign({}, (valueKey ? (_a = {}, _a[valueKey] = json[_key], _a) : json[_key])), (_b = {}, _b[key] = _key, _b)));
    });
};
var EnumToArray = function (enums, valueKey, descriptionKey) {
    return Object.keys(enums).map(function (_key) {
        var _a;
        return (_a = {},
            _a[valueKey] = _key,
            _a[descriptionKey] = enums[_key],
            _a);
    });
};
var download = function (newBlob, type) {
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
    }
    var url = window.URL || window.webkitURL || window;
    var dataURL = url.createObjectURL(newBlob);
    downloadByDataURL(dataURL, type);
};
var downloadQRCodeById = function (id) {
    var QRCodeSVGElement = document.getElementById(id);
    downloadQRCodeBySVGElement(QRCodeSVGElement);
};
var downloadQRCodeBySVGElement = function (QRCodeSVGElement, type, size) {
    if (type === void 0) { type = 'png'; }
    var _width = size.width, _height = size.height;
    var width = _width || 300, height = _height || 300;
    var clonedQRCodeSVGElement = QRCodeSVGElement.cloneNode(true);
    var outerHTML = clonedQRCodeSVGElement.outerHTML;
    var blob = new Blob([outerHTML], { type: 'image/svg+xml;charset=utf-8' });
    var URL = window.URL || window.webkitURL || window;
    var blobURL = URL.createObjectURL(blob);
    if (type === "svg") {
        downloadByDataURL(blobURL, "svg");
        return;
    }
    var img = new Image();
    img.width = width;
    img.height = height;
    var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext('2d');
    img.onload = function () {
        // draw image in canvas starting left-0 , top - 0
        context.drawImage(img, 0, 0, width, height);
        var dataURL = canvas.toDataURL("image/png");
        //return;
        downloadByDataURL(dataURL, "png");
        document.body.removeChild(canvas);
    };
    img.src = blobURL;
};
var downloadByDataURL = function (dataURL, type) {
    var link = document.createElement('a');
    var n = dataURL.lastIndexOf('/');
    //debugger;
    var filname = dataURL.substring(n + 1, dataURL.length);
    link.href = dataURL;
    link.target = '_blank_';
    if (type) {
        link.download = filname + "." + type;
    }
    else {
        link.download = filname + ".jpg";
    }
    link.click();
    var URL = window.URL || window.webkitURL || window;
    setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
        URL.revokeObjectURL(dataURL);
    }, 100);
};
var bytesToSize = function (bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0)
        return '0 Byte';
    var i = parseInt("" + Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
};
var sum = function (array) {
    if (array === void 0) { array = []; }
    if (!array.length)
        return 0;
    if (array.length === 1)
        return array[0];
    return array.reduce(function (i1, i2) { return i1 + i2; });
};
var ArrayToJSON = function (array, keyName, valueName) {
    var json = {};
    array.forEach(function (i) {
        json[i[keyName]] = valueName ? i[valueName] : i;
    });
    return json;
};
var isJSONEmpty = function (json) {
    if (json === void 0) { json = {}; }
    return !Object.keys(json).length;
};
var isArrayEmpty = function (array) {
    if (array === void 0) { array = []; }
    return !array.length;
};
var guid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
var getAddressText = function (address) {
    var province = address.province, district = address.district;
    var provinceName = (province || {}).name;
    var districtName = (district || {}).name;
    return (provinceName || "") + " - " + (districtName || "");
};
var getUriFromImageObject = function (host, image) {
    if (image === void 0) { image = { base64Data: undefined, fileType: undefined, id: undefined }; }
    if (image.base64Data) {
        return "data:" + image.fileType + ";base64," + image.base64Data;
    }
    else if (image.id) {
        return host + "/attachments/" + image.id;
    }
    else {
        return undefined;
    }
};
var updateObjectByName = function (oldObject, name, value) {
    if (oldObject === void 0) { oldObject = {}; }
    var newObject = __assign({}, deepCopy(oldObject));
    newObject[name] = value;
    return transformObj(newObject);
};
var getFirstLetters = function (string) {
    if (string === void 0) { string = ""; }
    return string.split(" ").map(function (i) { return i[0]; }).join("");
};
var hashCode = function (str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
};
var generatedColorFromString = function (_i) {
    var i = hashCode(_i);
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();
    return "#" + "00000".substring(0, 6 - c.length) + c;
};
var destructArray = function (array) {
    if (array === void 0) { array = []; }
    var result = [];
    array.forEach(function (i) {
        result.push.apply(result, i);
    });
    return result;
};
var takeUndefinedAsTrue = function (parameter) {
    return parameter === undefined ? true : parameter;
};
var applicationJSONHeader = { "Content-Type": "application/json" };
var iFetch = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var url, _body, _a, stringify, onSuccess, onError, _b, responseContentType, _c, method, rest, body, httpResponse, _d, responseJson, responseBlob, responseFormData, responseText, responseArrayBuffer, error_1;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                url = payload.url, _body = payload.body, _a = payload.stringify, stringify = _a === void 0 ? true : _a, onSuccess = payload.onSuccess, onError = payload.onError, _b = payload.responseContentType, responseContentType = _b === void 0 ? "JSON" : _b, _c = payload.method, method = _c === void 0 ? "GET" : _c, rest = __rest(payload, ["url", "body", "stringify", "onSuccess", "onError", "responseContentType", "method"]);
                if (url === undefined) {
                    throw new Error("No URL Found in the request");
                }
                body = stringify ? JSON.stringify(_body) : _body;
                _e.label = 1;
            case 1:
                _e.trys.push([1, 15, , 16]);
                return [4 /*yield*/, fetch(url, __assign({ body: body,
                        method: method }, rest))];
            case 2:
                httpResponse = _e.sent();
                _d = responseContentType;
                switch (_d) {
                    case "JSON": return [3 /*break*/, 3];
                    case "BLOB": return [3 /*break*/, 5];
                    case "FORM-DATA": return [3 /*break*/, 7];
                    case "TEXT": return [3 /*break*/, 9];
                    case "ARRAY-BUFFER": return [3 /*break*/, 11];
                }
                return [3 /*break*/, 13];
            case 3: return [4 /*yield*/, httpResponse.json()];
            case 4:
                responseJson = _e.sent();
                onSuccess(responseJson);
                return [3 /*break*/, 14];
            case 5: return [4 /*yield*/, httpResponse.blob()];
            case 6:
                responseBlob = _e.sent();
                onSuccess(responseBlob);
                return [3 /*break*/, 14];
            case 7: return [4 /*yield*/, httpResponse.formData()];
            case 8:
                responseFormData = _e.sent();
                onSuccess(responseFormData);
                return [3 /*break*/, 14];
            case 9: return [4 /*yield*/, httpResponse.text()];
            case 10:
                responseText = _e.sent();
                onSuccess(responseText);
                return [3 /*break*/, 14];
            case 11: return [4 /*yield*/, httpResponse.arrayBuffer()];
            case 12:
                responseArrayBuffer = _e.sent();
                onSuccess(responseArrayBuffer);
                return [3 /*break*/, 14];
            case 13:
                onSuccess(httpResponse);
                _e.label = 14;
            case 14: return [2 /*return*/, httpResponse];
            case 15:
                error_1 = _e.sent();
                onError(error_1);
                return [3 /*break*/, 16];
            case 16: return [2 /*return*/];
        }
    });
}); };
var changeColor = function (color, amt) {
    var usePound = false;
    var col = color + "";
    if (col[0] === "#") {
        col = col.slice(1);
        usePound = true;
    }
    var num = parseInt(col, 16);
    var r = (num >> 16) + amt;
    if (r > 255) {
        r = 255;
    }
    else if (r < 0) {
        r = 0;
    }
    var b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255) {
        b = 255;
    }
    else if (b < 0) {
        b = 0;
    }
    var g = (num & 0x0000FF) + amt;
    if (g > 255) {
        g = 255;
    }
    else if (g < 0) {
        g = 0;
    }
    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
};
var takeIf = function (condition, value, defaultValue) {
    if (defaultValue === void 0) { defaultValue = undefined; }
    if (condition) {
        return value;
    }
    else {
        return defaultValue;
    }
};
var spliceString = function (string, startCount, deleteCount) {
    return string.split("").splice(startCount, deleteCount).join("");
};
var isNullOrUndefined = function (item) {
    return item === null || item === undefined;
};
var coalasce = function (first, second) {
    if (isNullOrUndefined(first))
        return second;
    return first;
};
var numberShouldStartWithZero = function (number) {
    return parseInt(number) < 10 ? "0" + number : number;
};
var getTodayYear = function () {
    return new Date().getFullYear();
};
var getTodayMonth = function () {
    return new Date().getMonth() + 1;
};
var monthsNumberArray = Array(12).fill(0).map(function (_, index) { return ((index) % 12) + 1; });
var isArrayContains = function (array, value, key) {
    return !!array.filter(function (i) { return i[key] === value; }).length;
};
var JSONArrayIndexOf = function (array, value, key) {
    return array.map(function (i) { return i[key]; }).indexOf(value);
};
var cos = function (degree) {
    var value = Math.cos((degree * Math.PI) / 180);
    return parseFloat(value.toFixed(2));
};
var insertOrUpdateElementInArrayByKey = function (array, idKey, id, item) {
    var idKeys = array.map(function (i) { return i[idKey]; });
    var indexOfElement = idKeys.indexOf(id);
    if (indexOfElement > -1)
        array[indexOfElement] = item;
    else
        array.push(item);
    return array;
};
var deleteElementFromArrayByKey = function (array, idKey, id) {
    var idKeys = array.map(function (i) { return i[idKey]; });
    var indexOfElement = idKeys.indexOf(id);
    if (indexOfElement > -1)
        array.splice(indexOfElement, 1);
    return array;
};
var findLastIndex = function (array, predicate) {
    if (!array)
        return -1;
    var index = array.length - 1;
    if (!predicate)
        return index;
    for (var i = index; i > -1; i--) {
        if (predicate(array[i])) {
            return i;
        }
    }
    return -1;
};

var utils = /*#__PURE__*/Object.freeze({
    __proto__: null,
    isBrowser: isBrowser$1,
    emptyFunction: emptyFunction,
    setIfNotEqual: setIfNotEqual,
    tryJSONparse: tryJSONparse,
    tryJSONStringify: tryJSONStringify,
    transform: transform,
    memoComparer: memoComparer,
    isPointInRect: isPointInRect,
    isInRange: isInRange,
    deepCompare: deepCompare,
    getIsWebkit: getIsWebkit,
    isEqualJSON: isEqualJSON,
    deepCopy: deepCopy,
    combineReducers: combineReducers,
    transformObj: transformObj,
    JSONToArray: JSONToArray,
    EnumToArray: EnumToArray,
    download: download,
    downloadQRCodeById: downloadQRCodeById,
    downloadQRCodeBySVGElement: downloadQRCodeBySVGElement,
    downloadByDataURL: downloadByDataURL,
    bytesToSize: bytesToSize,
    sum: sum,
    ArrayToJSON: ArrayToJSON,
    isJSONEmpty: isJSONEmpty,
    isArrayEmpty: isArrayEmpty,
    guid: guid,
    getAddressText: getAddressText,
    getUriFromImageObject: getUriFromImageObject,
    updateObjectByName: updateObjectByName,
    getFirstLetters: getFirstLetters,
    hashCode: hashCode,
    generatedColorFromString: generatedColorFromString,
    destructArray: destructArray,
    takeUndefinedAsTrue: takeUndefinedAsTrue,
    applicationJSONHeader: applicationJSONHeader,
    iFetch: iFetch,
    changeColor: changeColor,
    takeIf: takeIf,
    spliceString: spliceString,
    isNullOrUndefined: isNullOrUndefined,
    coalasce: coalasce,
    numberShouldStartWithZero: numberShouldStartWithZero,
    getTodayYear: getTodayYear,
    getTodayMonth: getTodayMonth,
    monthsNumberArray: monthsNumberArray,
    isArrayContains: isArrayContains,
    JSONArrayIndexOf: JSONArrayIndexOf,
    cos: cos,
    insertOrUpdateElementInArrayByKey: insertOrUpdateElementInArrayByKey,
    deleteElementFromArrayByKey: deleteElementFromArrayByKey,
    findLastIndex: findLastIndex
});

var useUtils = function () {
    return utils;
};

var LocalStorageContext = react.createContext({});
var LocalStorageProvider = function (_a) {
    var _b = _a.withState, withState = _b === void 0 ? true : _b, onChange = _a.onChange, children = _a.children;
    var _c = useUtils(), tryJSONparse = _c.tryJSONparse, tryJSONStringify = _c.tryJSONStringify;
    var getLocalStorage = react.useCallback(function () {
        var localStorageKeys = Object.keys(window.localStorage);
        var localStorage = {};
        localStorageKeys.forEach(function (key) {
            var value = window.localStorage[key];
            localStorage[key] = tryJSONparse(value);
        });
        return localStorage;
    }, []);
    var _d = react.useState(getLocalStorage()), localStorage = _d[0], setLocalStorage = _d[1];
    var setItem = react.useCallback(function (_a) {
        var key = _a.key, _value = _a.value;
        if (!key)
            throw new Error("No key passed");
        var value = tryJSONparse(_value);
        window.localStorage.setItem(key, tryJSONStringify(_value));
        if (withState) {
            setLocalStorage(function (old) {
                var _a;
                var newLocalStorage = __assign(__assign({}, old), (_a = {}, _a[key] = value, _a));
                if (onChange)
                    onChange(newLocalStorage);
                return newLocalStorage;
            });
        }
        else {
            onChange(getLocalStorage());
        }
    }, [onChange, withState, getLocalStorage]);
    var getItem = react.useCallback(function (key) {
        if (!key)
            throw new Error("No key passed");
        if (withState)
            return localStorage[key];
        else
            return getLocalStorage()[key];
    }, [localStorage, withState, getLocalStorage]);
    var removeItem = react.useCallback(function (key) {
        if (!key)
            throw new Error("No key passed");
        window.localStorage.removeItem(key);
        if (withState)
            setLocalStorage(function (old) {
                var newLocalStorage = __assign({}, old);
                delete newLocalStorage[key];
                if (onChange)
                    onChange(newLocalStorage);
                return newLocalStorage;
            });
        else if (onChange)
            onChange(getLocalStorage());
    }, [onChange, withState, getLocalStorage]);
    return (jsxRuntime.jsx(LocalStorageContext.Provider, __assign({ value: {
            localStorage: localStorage,
            getItem: getItem,
            setItem: setItem,
            removeItem: removeItem
        } }, { children: children }), void 0));
};
var useLocalStorageContext = function () {
    var context = react.useContext(LocalStorageContext);
    if (context === undefined) {
        throw new Error('useLocalStorageContext must be used within an LocalStorageContext.Provider');
    }
    return context;
};

var useLocalStorage = function (key) {
    var _a = useLocalStorageContext(), _getItem = _a.getItem, _setItem = _a.setItem, _removeItem = _a.removeItem, localStorage = _a.localStorage;
    var getItem = react.useCallback(function (_key) {
        if (_key === void 0) { _key = undefined; }
        return _getItem(key || _key);
    }, [_getItem]);
    var setItem = react.useCallback(function (value) {
        return _setItem({ key: key, value: value });
    }, [_setItem]);
    var setItemWithKey = react.useCallback(function (_key, value) {
        return _setItem({ key: key || _key, value: value });
    }, [_setItem]);
    var removeItem = react.useCallback(function (_key) {
        if (_key === void 0) { _key = undefined; }
        return _removeItem(key || _key);
    }, [_removeItem]);
    return { getItem: getItem, setItem: setItem, removeItem: removeItem, setItemWithKey: setItemWithKey, localStorage: localStorage };
};

var AuthContext = react.createContext({});
var AuthProvider = function (_a) {
    var _b = _a.authTokenKeyName, authTokenKeyName = _b === void 0 ? 'token' : _b, _c = _a.localStorageTokenKeyName, localStorageTokenKeyName = _c === void 0 ? "token" : _c, _user = _a.user, _onLogin = _a.onLogin, _onLogout = _a.onLogout, initialCheckToken = _a.initialCheckToken, children = _a.children;
    var _d = react.useState(_user), user = _d[0], setUser = _d[1];
    var _e = useLocalStorage(localStorageTokenKeyName), getItem = _e.getItem, removeItem = _e.removeItem, setItem = _e.setItem;
    var onLogin = react.useCallback(function (info) {
        var oldToken = getItem();
        var newToken = info[authTokenKeyName];
        if (!oldToken || !!newToken) {
            setItem(newToken);
        }
        var newUser = __assign({ token: newToken || oldToken }, (info || {}));
        setUser(__assign(__assign({}, newUser), { isLoggedIn: true }));
        if (_onLogin)
            _onLogin(info);
    }, [_onLogin, authTokenKeyName]);
    var onLogout = react.useCallback(function () {
        setUser({
            isLoggedIn: false,
        });
        removeItem();
        if (_onLogout)
            _onLogout();
    }, [_onLogout]);
    var setToken = react.useCallback(function (token) {
        if (token === undefined) {
            setUser(function (old) { return (__assign(__assign({}, old), { isLoggedIn: false, token: undefined })); });
            removeItem();
        }
        else {
            setUser(function (old) { return (__assign(__assign({}, old), { token: token })); });
            setItem(token);
        }
    }, []);
    react.useEffect(function () {
        if (initialCheckToken) {
            var oldToken = getItem();
            if (oldToken) {
                setToken(oldToken);
            }
        }
    }, [initialCheckToken, setToken]);
    return (jsxRuntime.jsx(AuthContext.Provider, __assign({ value: {
            localStorageTokenKeyName: localStorageTokenKeyName,
            user: user,
            setUser: setUser,
            setToken: setToken,
            onLogin: onLogin,
            onLogout: onLogout
        } }, { children: children }), void 0));
};
var useAuthContext = function () {
    var context = react.useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthContext.Provider');
    }
    return context;
};
AuthProvider.defaultProps = {
    localStorageTokenKeyName: "token",
    authTokenKeyName: "token",
    user: { isLoggedIn: false },
    initialCheckToken: true,
};

var useAuth = function () {
    var _a = useAuthContext(), onLogout = _a.onLogout, onLogin = _a.onLogin, setToken = _a.setToken, setUser = _a.setUser, contextUser = _a.user;
    var isLoggedIn = contextUser.isLoggedIn, user = __rest(contextUser, ["isLoggedIn"]);
    var token = user.token;
    var logout = react.useCallback(function () {
        onLogout();
    }, [onLogout]);
    var login = react.useCallback(function (data) {
        onLogin(data);
    }, [onLogin]);
    return {
        setToken: setToken,
        login: login,
        logout: logout,
        setUser: setUser,
        user: contextUser,
        isLoggedIn: isLoggedIn,
        token: token
    };
};

var FetchContext = react.createContext({});
var FetchProvider = function (_a) {
    var children = _a.children, _b = _a.getAuthorizationHeader, getAuthorizationHeader = _b === void 0 ? function (token) { return token ? "Bearer " + token : ""; } : _b, rest = __rest(_a, ["children", "getAuthorizationHeader"]);
    return (jsxRuntime.jsx(FetchContext.Provider, __assign({ value: __assign({ getAuthorizationHeader: getAuthorizationHeader }, rest) }, { children: children }), void 0));
};
var useFetchContext = function () {
    var context = react.useContext(FetchContext);
    if (context === undefined) {
        throw new Error('useFetchContext must be used within an FetchContext.Provider');
    }
    return context;
};

var useFetch = function (params) {
    if (params === void 0) { params = { abortOnUnmount: true }; }
    var abortOnUnmount = params.abortOnUnmount;
    var iFetch = useUtils().iFetch;
    var _a = useFetchContext(), contextURL = _a.url, contextOnSuccess = _a.onSuccess, contextOnError = _a.onError, onRequest = _a.onRequest, isError = _a.isError, isSuccess = _a.isSuccess, credentials = _a.credentials, transformResponse = _a.transformResponse, getAuthorizationHeader = _a.getAuthorizationHeader;
    var token = useAuth().token;
    var _b = react.useState({
        success: undefined,
        firstTimeFetched: false,
        fetched: false,
        fetching: false,
        response: {}
    }), data = _b[0], setData = _b[1];
    var abortController = react.useMemo(function () { return new AbortController(); }, []);
    var onSuccess = react.useCallback(function (_a) {
        var payloadOnSuccess = _a.onSuccess, response = _a.response;
        if (transformResponse)
            response = transformResponse(response);
        if (contextOnSuccess)
            contextOnSuccess(response);
        if (payloadOnSuccess)
            payloadOnSuccess(response);
        setData(function (oldData) { return (__assign(__assign({}, oldData), { success: true, response: response, fetching: false, fetched: true, firstTimeFetched: true })); });
    }, [contextOnSuccess, transformResponse]);
    var onError = react.useCallback(function (_a) {
        var payloadOnError = _a.onError, response = _a.response;
        if (transformResponse)
            response = transformResponse(response);
        if (contextOnError)
            contextOnError(response);
        if (payloadOnError)
            payloadOnError(response);
        setData(function (oldData) { return (__assign(__assign({}, oldData), { success: false, response: response, fetching: false, fetched: true, firstTimeFetched: true })); });
    }, [contextOnError, transformResponse]);
    var request = react.useCallback(function (payload) {
        if (payload === void 0) { payload = {}; }
        var _url = payload.url, endpoint = payload.endpoint, payloadOnSuccess = payload.onSuccess, payloadOnError = payload.onError, payloadHeaders = payload.headers, _credentials = payload.credentials, rest = __rest(payload, ["url", "endpoint", "onSuccess", "onError", "headers", "credentials"]);
        var url = "" + (_url || contextURL) + endpoint;
        if (onRequest)
            onRequest(__assign(__assign({}, payload), { url: url }));
        setData(function (old) { return (__assign(__assign({}, old), { fetching: true, fetched: false })); });
        var authorizationHeader = getAuthorizationHeader(token);
        var headers = __assign({ "Authorization": authorizationHeader }, (payloadHeaders || {}));
        if (!headers["Authorization"])
            delete headers["Authorization"];
        return iFetch(__assign(__assign({}, rest), { url: url,
            headers: headers, credentials: _credentials || credentials, onSuccess: function (response) {
                if (!isSuccess || isSuccess(response)) {
                    onSuccess({
                        onSuccess: payloadOnSuccess,
                        response: response
                    });
                }
                else {
                    onError({
                        onError: payloadOnError,
                        response: response,
                    });
                }
            }, onError: function (response) {
                if (!isError || isError(response)) {
                    onError({
                        onError: payloadOnError,
                        response: response,
                    });
                }
                else {
                    onSuccess({
                        onSuccess: payloadOnSuccess,
                        response: response
                    });
                }
            }, signal: abortController.signal }));
    }, [
        isError,
        isSuccess,
        credentials,
        getAuthorizationHeader,
        token,
        contextURL,
        onSuccess,
        onError,
        setData,
        onRequest,
        abortController.signal
    ]);
    react.useEffect(function () {
        return function () {
            if (abortOnUnmount)
                abortController.abort();
        };
    }, [abortController.abort, abortOnUnmount]);
    return __assign({ request: request }, data);
};

var useGet = function (params) {
    if (params === void 0) { params = { abortOnUnmount: true }; }
    var _a = useFetch(params), request = _a.request, rest = __rest(_a, ["request"]);
    var getRequest = react.useCallback(function (payload) {
        if (payload === void 0) { payload = {}; }
        return request(__assign(__assign({}, payload), { method: "GET" }));
    }, [request]);
    return __assign({ request: getRequest }, rest);
};

var usePost = function (params) {
    if (params === void 0) { params = { abortOnUnmount: true }; }
    var _a = useFetch(params), request = _a.request, rest = __rest(_a, ["request"]);
    var applicationJSONHeader = useUtils().applicationJSONHeader;
    var postRequest = react.useCallback(function (payload) {
        if (payload === void 0) { payload = {}; }
        return request(__assign(__assign({ headers: applicationJSONHeader }, payload), { method: "POST" }));
    }, [request]);
    return __assign({ request: postRequest }, rest);
};

var usePut = function (params) {
    if (params === void 0) { params = { abortOnUnmount: true }; }
    var _a = useFetch(params), request = _a.request, rest = __rest(_a, ["request"]);
    var applicationJSONHeader = useUtils().applicationJSONHeader;
    var putRequest = react.useCallback(function (payload) {
        if (payload === void 0) { payload = {}; }
        return request(__assign(__assign({ headers: applicationJSONHeader }, payload), { method: "PUT" }));
    }, [request]);
    return __assign({ request: putRequest }, rest);
};

var useDelete = function (params) {
    if (params === void 0) { params = { abortOnUnmount: true }; }
    var _a = useFetch(params), request = _a.request, rest = __rest(_a, ["request"]);
    var applicationJSONHeader = useUtils().applicationJSONHeader;
    var deleteRequest = react.useCallback(function (payload) {
        if (payload === void 0) { payload = {}; }
        return request(__assign(__assign({ headers: applicationJSONHeader }, payload), { method: "DELETE" }));
    }, [request]);
    return __assign({ request: deleteRequest }, rest);
};

var DimensionsContext = react.createContext({});
var DimensionsProvider = function (_a) {
    var _b = _a.widths, widths = _b === void 0 ? [576, 768, 992, 1200, 1600, 1800] : _b, _c = _a.sizes, sizes = _c === void 0 ? ["xs", "sm", "md", "lg", "xl", "xxl"] : _c, children = _a.children;
    return (jsxRuntime.jsx(DimensionsContext.Provider, __assign({ value: { sizes: sizes, widths: widths } }, { children: children }), void 0));
};
var useDimensionsContext = function () {
    var context = react.useContext(DimensionsContext);
    if (context === undefined) {
        throw new Error('useDimensionsContext must be used within an DimensionsContext.Provider');
    }
    return context;
};

var defaultBreakPoints = ["xs", "sm", "md", "lg", "xl", "xxl"];
var defaultPayload = { breakpoints: defaultBreakPoints, watchWindowSize: false };
var useDimensions = function (payload) {
    if (payload === void 0) { payload = defaultPayload; }
    var breakpoints = react.useMemo(function () { return payload.breakpoints || defaultBreakPoints; }, [payload.breakpoints]);
    var watchWindowSize = react.useMemo(function () { return payload.watchWindowSize; }, [payload.watchWindowSize]);
    var _a = useDimensionsContext(), sizes = _a.sizes, widths = _a.widths;
    var _b = useUtils(), findLastIndex = _b.findLastIndex, takeIf = _b.takeIf, isEqualJSON = _b.isEqualJSON, isBrowser = _b.isBrowser;
    var getSizeOfWindowWidth = react.useCallback(function (width) {
        var indexOfWidth = findLastIndex(widths, function (c) { return width >= c; });
        return sizes[takeIf(indexOfWidth > -1, indexOfWidth, 0)];
    }, [findLastIndex, widths, sizes, takeIf]);
    var initialSize = react.useMemo(function () { return getSizeOfWindowWidth(isBrowser() ? window.innerWidth : 0); }, [getSizeOfWindowWidth]);
    var _c = react.useState(isBrowser() ? {
        width: window.innerWidth,
        height: window.innerHeight,
        size: initialSize
    } : {
        width: 0, height: 0, size: 'xxl'
    }), dimensions = _c[0], setDimensions = _c[1];
    var size = dimensions.size;
    var updateDimensions = react.useCallback(function (width, height) {
        var newSize = getSizeOfWindowWidth(width);
        if (!breakpoints.length || breakpoints.indexOf(newSize) > -1) {
            setDimensions(function (oldDimensions) {
                var newDimensions = __assign({}, oldDimensions);
                if (watchWindowSize) {
                    newDimensions.width = width;
                    newDimensions.height = height;
                }
                newDimensions.size = newSize;
                if (isEqualJSON(oldDimensions, newDimensions)) {
                    return oldDimensions;
                }
                return newDimensions;
            });
        }
    }, [breakpoints, getSizeOfWindowWidth, watchWindowSize, isEqualJSON]);
    var getCurrentAndRequestedSizeIndex = react.useCallback(function (_size) {
        var indexOfCurrentSize = sizes.indexOf(size);
        var indexOfSize = sizes.indexOf(_size);
        return [indexOfCurrentSize, indexOfSize];
    }, [sizes, size]);
    var isSizeEqualOrLargerThan = react.useCallback(function (_size) {
        var _a = getCurrentAndRequestedSizeIndex(_size), indexOfCurrentSize = _a[0], indexOfSize = _a[1];
        return indexOfCurrentSize >= indexOfSize;
    }, [getCurrentAndRequestedSizeIndex]);
    var isSizeLargerThan = react.useCallback(function (_size) {
        var _a = getCurrentAndRequestedSizeIndex(_size), indexOfCurrentSize = _a[0], indexOfSize = _a[1];
        return indexOfCurrentSize > indexOfSize;
    }, [getCurrentAndRequestedSizeIndex]);
    var isSizeEqualTo = react.useCallback(function (_size) {
        var _a = getCurrentAndRequestedSizeIndex(_size), indexOfCurrentSize = _a[0], indexOfSize = _a[1];
        return indexOfCurrentSize === indexOfSize;
    }, [getCurrentAndRequestedSizeIndex]);
    var isSizeSmallerThan = react.useCallback(function (_size) {
        var _a = getCurrentAndRequestedSizeIndex(_size), indexOfCurrentSize = _a[0], indexOfSize = _a[1];
        return indexOfCurrentSize < indexOfSize;
    }, [getCurrentAndRequestedSizeIndex]);
    var isSizeEqualOrSmallerThan = react.useCallback(function (_size) {
        var _a = getCurrentAndRequestedSizeIndex(_size), indexOfCurrentSize = _a[0], indexOfSize = _a[1];
        return indexOfCurrentSize <= indexOfSize;
    }, [getCurrentAndRequestedSizeIndex]);
    var onResize = react.useCallback(function (_a) {
        var target = _a.target;
        var innerWidth = target.innerWidth, innerHeight = target.innerHeight;
        updateDimensions(innerWidth, innerHeight);
    }, [updateDimensions]);
    react.useEffect(function () {
        window.addEventListener("resize", onResize);
        return function () {
            window.removeEventListener('resize', onResize);
        };
    }, [onResize]);
    return __assign(__assign({}, dimensions), { isSizeEqualOrLargerThan: isSizeEqualOrLargerThan,
        isSizeLargerThan: isSizeLargerThan,
        isSizeEqualTo: isSizeEqualTo,
        isSizeSmallerThan: isSizeSmallerThan,
        isSizeEqualOrSmallerThan: isSizeEqualOrSmallerThan });
};

var EventListenerContext = react.createContext({});
var EventListenerProvider = function (_a) {
    var children = _a.children;
    var events = react.useRef({}).current;
    var guid = useUtils().guid;
    var removeEvent = react.useCallback(function (component, name, id) {
        if (!!events)
            if (!!events[component])
                if (!!events[component][name])
                    delete events[component][name][id];
    }, [events]);
    var registerEvent = react.useCallback(function (component, name, event) {
        var newEventId = guid();
        if (!events[component])
            events[component] = {};
        if (!events[component][name])
            events[component][name] = {};
        events[component][name][newEventId] = event;
        return (function () { return removeEvent(component, name, newEventId); });
    }, [events, removeEvent]);
    var registerEventById = react.useCallback(function (component, name, newEventId, event) {
        if (!events[component])
            events[component] = {};
        if (!events[component][name])
            events[component][name] = {};
        events[component][name][newEventId] = event;
        return (function () {
            removeEvent(component, name, newEventId);
        });
    }, [events, removeEvent]);
    var callEvent = react.useCallback(function (component, name, id, parameters) {
        var _events = events[component] || {};
        var registeredEvents = _events[name] || {};
        var registeredEvent = registeredEvents[id];
        if (registeredEvent)
            return registeredEvent(parameters);
    }, [events]);
    var callAllEvents = react.useCallback(function (component, name, parameters, callback) {
        var _events = events[component] || {};
        var registeredEvents = _events[name] || {};
        Object.keys(registeredEvents).forEach(function (key) {
            var result = callEvent(component, name, key, parameters);
            if (callback) {
                callback(result);
            }
        });
    }, [events]);
    return (jsxRuntime.jsx(EventListenerContext.Provider, __assign({ value: {
            removeEvent: removeEvent,
            registerEvent: registerEvent,
            registerEventById: registerEventById,
            callEvent: callEvent,
            callAllEvents: callAllEvents,
        } }, { children: children }), void 0));
};
var useEventListenerContext = function () {
    var context = react.useContext(EventListenerContext);
    if (context === undefined) {
        throw new Error('useEventListenerContext must be used within an EventListenerContext');
    }
    return context;
};

var useEventListener = function (component) {
    var _a = useEventListenerContext(), _registerEvent = _a.registerEvent, _registerEventById = _a.registerEventById, _removeEvent = _a.removeEvent, _callAllEvents = _a.callAllEvents, _callEvent = _a.callEvent;
    var registerEvent = react.useCallback(function (name, event) {
        if (_registerEvent)
            return _registerEvent(component, name, event);
    }, [_registerEvent, component]);
    var registerEventById = react.useCallback(function (name, id, event) {
        if (_registerEventById)
            return _registerEventById(component, name, id, event);
    }, [_registerEventById, component]);
    var removeEvent = react.useCallback(function (name, id) { return _removeEvent && _removeEvent(component, name, id); }, [_removeEvent, component]);
    var callAllEvents = react.useCallback(function (name, parameters, callback) {
        return _callAllEvents && _callAllEvents(component, name, parameters, callback);
    }, [_callAllEvents, component]);
    var callEvent = react.useCallback(function (name, id, parameters) {
        return _callEvent && _callEvent(component, name, id, parameters);
    }, [_callEvent, component]);
    return { registerEvent: registerEvent, registerEventById: registerEventById, removeEvent: removeEvent, callAllEvents: callAllEvents, callEvent: callEvent };
};

var useCounter = function (params) {
    if (params === void 0) { params = { initial: 0 }; }
    var _a = react.useState(params.initial), counter = _a[0], setCounter = _a[1];
    var increase = react.useCallback(function (by) {
        if (by === void 0) { by = 1; }
        setCounter(function (old) { return old + by; });
    }, []);
    var decrease = react.useCallback(function (by) {
        if (by === void 0) { by = 1; }
        setCounter(function (old) { return old - by; });
    }, []);
    var reset = react.useCallback(function () {
        setCounter(params.initial);
    }, [params.initial]);
    return { counter: counter, setCounter: setCounter, reset: reset, increase: increase, decrease: decrease };
};

var LoadingContext = react.createContext({});
var LoadingProvider = function (_a) {
    var children = _a.children;
    var _b = useCounter(), counter = _b.counter, increase = _b.increase, decrease = _b.decrease;
    return (jsxRuntime.jsx(LoadingContext.Provider, __assign({ value: { loading: counter, increase: increase, decrease: decrease } }, { children: children }), void 0));
};
var useLoadingContext = function () {
    var context = react.useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoadingContext must be used within an LoadingContext.Provider');
    }
    return context;
};

var useLoading = function () {
    var _a = useLoadingContext(), loading = _a.loading, increase = _a.increase, decrease = _a.decrease;
    var isLoading = loading > 0;
    return { isLoading: isLoading, increase: increase, decrease: decrease };
};

function createLocale() {
    var LocalesContext = react.createContext({});
    var LocalesProvider = function (_a) {
        var locales = _a.locales, _activeLanguage = _a.activeLanguage, _b = _a.defaultLanguage, defaultLanguage = _b === void 0 ? "en-us" : _b, children = _a.children;
        var isBrowser = useUtils().isBrowser;
        var fallbacked = react.useRef(false);
        var getValidLanguage = react.useCallback(function (activeLanguage) {
            fallbacked.current = false;
            if (locales[activeLanguage]) {
                return activeLanguage;
            }
            else {
                if (isBrowser()) {
                    var language = (navigator.language || "").toLowerCase();
                    var primLanguage = language.substring(0, 2);
                    if (locales[language])
                        return language;
                    else if (locales[primLanguage]) {
                        return locales[primLanguage];
                    }
                    else {
                        return defaultLanguage;
                    }
                }
                else {
                    fallbacked.current = true;
                    return defaultLanguage;
                }
            }
        }, [locales, defaultLanguage]);
        var _c = react.useState(getValidLanguage(_activeLanguage)), activeLanguage = _c[0], setActiveLanguage = _c[1];
        var locale = react.useMemo(function () { return locales[activeLanguage]; }, [locales, activeLanguage]);
        react.useLayoutEffect(function () {
            if (fallbacked.current) {
                setActiveLanguage(getValidLanguage(_activeLanguage));
            }
        }, [getValidLanguage, _activeLanguage, fallbacked.current]);
        return (jsxRuntime.jsx(LocalesContext.Provider, __assign({ value: {
                locale: locale,
                setActiveLanguage: setActiveLanguage,
            } }, { children: children }), void 0));
    };
    var useLocale = function () {
        var context = react.useContext(LocalesContext);
        if (context === undefined) {
            throw new Error('useLocalesContext must be used within an LocalesContext.Provider');
        }
        return context;
    };
    return {
        LocalesProvider: LocalesProvider,
        useLocale: useLocale
    };
}

var SocketContext = react.createContext({});
var SocketProvider = function (_a) {
    var children = _a.children;
    var sockets = react.useRef({});
    var connect = react.useCallback(function (_a) {
        var path = _a.path;
        var socket = sockets.current[path] || {};
        var readyState = socket.readyState;
        if (readyState === WebSocket.OPEN || readyState === WebSocket.CONNECTING)
            return socket;
        var _socket = new WebSocket(path);
        sockets.current[path] = _socket;
        return _socket;
    }, [sockets.current]);
    return (jsxRuntime.jsx(SocketContext.Provider, __assign({ value: { connect: connect } }, { children: children }), void 0));
};
var useSocketContext = function () {
    var context = react.useContext(SocketContext);
    if (context === undefined) {
        throw new Error('useSocketContext must be used within an SocketContext.Provider');
    }
    return context;
};

var useSocket = function (_a) {
    var url = _a.url, _b = _a.wss, wss = _b === void 0 ? false : _b, _c = _a.disconnectOnUnmount, disconnectOnUnmount = _c === void 0 ? true : _c, _d = _a.onOpen, onOpen = _d === void 0 ? emptyFunction : _d, _e = _a.onClose, onClose = _e === void 0 ? emptyFunction : _e, _f = _a.onError, onError = _f === void 0 ? emptyFunction : _f, _g = _a.onMessage, onMessage = _g === void 0 ? emptyFunction : _g;
    var protocol = wss ? "wss" : "ws";
    var connectContext = useSocketContext().connect;
    //@ts-ignore
    var socket = react.useRef({});
    var _h = react.useState({ readyState: 0, lastData: undefined }), socketState = _h[0], setSocketState = _h[1];
    react.useEffect(function () {
        return function () {
            if (disconnectOnUnmount) {
                if (socket.current.close) {
                    socket.current.close(1000, "User disconnected!");
                }
            }
        };
    }, [disconnectOnUnmount]);
    var connect = react.useCallback(function (_a) {
        var _url = _a.url;
        var path = protocol + "://" + (_url || url);
        socket.current = connectContext({ path: path });
        setSocketState(function (old) { return (__assign(__assign({}, old), { readyState: socket.current.readyState })); });
        return socket.current;
    }, [connectContext, protocol, url, disconnectOnUnmount]);
    var onopen = react.useCallback(function (event) {
        setSocketState(function (old) { return (__assign(__assign({}, old), { readyState: WebSocket.OPEN })); });
        onOpen(event);
    }, [onOpen]);
    var onmessage = react.useCallback(function (event) {
        setSocketState(function (old) { return (__assign(__assign({}, old), { lastData: event.data })); });
        var data = event.data;
        try {
            data = JSON.parse(data);
        }
        catch (e) {
            //console.error("JSON PARSE error", e)
        }
        onMessage(event, data);
    }, [onMessage]);
    var onclose = react.useCallback(function (event) {
        setSocketState(function (old) { return (__assign(__assign({}, old), { readyState: WebSocket.CLOSED })); });
        onClose(event);
    }, [onClose]);
    var onerror = react.useCallback(function (event) {
        setSocketState(function (old) { return (__assign(__assign({}, old), { readyState: WebSocket.CLOSING })); });
        onError(event);
    }, [onError]);
    react.useEffect(function () {
        if (socket.current.addEventListener)
            socket.current.addEventListener('open', onopen);
        return function () {
            if (socket.current.removeEventListener)
                socket.current.removeEventListener('open', onopen);
        };
    }, [socket.current, onopen]);
    react.useEffect(function () {
        if (socket.current.addEventListener)
            socket.current.addEventListener('close', onclose);
        return function () {
            if (socket.current.removeEventListener)
                socket.current.removeEventListener('close', onclose);
        };
    }, [socket.current, onclose]);
    react.useEffect(function () {
        if (socket.current.addEventListener)
            socket.current.addEventListener('message', onmessage);
        return function () {
            if (socket.current.removeEventListener)
                socket.current.removeEventListener('message', onmessage);
        };
    }, [socket.current, onmessage]);
    react.useEffect(function () {
        if (socket.current.addEventListener)
            socket.current.addEventListener('error', onerror);
        return function () {
            if (socket.current.removeEventListener)
                socket.current.removeEventListener('error', onerror);
        };
    }, [socket.current, onerror]);
    var sendData = react.useCallback(function (data) {
        socket.current.send(data);
    }, [socket.current]);
    return __assign({ connect: connect, socket: socket.current, sendData: sendData }, socketState);
};

/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */
/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = (function () {
    if (typeof Map !== 'undefined') {
        return Map;
    }
    /**
     * Returns index in provided array that matches the specified key.
     *
     * @param {Array<Array>} arr
     * @param {*} key
     * @returns {number}
     */
    function getIndex(arr, key) {
        var result = -1;
        arr.some(function (entry, index) {
            if (entry[0] === key) {
                result = index;
                return true;
            }
            return false;
        });
        return result;
    }
    return /** @class */ (function () {
        function class_1() {
            this.__entries__ = [];
        }
        Object.defineProperty(class_1.prototype, "size", {
            /**
             * @returns {boolean}
             */
            get: function () {
                return this.__entries__.length;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {*} key
         * @returns {*}
         */
        class_1.prototype.get = function (key) {
            var index = getIndex(this.__entries__, key);
            var entry = this.__entries__[index];
            return entry && entry[1];
        };
        /**
         * @param {*} key
         * @param {*} value
         * @returns {void}
         */
        class_1.prototype.set = function (key, value) {
            var index = getIndex(this.__entries__, key);
            if (~index) {
                this.__entries__[index][1] = value;
            }
            else {
                this.__entries__.push([key, value]);
            }
        };
        /**
         * @param {*} key
         * @returns {void}
         */
        class_1.prototype.delete = function (key) {
            var entries = this.__entries__;
            var index = getIndex(entries, key);
            if (~index) {
                entries.splice(index, 1);
            }
        };
        /**
         * @param {*} key
         * @returns {void}
         */
        class_1.prototype.has = function (key) {
            return !!~getIndex(this.__entries__, key);
        };
        /**
         * @returns {void}
         */
        class_1.prototype.clear = function () {
            this.__entries__.splice(0);
        };
        /**
         * @param {Function} callback
         * @param {*} [ctx=null]
         * @returns {void}
         */
        class_1.prototype.forEach = function (callback, ctx) {
            if (ctx === void 0) { ctx = null; }
            for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
                var entry = _a[_i];
                callback.call(ctx, entry[1], entry[0]);
            }
        };
        return class_1;
    }());
})();

/**
 * Detects whether window and document objects are available in current environment.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

// Returns global object of a current environment.
var global$1 = (function () {
    if (typeof global !== 'undefined' && global.Math === Math) {
        return global;
    }
    if (typeof self !== 'undefined' && self.Math === Math) {
        return self;
    }
    if (typeof window !== 'undefined' && window.Math === Math) {
        return window;
    }
    // eslint-disable-next-line no-new-func
    return Function('return this')();
})();

/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */
var requestAnimationFrame$1 = (function () {
    if (typeof requestAnimationFrame === 'function') {
        // It's required to use a bounded function because IE sometimes throws
        // an "Invalid calling object" error if rAF is invoked without the global
        // object on the left hand side.
        return requestAnimationFrame.bind(global$1);
    }
    return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
})();

// Defines minimum timeout before adding a trailing call.
var trailingTimeout = 2;
/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */
function throttle (callback, delay) {
    var leadingCall = false, trailingCall = false, lastCallTime = 0;
    /**
     * Invokes the original callback function and schedules new invocation if
     * the "proxy" was called during current request.
     *
     * @returns {void}
     */
    function resolvePending() {
        if (leadingCall) {
            leadingCall = false;
            callback();
        }
        if (trailingCall) {
            proxy();
        }
    }
    /**
     * Callback invoked after the specified delay. It will further postpone
     * invocation of the original function delegating it to the
     * requestAnimationFrame.
     *
     * @returns {void}
     */
    function timeoutCallback() {
        requestAnimationFrame$1(resolvePending);
    }
    /**
     * Schedules invocation of the original function.
     *
     * @returns {void}
     */
    function proxy() {
        var timeStamp = Date.now();
        if (leadingCall) {
            // Reject immediately following calls.
            if (timeStamp - lastCallTime < trailingTimeout) {
                return;
            }
            // Schedule new call to be in invoked when the pending one is resolved.
            // This is important for "transitions" which never actually start
            // immediately so there is a chance that we might miss one if change
            // happens amids the pending invocation.
            trailingCall = true;
        }
        else {
            leadingCall = true;
            trailingCall = false;
            setTimeout(timeoutCallback, delay);
        }
        lastCallTime = timeStamp;
    }
    return proxy;
}

// Minimum delay before invoking the update of observers.
var REFRESH_DELAY = 20;
// A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.
var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];
// Check if MutationObserver is available.
var mutationObserverSupported = typeof MutationObserver !== 'undefined';
/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */
var ResizeObserverController = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserverController.
     *
     * @private
     */
    function ResizeObserverController() {
        /**
         * Indicates whether DOM listeners have been added.
         *
         * @private {boolean}
         */
        this.connected_ = false;
        /**
         * Tells that controller has subscribed for Mutation Events.
         *
         * @private {boolean}
         */
        this.mutationEventsAdded_ = false;
        /**
         * Keeps reference to the instance of MutationObserver.
         *
         * @private {MutationObserver}
         */
        this.mutationsObserver_ = null;
        /**
         * A list of connected observers.
         *
         * @private {Array<ResizeObserverSPI>}
         */
        this.observers_ = [];
        this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
        this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
    }
    /**
     * Adds observer to observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be added.
     * @returns {void}
     */
    ResizeObserverController.prototype.addObserver = function (observer) {
        if (!~this.observers_.indexOf(observer)) {
            this.observers_.push(observer);
        }
        // Add listeners if they haven't been added yet.
        if (!this.connected_) {
            this.connect_();
        }
    };
    /**
     * Removes observer from observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be removed.
     * @returns {void}
     */
    ResizeObserverController.prototype.removeObserver = function (observer) {
        var observers = this.observers_;
        var index = observers.indexOf(observer);
        // Remove observer if it's present in registry.
        if (~index) {
            observers.splice(index, 1);
        }
        // Remove listeners if controller has no connected observers.
        if (!observers.length && this.connected_) {
            this.disconnect_();
        }
    };
    /**
     * Invokes the update of observers. It will continue running updates insofar
     * it detects changes.
     *
     * @returns {void}
     */
    ResizeObserverController.prototype.refresh = function () {
        var changesDetected = this.updateObservers_();
        // Continue running updates if changes have been detected as there might
        // be future ones caused by CSS transitions.
        if (changesDetected) {
            this.refresh();
        }
    };
    /**
     * Updates every observer from observers list and notifies them of queued
     * entries.
     *
     * @private
     * @returns {boolean} Returns "true" if any observer has detected changes in
     *      dimensions of it's elements.
     */
    ResizeObserverController.prototype.updateObservers_ = function () {
        // Collect observers that have active observations.
        var activeObservers = this.observers_.filter(function (observer) {
            return observer.gatherActive(), observer.hasActive();
        });
        // Deliver notifications in a separate cycle in order to avoid any
        // collisions between observers, e.g. when multiple instances of
        // ResizeObserver are tracking the same element and the callback of one
        // of them changes content dimensions of the observed target. Sometimes
        // this may result in notifications being blocked for the rest of observers.
        activeObservers.forEach(function (observer) { return observer.broadcastActive(); });
        return activeObservers.length > 0;
    };
    /**
     * Initializes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.connect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already added.
        if (!isBrowser || this.connected_) {
            return;
        }
        // Subscription to the "Transitionend" event is used as a workaround for
        // delayed transitions. This way it's possible to capture at least the
        // final state of an element.
        document.addEventListener('transitionend', this.onTransitionEnd_);
        window.addEventListener('resize', this.refresh);
        if (mutationObserverSupported) {
            this.mutationsObserver_ = new MutationObserver(this.refresh);
            this.mutationsObserver_.observe(document, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
            });
        }
        else {
            document.addEventListener('DOMSubtreeModified', this.refresh);
            this.mutationEventsAdded_ = true;
        }
        this.connected_ = true;
    };
    /**
     * Removes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.disconnect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already removed.
        if (!isBrowser || !this.connected_) {
            return;
        }
        document.removeEventListener('transitionend', this.onTransitionEnd_);
        window.removeEventListener('resize', this.refresh);
        if (this.mutationsObserver_) {
            this.mutationsObserver_.disconnect();
        }
        if (this.mutationEventsAdded_) {
            document.removeEventListener('DOMSubtreeModified', this.refresh);
        }
        this.mutationsObserver_ = null;
        this.mutationEventsAdded_ = false;
        this.connected_ = false;
    };
    /**
     * "Transitionend" event handler.
     *
     * @private
     * @param {TransitionEvent} event
     * @returns {void}
     */
    ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
        var _b = _a.propertyName, propertyName = _b === void 0 ? '' : _b;
        // Detect whether transition may affect dimensions of an element.
        var isReflowProperty = transitionKeys.some(function (key) {
            return !!~propertyName.indexOf(key);
        });
        if (isReflowProperty) {
            this.refresh();
        }
    };
    /**
     * Returns instance of the ResizeObserverController.
     *
     * @returns {ResizeObserverController}
     */
    ResizeObserverController.getInstance = function () {
        if (!this.instance_) {
            this.instance_ = new ResizeObserverController();
        }
        return this.instance_;
    };
    /**
     * Holds reference to the controller's instance.
     *
     * @private {ResizeObserverController}
     */
    ResizeObserverController.instance_ = null;
    return ResizeObserverController;
}());

/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */
var defineConfigurable = (function (target, props) {
    for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
        var key = _a[_i];
        Object.defineProperty(target, key, {
            value: props[key],
            enumerable: false,
            writable: false,
            configurable: true
        });
    }
    return target;
});

/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */
var getWindowOf = (function (target) {
    // Assume that the element is an instance of Node, which means that it
    // has the "ownerDocument" property from which we can retrieve a
    // corresponding global object.
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
    // Return the local global object if it's not possible extract one from
    // provided element.
    return ownerGlobal || global$1;
});

// Placeholder of an empty content rectangle.
var emptyRect = createRectInit(0, 0, 0, 0);
/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */
function toFloat(value) {
    return parseFloat(value) || 0;
}
/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */
function getBordersSize(styles) {
    var positions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        positions[_i - 1] = arguments[_i];
    }
    return positions.reduce(function (size, position) {
        var value = styles['border-' + position + '-width'];
        return size + toFloat(value);
    }, 0);
}
/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */
function getPaddings(styles) {
    var positions = ['top', 'right', 'bottom', 'left'];
    var paddings = {};
    for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
        var position = positions_1[_i];
        var value = styles['padding-' + position];
        paddings[position] = toFloat(value);
    }
    return paddings;
}
/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */
function getSVGContentRect(target) {
    var bbox = target.getBBox();
    return createRectInit(0, 0, bbox.width, bbox.height);
}
/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */
function getHTMLElementContentRect(target) {
    // Client width & height properties can't be
    // used exclusively as they provide rounded values.
    var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
    // By this condition we can catch all non-replaced inline, hidden and
    // detached elements. Though elements with width & height properties less
    // than 0.5 will be discarded as well.
    //
    // Without it we would need to implement separate methods for each of
    // those cases and it's not possible to perform a precise and performance
    // effective test for hidden elements. E.g. even jQuery's ':visible' filter
    // gives wrong results for elements with width & height less than 0.5.
    if (!clientWidth && !clientHeight) {
        return emptyRect;
    }
    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;
    // Computed styles of width & height are being used because they are the
    // only dimensions available to JS that contain non-rounded values. It could
    // be possible to utilize the getBoundingClientRect if only it's data wasn't
    // affected by CSS transformations let alone paddings, borders and scroll bars.
    var width = toFloat(styles.width), height = toFloat(styles.height);
    // Width & height include paddings and borders when the 'border-box' box
    // model is applied (except for IE).
    if (styles.boxSizing === 'border-box') {
        // Following conditions are required to handle Internet Explorer which
        // doesn't include paddings and borders to computed CSS dimensions.
        //
        // We can say that if CSS dimensions + paddings are equal to the "client"
        // properties then it's either IE, and thus we don't need to subtract
        // anything, or an element merely doesn't have paddings/borders styles.
        if (Math.round(width + horizPad) !== clientWidth) {
            width -= getBordersSize(styles, 'left', 'right') + horizPad;
        }
        if (Math.round(height + vertPad) !== clientHeight) {
            height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
        }
    }
    // Following steps can't be applied to the document's root element as its
    // client[Width/Height] properties represent viewport area of the window.
    // Besides, it's as well not necessary as the <html> itself neither has
    // rendered scroll bars nor it can be clipped.
    if (!isDocumentElement(target)) {
        // In some browsers (only in Firefox, actually) CSS width & height
        // include scroll bars size which can be removed at this step as scroll
        // bars are the only difference between rounded dimensions + paddings
        // and "client" properties, though that is not always true in Chrome.
        var vertScrollbar = Math.round(width + horizPad) - clientWidth;
        var horizScrollbar = Math.round(height + vertPad) - clientHeight;
        // Chrome has a rather weird rounding of "client" properties.
        // E.g. for an element with content width of 314.2px it sometimes gives
        // the client width of 315px and for the width of 314.7px it may give
        // 314px. And it doesn't happen all the time. So just ignore this delta
        // as a non-relevant.
        if (Math.abs(vertScrollbar) !== 1) {
            width -= vertScrollbar;
        }
        if (Math.abs(horizScrollbar) !== 1) {
            height -= horizScrollbar;
        }
    }
    return createRectInit(paddings.left, paddings.top, width, height);
}
/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
var isSVGGraphicsElement = (function () {
    // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
    // interface.
    if (typeof SVGGraphicsElement !== 'undefined') {
        return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
    }
    // If it's so, then check that element is at least an instance of the
    // SVGElement and that it has the "getBBox" method.
    // eslint-disable-next-line no-extra-parens
    return function (target) { return (target instanceof getWindowOf(target).SVGElement &&
        typeof target.getBBox === 'function'); };
})();
/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
}
/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */
function getContentRect(target) {
    if (!isBrowser) {
        return emptyRect;
    }
    if (isSVGGraphicsElement(target)) {
        return getSVGContentRect(target);
    }
    return getHTMLElementContentRect(target);
}
/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */
function createReadOnlyRect(_a) {
    var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    // If DOMRectReadOnly is available use it as a prototype for the rectangle.
    var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);
    // Rectangle's properties are not writable and non-enumerable.
    defineConfigurable(rect, {
        x: x, y: y, width: width, height: height,
        top: y,
        right: x + width,
        bottom: height + y,
        left: x
    });
    return rect;
}
/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */
function createRectInit(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
}

/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */
var ResizeObservation = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObservation.
     *
     * @param {Element} target - Element to be observed.
     */
    function ResizeObservation(target) {
        /**
         * Broadcasted width of content rectangle.
         *
         * @type {number}
         */
        this.broadcastWidth = 0;
        /**
         * Broadcasted height of content rectangle.
         *
         * @type {number}
         */
        this.broadcastHeight = 0;
        /**
         * Reference to the last observed content rectangle.
         *
         * @private {DOMRectInit}
         */
        this.contentRect_ = createRectInit(0, 0, 0, 0);
        this.target = target;
    }
    /**
     * Updates content rectangle and tells whether it's width or height properties
     * have changed since the last broadcast.
     *
     * @returns {boolean}
     */
    ResizeObservation.prototype.isActive = function () {
        var rect = getContentRect(this.target);
        this.contentRect_ = rect;
        return (rect.width !== this.broadcastWidth ||
            rect.height !== this.broadcastHeight);
    };
    /**
     * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
     * from the corresponding properties of the last observed content rectangle.
     *
     * @returns {DOMRectInit} Last observed content rectangle.
     */
    ResizeObservation.prototype.broadcastRect = function () {
        var rect = this.contentRect_;
        this.broadcastWidth = rect.width;
        this.broadcastHeight = rect.height;
        return rect;
    };
    return ResizeObservation;
}());

var ResizeObserverEntry = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObserverEntry.
     *
     * @param {Element} target - Element that is being observed.
     * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
     */
    function ResizeObserverEntry(target, rectInit) {
        var contentRect = createReadOnlyRect(rectInit);
        // According to the specification following properties are not writable
        // and are also not enumerable in the native implementation.
        //
        // Property accessors are not being used as they'd require to define a
        // private WeakMap storage which may cause memory leaks in browsers that
        // don't support this type of collections.
        defineConfigurable(this, { target: target, contentRect: contentRect });
    }
    return ResizeObserverEntry;
}());

var ResizeObserverSPI = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback function that is invoked
     *      when one of the observed elements changes it's content dimensions.
     * @param {ResizeObserverController} controller - Controller instance which
     *      is responsible for the updates of observer.
     * @param {ResizeObserver} callbackCtx - Reference to the public
     *      ResizeObserver instance which will be passed to callback function.
     */
    function ResizeObserverSPI(callback, controller, callbackCtx) {
        /**
         * Collection of resize observations that have detected changes in dimensions
         * of elements.
         *
         * @private {Array<ResizeObservation>}
         */
        this.activeObservations_ = [];
        /**
         * Registry of the ResizeObservation instances.
         *
         * @private {Map<Element, ResizeObservation>}
         */
        this.observations_ = new MapShim();
        if (typeof callback !== 'function') {
            throw new TypeError('The callback provided as parameter 1 is not a function.');
        }
        this.callback_ = callback;
        this.controller_ = controller;
        this.callbackCtx_ = callbackCtx;
    }
    /**
     * Starts observing provided element.
     *
     * @param {Element} target - Element to be observed.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.observe = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is already being observed.
        if (observations.has(target)) {
            return;
        }
        observations.set(target, new ResizeObservation(target));
        this.controller_.addObserver(this);
        // Force the update of observations.
        this.controller_.refresh();
    };
    /**
     * Stops observing provided element.
     *
     * @param {Element} target - Element to stop observing.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.unobserve = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is not being observed.
        if (!observations.has(target)) {
            return;
        }
        observations.delete(target);
        if (!observations.size) {
            this.controller_.removeObserver(this);
        }
    };
    /**
     * Stops observing all elements.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.disconnect = function () {
        this.clearActive();
        this.observations_.clear();
        this.controller_.removeObserver(this);
    };
    /**
     * Collects observation instances the associated element of which has changed
     * it's content rectangle.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.gatherActive = function () {
        var _this = this;
        this.clearActive();
        this.observations_.forEach(function (observation) {
            if (observation.isActive()) {
                _this.activeObservations_.push(observation);
            }
        });
    };
    /**
     * Invokes initial callback function with a list of ResizeObserverEntry
     * instances collected from active resize observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.broadcastActive = function () {
        // Do nothing if observer doesn't have active observations.
        if (!this.hasActive()) {
            return;
        }
        var ctx = this.callbackCtx_;
        // Create ResizeObserverEntry instance for every active observation.
        var entries = this.activeObservations_.map(function (observation) {
            return new ResizeObserverEntry(observation.target, observation.broadcastRect());
        });
        this.callback_.call(ctx, entries, ctx);
        this.clearActive();
    };
    /**
     * Clears the collection of active observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.clearActive = function () {
        this.activeObservations_.splice(0);
    };
    /**
     * Tells whether observer has active observations.
     *
     * @returns {boolean}
     */
    ResizeObserverSPI.prototype.hasActive = function () {
        return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI;
}());

// Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.
var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();
/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */
var ResizeObserver = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback that is invoked when
     *      dimensions of the observed elements change.
     */
    function ResizeObserver(callback) {
        if (!(this instanceof ResizeObserver)) {
            throw new TypeError('Cannot call a class as a function.');
        }
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        var controller = ResizeObserverController.getInstance();
        var observer = new ResizeObserverSPI(callback, controller, this);
        observers.set(this, observer);
    }
    return ResizeObserver;
}());
// Expose public methods of ResizeObserver.
[
    'observe',
    'unobserve',
    'disconnect'
].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
        var _a;
        return (_a = observers.get(this))[method].apply(_a, arguments);
    };
});

var index = (function () {
    // Export existing implementation if available.
    if (typeof global$1.ResizeObserver !== 'undefined') {
        return global$1.ResizeObserver;
    }
    return ResizeObserver;
})();

var SafeAreaContext = react.createContext({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
});
var SafeAreaProvider = function (_a) {
    var children = _a.children;
    var isEqualJSON = useUtils().isEqualJSON;
    var _b = react.useState({ top: 0, right: 0, bottom: 0, left: 0 }), safeArea = _b[0], setSafeArea = _b[1];
    var insets = ["safe-area-inset-top", "safe-area-inset-right", "safe-area-inset-bottom", "safe-area-inset-left"];
    react.useEffect(function () {
        insets.forEach(function (inset) {
            document.documentElement.style.setProperty("--" + inset, "env(" + inset + ")");
        });
    }, []);
    var getOffsets = react.useCallback(function () {
        var _a = insets.map(function (inset) { return parseInt(window.getComputedStyle(document.documentElement).getPropertyValue("--" + inset) || "0"); }), top = _a[0], right = _a[1], bottom = _a[2], left = _a[3];
        var offsets = { top: top, bottom: bottom, left: left, right: right };
        return offsets;
    }, []);
    var update = react.useCallback(function () {
        setSafeArea(function (oldSafeArea) {
            var newSafeArea = getOffsets();
            if (!isEqualJSON(oldSafeArea, newSafeArea)) {
                return __assign({}, newSafeArea);
            }
            return oldSafeArea;
        });
    }, [getOffsets]);
    react.useEffect(function () {
        update();
        var body = new index(update);
        if (window.visualViewport)
            window.visualViewport.addEventListener("resize", update);
        window.addEventListener("orientationchange", update);
        if (body)
            body.observe(document.body);
        return function () {
            if (body)
                body.disconnect();
            if (window.visualViewport)
                window.visualViewport.removeEventListener("resize", update);
            window.removeEventListener("orientationchange", update);
        };
    }, [update]);
    return (jsxRuntime.jsx(SafeAreaContext.Provider, __assign({ value: safeArea }, { children: children }), void 0));
};
var useSafeAreaContext = function () {
    var context = react.useContext(SafeAreaContext);
    return context;
};

var useSafeArea = function () {
    return useSafeAreaContext();
};

var DARK_MEDIA_QUERY = "(prefers-color-scheme: dark)";
var LIGHT_MEDIA_QUERY = "(prefers-color-scheme: light)";
var AndroidDarkMode = "AndroidDarkMode";
function createTheme() {
    var ThemeContext = react.createContext({});
    var ThemeProvider = function (_a) {
        var _b = _a.theme, _theme = _b === void 0 ? "system" : _b, styles = _a.styles, _c = _a.onChange, onChange = _c === void 0 ? function (a) { } : _c, children = _a.children;
        var isBrowser = useUtils().isBrowser;
        var getInitialTheme = react.useCallback(function () {
            if (isBrowser()) {
                var darkMedia = window.matchMedia(DARK_MEDIA_QUERY);
                if (_theme === "system")
                    return darkMedia.matches ? "dark" : "light";
                else
                    return theme;
            }
            else {
                return "light";
            }
        }, []);
        var isChanged = react.useRef(false);
        var _d = react.useState(getInitialTheme()), currentTheme = _d[0], _setCurrentTheme = _d[1];
        var setCurrentTheme = react.useCallback(function (newTheme) {
            isChanged.current = true;
            _setCurrentTheme(newTheme);
        }, []);
        var updateInitialTheme = react.useCallback(function () {
            setCurrentTheme(getInitialTheme());
        }, [setCurrentTheme, getInitialTheme]);
        react.useEffect(function () {
            if (isBrowser()) {
                if (!isChanged.current) {
                    updateInitialTheme();
                }
            }
        }, [isChanged.current, updateInitialTheme]);
        var getCurrentTheme = react.useCallback(function (e) {
            var userAgent = window.navigator.userAgent;
            if (userAgent.includes(AndroidDarkMode)) {
                setCurrentTheme('dark');
                onChange('dark');
            }
            else if (e && e.matches) {
                if (e.media === DARK_MEDIA_QUERY) {
                    setCurrentTheme('dark');
                    onChange('dark');
                }
                else {
                    setCurrentTheme('light');
                    onChange('light');
                }
            }
        }, [onChange]);
        react.useEffect(function () {
            var darkMedia = window.matchMedia(DARK_MEDIA_QUERY);
            window.matchMedia(LIGHT_MEDIA_QUERY);
            if (_theme === "system") {
                if (darkMedia.addEventListener) {
                    darkMedia.addEventListener("change", getCurrentTheme);
                }
                else if (darkMedia.addListener) {
                    darkMedia.addListener(getCurrentTheme);
                }
            }
            else {
                setCurrentTheme(_theme);
            }
            return function () {
                if (darkMedia.removeEventListener)
                    darkMedia.removeEventListener("change", getCurrentTheme);
                else if (darkMedia.removeListener) {
                    darkMedia.removeListener(getCurrentTheme);
                }
            };
        }, [_theme, getCurrentTheme]);
        var theme = styles[currentTheme];
        var value = { theme: theme, current: currentTheme };
        return (jsxRuntime.jsx(ThemeContext.Provider, __assign({ value: value }, { children: children }), void 0));
    };
    var useTheme = function () {
        var context = react.useContext(ThemeContext);
        if (context === undefined) {
            throw new Error('useThemeContext must be used within an ThemeProvider');
        }
        return context;
    };
    return {
        ThemeProvider: ThemeProvider,
        useTheme: useTheme
    };
}

var CookieContext = react.createContext({});
var CookieProvider = function (_a) {
    var _b = _a.withState, withState = _b === void 0 ? true : _b, onChange = _a.onChange, children = _a.children;
    var _c = useUtils(), tryJSONparse = _c.tryJSONparse, tryJSONStringify = _c.tryJSONStringify;
    var getCookies = react.useCallback(function () {
        var _cookies = document.cookie.split(';');
        var cookies = {};
        _cookies.forEach(function (cookie) {
            var _a = cookie.split("="), key = _a[0], value = _a[1];
            cookies[key.trim()] = tryJSONparse(value);
        });
        return cookies;
    }, []);
    var _d = react.useState(getCookies()), cookie = _d[0], setCookie = _d[1];
    var setItem = react.useCallback(function (_a) {
        var key = _a.key, value = _a.value, expireDays = _a.expireDays, expireHours = _a.expireHours, expire = _a.expire, _b = _a.path, path = _b === void 0 ? "/" : _b;
        if (!key)
            throw new Error("No key passed");
        var d = new Date();
        var oneHour = 60 * 60 * 1000;
        if (!!expireDays) {
            d.setTime(d.getTime() + (expireDays * 24 * oneHour));
        }
        else if (!!expireHours) {
            d.setTime(d.getTime() + (expireHours * oneHour));
        }
        var newCookie = tryJSONStringify(value);
        document.cookie = key.trim() + "=" + newCookie + ";expires=" + (expire || d.toUTCString()) + ";path=" + path;
        if (withState)
            setCookie(function (old) {
                var _a;
                var newCookies = __assign(__assign({}, old), (_a = {}, _a[key.trim()] = newCookie, _a));
                if (onChange)
                    onChange(newCookies);
                return newCookies;
            });
        else if (onChange)
            onChange(getCookies());
    }, [onChange, withState, getCookies]);
    var getItem = react.useCallback(function (key) {
        if (!key)
            throw new Error("No key passed");
        if (withState)
            return cookie[key];
        else
            return getCookies()[key];
    }, [cookie, withState, getCookies]);
    var removeItem = react.useCallback(function (key) {
        if (!key)
            throw new Error("No key passed");
        var invalidDate = "Thu, 01 Jan 1970 00:00:01 GMT";
        document.cookie = key.trim() + "= ;expires=" + invalidDate + ";";
        if (withState)
            setCookie(function (old) {
                var newCookie = __assign({}, old);
                delete newCookie[key.trim()];
                if (onChange)
                    onChange(newCookie);
                return newCookie;
            });
        else if (onChange)
            onChange(getCookies());
    }, [onChange, withState, getCookies]);
    return (jsxRuntime.jsx(CookieContext.Provider, __assign({ value: {
            cookie: cookie,
            getItem: getItem,
            setItem: setItem,
            removeItem: removeItem
        } }, { children: children }), void 0));
};
var useCookieContext = function () {
    var context = react.useContext(CookieContext);
    if (context === undefined) {
        throw new Error('useCookieContext must be used within an CookieContext.Provider');
    }
    return context;
};

var useCookie = function (key) {
    var _a = useCookieContext(), _getItem = _a.getItem, _setItem = _a.setItem, _removeItem = _a.removeItem, cookie = _a.cookie;
    var getItem = react.useCallback(function (_key) {
        if (_key === void 0) { _key = undefined; }
        return _getItem(key || _key);
    }, [_getItem]);
    var setItem = react.useCallback(function (_params) {
        var params = __assign({}, _params);
        if (!!key && !params.key)
            params.key = key;
        _setItem(params);
    }, [_setItem]);
    var removeItem = react.useCallback(function (_key) {
        if (_key === void 0) { _key = undefined; }
        return _removeItem(key || _key);
    }, [_removeItem]);
    return { getItem: getItem, setItem: setItem, removeItem: removeItem, cookie: cookie };
};

var GlobalStateContext = react.createContext({});
var GlobalStateProvider = function (_a) {
    var children = _a.children;
    var _b = react.useState({}), globalState = _b[0], setGlobalState = _b[1];
    return (jsxRuntime.jsx(GlobalStateContext.Provider, __assign({ value: {
            globalState: globalState,
            setGlobalState: setGlobalState
        } }, { children: children }), void 0));
};
var useGlobalStateContext = function () {
    var context = react.useContext(GlobalStateContext);
    if (context === undefined) {
        throw new Error('useGlobalStateContext must be used within an GlobalStateContext.Provider');
    }
    return context;
};

var useGlobalState = function () {
    var _a = useGlobalStateContext(), globalState = _a.globalState, setGlobalState = _a.setGlobalState;
    return { globalState: globalState, setGlobalState: setGlobalState };
};

var useClickInside = function (_a) {
    var ref = _a.ref, callback = _a.callback, _b = _a.withState, withState = _b === void 0 ? false : _b;
    var _c = react.useState(false), clickedState = _c[0], setClickedState = _c[1];
    var clickedRef = react.useRef(false);
    var updateSwitch = react.useCallback(function (newValue) {
        if (withState) {
            setClickedState(true);
        }
        else {
            clickedRef.current = true;
        }
    }, [withState]);
    var onClick = react.useCallback(function (event) {
        if (ref.current) {
            if (ref.current.contains(event.target)) {
                updateSwitch(true);
                callback(event);
            }
            else {
                updateSwitch(false);
            }
        }
    }, [ref.current, callback, updateSwitch]);
    react.useEffect(function () {
        document.addEventListener("click", onClick);
        return function () {
            document.removeEventListener("click", onClick);
        };
    }, [onClick]);
    return withState ? clickedState : clickedRef.current;
};

var useClickOutside = function (_a) {
    var ref = _a.ref, callback = _a.callback, _b = _a.withState, withState = _b === void 0 ? false : _b;
    var _c = react.useState(false), clickedState = _c[0], setClickedState = _c[1];
    var clickedRef = react.useRef(false);
    var updateSwitch = react.useCallback(function (newValue) {
        if (withState) {
            setClickedState(true);
        }
        else {
            clickedRef.current = true;
        }
    }, [withState]);
    var onClick = react.useCallback(function (event) {
        if (ref.current) {
            if (!ref.current.contains(event.target)) {
                updateSwitch(true);
                callback(event);
            }
            else {
                updateSwitch(false);
            }
        }
    }, [ref.current, callback, updateSwitch]);
    react.useEffect(function () {
        document.addEventListener("click", onClick);
        return function () {
            document.removeEventListener("click", onClick);
        };
    }, [onClick]);
    return withState ? clickedState : clickedRef.current;
};

var usePrevious = function (current) {
    var previous = react.useRef(current);
    react.useEffect(function () {
        previous.current = current;
    }, [current]);
    return previous.current;
};

var useMounted = function () {
    var _a = react.useState(false), mounted = _a[0], setMounted = _a[1];
    react.useEffect(function () {
        setMounted(true);
        return function () {
            setMounted(false);
        };
    }, []);
    return mounted;
};

var useTitle = function (props) {
    if (props === void 0) { props = { title: undefined, setOldTitleOnUnmount: false }; }
    var title = props.title, setOldTitleOnUnmount = props.setOldTitleOnUnmount;
    var initialTitle = react.useRef();
    var setTitle = react.useCallback(function (title) {
        document.title = title;
    }, []);
    react.useEffect(function () {
        initialTitle.current = document.title;
    }, []);
    react.useEffect(function () {
        if (title)
            setTitle(title);
        return function () {
            if (setOldTitleOnUnmount)
                setTitle(initialTitle.current);
        };
    }, [setTitle, title, initialTitle.current, setOldTitleOnUnmount]);
    return {
        title: title,
        setTitle: setTitle
    };
};

var defaultValue = {
    left: 0,
    top: 0,
    width: 0,
    bottom: 0,
    right: 0,
    x: 0,
    y: 0,
    height: 0,
    offsetLeft: 0,
    offsetTop: 0,
};
var useMeasure = function (_a) {
    var ref = _a.ref, _b = _a.updateOnWindowResize, updateOnWindowResize = _b === void 0 ? false : _b, onResize = _a.onResize;
    var _c = react.useState(defaultValue), bounds = _c[0], setBounds = _c[1];
    var set = react.useCallback(function (newBounds) {
        if (onResize)
            onResize(newBounds);
        else
            setBounds(newBounds);
    }, [setBounds, onResize]);
    var registerObserver = react.useCallback(function (element) {
        var observer = new index(function () {
            var _a, _b;
            if (ref.current) {
                var newBounds = ref.current.getBoundingClientRect();
                newBounds.offsetLeft = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.offsetLeft;
                newBounds.offsetTop = (_b = ref.current) === null || _b === void 0 ? void 0 : _b.offsetTop;
                if (newBounds)
                    set(newBounds);
            }
        });
        observer.observe(element);
        return function () { return observer.disconnect(); };
    }, [set, ref.current]);
    react.useEffect(function () {
        if (updateOnWindowResize)
            return registerObserver(document.body);
    }, [updateOnWindowResize, registerObserver]);
    react.useEffect(function () {
        if (ref.current)
            return registerObserver(ref.current);
    }, [registerObserver, ref.current]);
    return bounds;
};

var zeroOffset = { top: 0, right: 0, bottom: 0, left: 0 };
var useHover = function (_a) {
    var ref = _a.ref, _b = _a.active, active = _b === void 0 ? true : _b, _c = _a.axis, axis = _c === void 0 ? { vertical: true, horizontal: true } : _c, _d = _a.offsets, _offsets = _d === void 0 ? {} : _d, _e = _a.updateOnTouchEnd, updateOnTouchEnd = _e === void 0 ? true : _e, _f = _a.includeBorders, includeBorders = _f === void 0 ? true : _f;
    var _g = useUtils(), isPointInRect = _g.isPointInRect, isInRange = _g.isInRange;
    var _h = react.useState(false), isHover = _h[0], setIsHover = _h[1];
    var checkInVertically = axis.vertical, checkInHorizontally = axis.horizontal;
    var offsets = __assign(__assign({}, zeroOffset), _offsets);
    var top = offsets.top, right = offsets.right, bottom = offsets.bottom, left = offsets.left;
    var isMouseOver = react.useCallback(function (e) {
        if (!ref.current)
            return;
        var event = e.touches ? e.touches[0] : e;
        var clientX = event.clientX, clientY = event.clientY;
        var point = { x: clientX, y: clientY };
        var boundingRect = ref.current.getBoundingClientRect().toJSON();
        boundingRect.top += top;
        boundingRect.right += right;
        boundingRect.bottom += bottom;
        boundingRect.left += left;
        var checkBoth = checkInVertically && checkInHorizontally;
        var _isHover = checkBoth
            ? isPointInRect(point, boundingRect, includeBorders) :
            checkInVertically ?
                isInRange([boundingRect.top, boundingRect.bottom], clientY, includeBorders, includeBorders)
                : isInRange([boundingRect.left, boundingRect.right], clientX, includeBorders, includeBorders);
        setIsHover(_isHover);
    }, [ref.current, isHover, includeBorders, checkInVertically, checkInHorizontally, top, right, bottom, left]);
    var onTouchEnd = react.useCallback(function () {
        setIsHover(false);
    }, []);
    react.useEffect(function () {
        if (updateOnTouchEnd)
            document.addEventListener('touchend', onTouchEnd, { passive: true });
        return function () {
            document.removeEventListener('touchend', onTouchEnd);
        };
    }, [updateOnTouchEnd, onTouchEnd]);
    react.useEffect(function () {
        if (active) {
            document.addEventListener('mousemove', isMouseOver, { passive: true });
            document.addEventListener('touchmove', isMouseOver, { passive: true });
        }
        else {
            setIsHover(false);
        }
        return function () {
            document.removeEventListener('mousemove', isMouseOver);
            document.removeEventListener('touchmove', isMouseOver);
        };
    }, [isMouseOver, active]);
    return { isHover: isHover };
};

exports.AuthProvider = AuthProvider;
exports.CookieProvider = CookieProvider;
exports.DimensionsProvider = DimensionsProvider;
exports.EventListenerProvider = EventListenerProvider;
exports.FetchProvider = FetchProvider;
exports.GlobalStateProvider = GlobalStateProvider;
exports.LoadingProvider = LoadingProvider;
exports.LocalStorageProvider = LocalStorageProvider;
exports.SafeAreaProvider = SafeAreaProvider;
exports.SocketProvider = SocketProvider;
exports.createLocale = createLocale;
exports.createTheme = createTheme;
exports.useAuth = useAuth;
exports.useClickInside = useClickInside;
exports.useClickOutside = useClickOutside;
exports.useCookie = useCookie;
exports.useCounter = useCounter;
exports.useDelete = useDelete;
exports.useDimensions = useDimensions;
exports.useEventListener = useEventListener;
exports.useFetch = useFetch;
exports.useGet = useGet;
exports.useGlobalState = useGlobalState;
exports.useHover = useHover;
exports.useLoading = useLoading;
exports.useLocalStorage = useLocalStorage;
exports.useMeasure = useMeasure;
exports.useMounted = useMounted;
exports.usePost = usePost;
exports.usePrevious = usePrevious;
exports.usePut = usePut;
exports.useSafeArea = useSafeArea;
exports.useSocket = useSocket;
exports.useTitle = useTitle;
exports.useUtils = useUtils;
