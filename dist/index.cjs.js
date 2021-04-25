'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');
var moment = require('moment');
require('moment/min/locales.min');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);

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

var useLocalStorage = function (key, defaultValue) {
    var getItem = react.useCallback(function (_defaultValue) {
        try {
            var value = JSON.parse(window.localStorage.getItem(key));
            return value || _defaultValue || defaultValue;
        }
        catch (e) {
            return defaultValue;
        }
    }, [defaultValue, key]);
    var setItem = react.useCallback(function (_value) {
        try {
            var value = JSON.stringify(_value);
            window.localStorage.setItem(key, value);
        }
        catch (e) {
            window.localStorage.setItem(key, defaultValue || '{}');
        }
    }, [defaultValue, key]);
    var removeItem = react.useCallback(function () {
        window.localStorage.removeItem(key);
    }, [key]);
    return { getItem: getItem, setItem: setItem, removeItem: removeItem };
};

var AuthContext = react.createContext({});
var AuthProvider = function (_a) {
    var _b = _a.localStorageTokenKeyName, localStorageTokenKeyName = _b === void 0 ? "token" : _b, _c = _a.user, _user = _c === void 0 ? {
        isLoggedIn: false,
        checked: false
    } : _c, _onLogin = _a.onLogin, _onLogout = _a.onLogout, children = _a.children;
    var _d = react.useState(_user), user = _d[0], setUser = _d[1];
    var onLogin = react.useCallback(function (info) {
        setUser(info);
        if (_onLogin)
            _onLogin(info);
    }, [_onLogin]);
    var onLogout = react.useCallback(function () {
        setUser({
            isLoggedIn: false,
            checked: false
        });
        if (_onLogout)
            _onLogout();
    }, [_onLogout]);
    var setToken = react.useCallback(function (token) {
        setUser(function (old) { return (__assign(__assign({}, old), { token: token })); });
    }, []);
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

var useAuth = function () {
    var _a = useAuthContext(), localStorageTokenKeyName = _a.localStorageTokenKeyName, onLogout = _a.onLogout, onLogin = _a.onLogin, setToken = _a.setToken, setUser = _a.setUser, user = _a.user;
    var token = user.token;
    var setItem = useLocalStorage(localStorageTokenKeyName).setItem;
    var logout = react.useCallback(function () {
        setItem("");
        var gapi = window.gapi;
        if (gapi)
            if (gapi.auth2) {
                var auth2 = gapi.auth2.getAuthInstance();
                if (auth2) {
                    auth2.signOut().then(function () {
                        console.log('User signed out.');
                    });
                }
            }
        var FB = window.FB;
        if (FB) {
            if (FB.logout) {
                FB.logout(function (response) {
                });
            }
        }
        onLogout();
    }, [setItem, onLogout]);
    var login = react.useCallback(function (data) {
        setToken(data.token);
        onLogin(data);
    }, [onLogin, setToken]);
    return {
        login: login,
        logout: logout,
        setUser: setUser,
        user: user,
        token: token
    };
};

moment__default['default'].locale(navigator.language);
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
var formatDate = function (date, format) {
    if (format === void 0) { format = "DD MMMM YYYY"; }
    return moment__default['default'](date).format(format);
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
var iFetch = function (payload) {
    var _url = payload.url, signal = payload.signal, endpoint = payload.endpoint, method = payload.method, params = payload.params, formData = payload.formData, token = payload.token, onSuccess = payload.onSuccess, onError = payload.onError;
    var url = "" + _url + endpoint;
    var body = params ? JSON.stringify(params) : formData;
    var headers = {
        "Content-Type": "application/json"
    };
    if (token)
        headers["Authorization"] = "Bearer " + token;
    if (formData) {
        delete headers["Content-Type"];
    }
    fetch(url, {
        signal: signal,
        method: method || (params || formData ? "POST" : "GET"),
        body: body,
        headers: headers
    })
        .then(function (i) {
        var contentType = (i.headers.get('Content-Type') || '').split(";")[0];
        if (i.ok) {
            switch (contentType) {
                case 'application/json':
                    i.json().then(function (i2) {
                        if (i2 instanceof Array)
                            onSuccess(i2);
                        else if (i2.success !== undefined && !i2.success)
                            onError(i, i2);
                        else
                            onSuccess(i2);
                    }, function (error) {
                        console.error(url, error);
                        onSuccess({});
                    });
                    break;
                default:
                    i.blob().then(function (blob) {
                        onSuccess(new Blob([blob], { type: contentType }));
                    });
                    break;
            }
        }
        else if (i.status === 400) {
            console.error("status 400 error", url, i);
            i.json().then(function (i2) {
                onError(i, i2);
            });
        }
        else {
            onError(i);
        }
    }).catch(function (e) {
        console.error("e", e);
        onError(e);
    });
};
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
var dateToDescription = function (date) {
    var momentDay = moment__default['default'](date, "YYYY-MM-DD");
    var momentToday = moment__default['default'](new Date(), "YYYY-MM-DD");
    var dayDiff = momentToday.diff(momentDay, 'days');
    var monthDiff = momentToday.diff(momentDay, 'month');
    if (dayDiff === 1)
        return "D\u00FCn";
    else if (dayDiff) {
        return (monthDiff || dayDiff) + " " + (monthDiff ? "ay" : "gün") + " \u00F6nce";
    }
    else {
        return "Bugün";
    }
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
var getMonthDescription = function (_month) {
    var month = numberShouldStartWithZero(_month);
    return moment__default['default']("2020-" + month + "-01").format("MMMM");
};
var getDatesOfYear = function (year) {
    var date = moment__default['default'](year + "-01-01");
    var currentYear = year;
    var dates = [];
    while (currentYear === year) {
        dates.push(date.format("YYYY-MM-DD"));
        date = moment__default['default'](date).add(1, 'day');
        currentYear = date.get("year");
    }
    return dates;
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
    for (index; index--; index > -1) {
        if (predicate(array[index]))
            break;
    }
    return index;
};

var utils = /*#__PURE__*/Object.freeze({
    __proto__: null,
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
    formatDate: formatDate,
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
    iFetch: iFetch,
    changeColor: changeColor,
    takeIf: takeIf,
    spliceString: spliceString,
    dateToDescription: dateToDescription,
    isNullOrUndefined: isNullOrUndefined,
    coalasce: coalasce,
    numberShouldStartWithZero: numberShouldStartWithZero,
    getTodayYear: getTodayYear,
    getTodayMonth: getTodayMonth,
    getMonthDescription: getMonthDescription,
    getDatesOfYear: getDatesOfYear,
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

var ApiContext = react.createContext({});
var ApiProvider = function (_a) {
    var url = _a.url, onSuccess = _a.onSuccess, onError = _a.onError, children = _a.children;
    return (jsxRuntime.jsx(ApiContext.Provider, __assign({ value: { url: url, onSuccess: onSuccess, onError: onError } }, { children: children }), void 0));
};
var useApiContext = function () {
    var context = react.useContext(ApiContext);
    if (context === undefined) {
        throw new Error('useApiContext must be used within an ApiContext.Provider');
    }
    return context;
};

var useApi = function (parameterPayload) {
    var iFetch = useUtils().iFetch;
    var payloadRef = react.useRef(parameterPayload);
    var _a = payloadRef.current, endpoint = _a.endpoint, _b = _a.method, method = _b === void 0 ? 'GET' : _b, params = _a.params, _c = _a.initialValue, initialValue = _c === void 0 ? {} : _c, formData = _a.formData, payloadOnSuccess = _a.onSuccess, payloadOnError = _a.onError;
    var _d = useApiContext(), url = _d.url, contextOnSuccess = _d.onSuccess, contextOnError = _d.onError;
    var token = useAuth().token;
    var _e = react.useState(false), shouldFetch = _e[0], setShouldFetch = _e[1];
    var _f = react.useState({
        success: undefined,
        firstTimeFetched: false,
        fetched: false,
        fetching: false,
        response: initialValue || {}
    }), data = _f[0], setData = _f[1];
    var controller = react.useMemo(function () { return new AbortController(); }, []);
    var signal = controller.signal;
    var onSuccess = react.useCallback(function (response) {
        if (contextOnSuccess)
            contextOnSuccess(response);
        if (payloadOnSuccess)
            payloadOnSuccess(response);
        setData(function (oldData) { return (__assign(__assign({}, oldData), { success: true, response: response, fetching: false, fetched: true, firstTimeFetched: true })); });
    }, [payloadOnSuccess]);
    var onError = react.useCallback(function (response, responseJSON) {
        if (responseJSON === void 0) { responseJSON = {}; }
        setData(function (oldData) { return (__assign(__assign({}, oldData), { success: false, response: __assign({}, (responseJSON || response)), fetching: false, fetched: true, firstTimeFetched: true })); });
        if (contextOnError)
            contextOnError(responseJSON || response, response);
        if (payloadOnError)
            payloadOnError(responseJSON || response, response);
    }, [payloadOnError]);
    var updateData = react.useCallback(function () {
        setData(function (oldData) { return (__assign(__assign({}, oldData), { fetching: true, fetched: false })); });
    }, []);
    var load = react.useCallback(function (payload) {
        if (payload === void 0) { payload = {}; }
        payloadRef.current = __assign(__assign({}, payloadRef), payload);
        updateData();
        setShouldFetch(true);
    }, [updateData, setShouldFetch]);
    react.useEffect(function () {
        if (shouldFetch) {
            iFetch({
                url: url,
                endpoint: endpoint,
                params: params,
                method: method,
                formData: formData,
                onSuccess: onSuccess,
                onError: onError,
                token: token,
                signal: signal
            });
            setShouldFetch(false);
        }
    }, [
        url,
        endpoint,
        params,
        method,
        formData,
        onSuccess,
        onError,
        token,
        signal,
        shouldFetch,
        setShouldFetch
    ]);
    react.useEffect(function () {
        return function () {
            controller.abort();
        };
    }, [controller]);
    return __assign({ load: load }, data);
};

var DimensionsContext = react.createContext({});
var DimensionsProvider = function (_a) {
    var _b = _a.widths, widths = _b === void 0 ? [576, 768, 992, 1200, 1600] : _b, _c = _a.sizes, sizes = _c === void 0 ? ["xs", "sm", "md", "lg", "xl", "xxl"] : _c, children = _a.children;
    return (jsxRuntime.jsx(DimensionsContext.Provider, __assign({ value: { sizes: sizes, widths: widths } }, { children: children }), void 0));
};
var useDimensionsContext = function () {
    var context = react.useContext(DimensionsContext);
    if (context === undefined) {
        throw new Error('useDimensionsContext must be used within an DimensionsContext.Provider');
    }
    return context;
};

var useDimensions = function (_a) {
    var breakpoints = _a.breakpoints;
    var _b = useDimensionsContext(), sizes = _b.sizes, widths = _b.widths;
    var _c = useUtils(), findLastIndex = _c.findLastIndex, takeIf = _c.takeIf;
    var getSizeOfWindowWidth = react.useCallback(function (width) {
        var indexOfWidth = findLastIndex(widths, function (c) { return width >= c; });
        return sizes[takeIf(indexOfWidth > -1, indexOfWidth, 0)];
    }, [findLastIndex, widths, sizes, takeIf]);
    var _d = react.useState({
        width: 0,
        height: 0,
        size: "xs"
    }), dimensions = _d[0], setDimensions = _d[1];
    var size = dimensions.size;
    var updateDimensions = react.useCallback(function (width, height) {
        var newSize = getSizeOfWindowWidth(width);
        if (breakpoints.indexOf(newSize)) {
            setDimensions(function (oldDimensions) {
                var newDimensions = __assign({}, oldDimensions);
                newDimensions.width = width;
                newDimensions.height = height;
                newDimensions.size = newSize;
                return newDimensions;
            });
        }
    }, [breakpoints, getSizeOfWindowWidth]);
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
    var onResize = react.useCallback(function (_window) {
        var innerWidth = _window.innerWidth, innerHeight = _window.innerHeight;
        updateDimensions(innerWidth, innerHeight);
    }, [updateDimensions]);
    react.useEffect(function () {
        onResize(window);
        var oldOnResize = window.onresize;
        window.onresize = function (e) {
            onResize(e.target);
            //@ts-ignore
            if (oldOnResize)
                oldOnResize(e);
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
    var registerEventById = react.useCallback(function (id, name, event) {
        if (_registerEventById)
            return _registerEventById(component, id, name, event);
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

var LoadingContext = react.createContext({});
var LoadingProvider = function (_a) {
    var onIncrease = _a.onIncrease, onDecrease = _a.onDecrease, children = _a.children;
    var _b = react.useState(0), loading = _b[0], setLoading = _b[1];
    var increase = react.useCallback(function () {
        setLoading(function (old) {
            var newLoading = old + 1;
            if (onIncrease)
                onIncrease(newLoading);
            return newLoading;
        });
    }, [onIncrease]);
    var decrease = react.useCallback(function () {
        setLoading(function (old) {
            var newLoading = old - 1;
            if (onDecrease)
                onDecrease(newLoading);
            return newLoading;
        });
    }, [onDecrease]);
    return (jsxRuntime.jsx(LoadingContext.Provider, __assign({ value: { loading: loading, increase: increase, decrease: decrease } }, { children: children }), void 0));
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
    var isLoading = loading && loading > 0;
    return { isLoading: isLoading, increase: increase, decrease: decrease };
};

var trTRLocales = {
    Back: function () { return "Geri"; },
    New: function () { return "Yeni"; },
    Save: function () { return "Kaydet"; },
    Decline: function () { return "Vazgeç"; },
    Delete: function () { return "Sil"; },
    Edit: function () { return "Düzenle"; },
    Update: function () { return "Güncelle"; },
    Accept: function () { return "Kabul Et"; },
    Stores: function () { return "Mağazalar"; },
    Purchases: function () { return "Satın Alımlar"; },
    Sales: function () { return "Satışlar"; },
    Profile: function () { return "Profil"; },
    Menu: function () { return "Menü"; },
    Payment: function () { return "Ödeme"; },
    Orders: function () { return "Siparişler"; },
    Tables: function () { return "Masalar"; },
    Username: function () { return "Kullanıcı Adı"; },
    Password: function () { return "Şifre"; },
    FirstName: function () { return "Ad"; },
    LastName: function () { return "Soyad"; },
    PhoneNumber: function () { return "Telefon"; },
    UpdateProfile: function () { return "Profil Güncelle"; },
    Title: function () { return "Başlık"; },
    Color: function () { return "Renk"; },
    NewEvent: function () { return "Yeni Etkinlik"; },
    Invitations: function () { return "Davetiyeler"; },
    NoInvitations: function () { return "Davetiye bulunamadı"; },
    Home: function () { return "Ana Sayfa"; },
    Today: function () { return "Bugün"; },
    Tomorrow: function () { return "Yarın"; },
    ThisWeek: function () { return "Bu Hafta"; },
    ThisMonth: function () { return "Bu Ay"; },
    EmptyEvents: function () { return "Etkinlik Bulunmamaktadır."; },
    EmptyTags: function () { return "Etiket Bulunmamaktadır."; },
    SignIn: function () { return "Giriş Yap"; },
    SignUp: function () { return "Üye Ol"; },
    StartTime: function () { return "Başlangıç Saati"; },
    EndTime: function () { return "Bitiş Saati"; },
    Descriptions: function () { return "Açıklamalar"; },
    Shared: function () { return "Paylaşılanlar"; },
    Search: function () { return "Ara"; },
    Agenda: function () { return "Ajanda"; },
    Events: function () { return "Etkinlikler"; },
    Tags: function () { return "Etiketler"; },
    NewTag: function () { return "Yeni Etiket"; },
    EditTag: function () { return "Etiketi Düzenle"; },
    Complete: function () { return "Tamamla"; },
    ByYou: function () { return "Senin"; },
    UploadImage: function () { return "Görsel Yükle"; },
    DeleteConfirm: function () { return "Silmek istediğinize emin misiniz?"; },
    AlreadyHaveAnAccount: function () { return "Zaten üyeyim?"; },
    CancelInviteConfirm: function () { return "Davetiyeyi İptal etmek istediğinize emin misiniz?"; },
    CompletedBy: function (_a) {
        var username = _a.username, date = _a.date;
        return jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [username, " taraf\u0131ndan ", date, " tarihinde tamamland\u0131."] }, void 0);
    },
    UpdatedBy: function (_a) {
        var username = _a.username, date = _a.date;
        return jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [username, " taraf\u0131ndan ", date, " tarihinde g\u00FCncellendi."] }, void 0);
    },
    Loading: function () { return "Yükleniyor..."; },
};

var enUSLocales = {
    Back: function () { return "Back"; },
    New: function () { return "New"; },
    Decline: function () { return "Decline"; },
    Delete: function () { return "Delete"; },
    Edit: function () { return "Edit"; },
    Save: function () { return "Save"; },
    Update: function () { return "Update"; },
    Purchases: function () { return "Purchases"; },
    Sales: function () { return "Sales"; },
    Profile: function () { return "Profile"; },
    Menu: function () { return "Menu"; },
    Payment: function () { return "Payment"; },
    Orders: function () { return "Orders"; },
    Tables: function () { return "Tables"; },
    Stores: function () { return "Stores"; },
    Loading: function () { return "Loading..."; },
    Username: function () { return "Username"; },
    Password: function () { return "Password"; },
    FirstName: function () { return "First name"; },
    LastName: function () { return "Last name"; },
    PhoneNumber: function () { return "Phone"; },
    UpdateProfile: function () { return "Update Profile"; },
    Accept: function () { return "Accept"; },
    Title: function () { return "Title"; },
    Color: function () { return "Color"; },
    NewEvent: function () { return "New Event"; },
    Invitations: function () { return "Invitations"; },
    NoInvitations: function () { return "No Invitation"; },
    Home: function () { return "Home"; },
    Today: function () { return "Today"; },
    Tomorrow: function () { return "Tomorrow"; },
    ThisWeek: function () { return "This Week"; },
    ThisMonth: function () { return "This Month"; },
    EmptyEvents: function () { return "No Event."; },
    EmptyTags: function () { return "No Tag."; },
    SignIn: function () { return "Sign In"; },
    SignUp: function () { return "Sign Up"; },
    StartTime: function () { return "Start Time"; },
    EndTime: function () { return "End Time"; },
    Descriptions: function () { return "Descriptions"; },
    Shared: function () { return "Shared"; },
    Search: function () { return "Search"; },
    Agenda: function () { return "Agenda"; },
    Events: function () { return "Events"; },
    Tags: function () { return "Tags"; },
    NewTag: function () { return "New Tag"; },
    EditTag: function () { return "Edit Tag"; },
    Complete: function () { return "Complete"; },
    ByYou: function () { return "You"; },
    UploadImage: function () { return "Upload Image"; },
    DeleteConfirm: function () { return "Are you sure want to delete?"; },
    CancelInviteConfirm: function () { return "Are you sure want to cancel?"; },
    AlreadyHaveAnAccount: function () { return "Already a member"; },
    CompletedBy: function (_a) {
        var username = _a.username, date = _a.date;
        return jsxRuntime.jsxs(jsxRuntime.Fragment, { children: ["Completed by ", username, " at ", date] }, void 0);
    },
    UpdatedBy: function (_a) {
        var username = _a.username, date = _a.date;
        return jsxRuntime.jsxs(jsxRuntime.Fragment, { children: ["Updated by ", username, " at ", date] }, void 0);
    },
};

var AllLocales = {
    tr: __assign({}, trTRLocales),
    en: __assign({}, enUSLocales),
    "en-us": __assign({}, enUSLocales),
    "en-en": __assign({}, enUSLocales),
};

var LocalesContext = react.createContext({});
var LocalesProvider = function (_a) {
    var _b = _a.locales, locales = _b === void 0 ? AllLocales : _b, _c = _a.activeLanguage, _activeLanguage = _c === void 0 ? 'tr' : _c, children = _a.children;
    var _d = react.useState(_activeLanguage), activeLanguage = _d[0], setActiveLanguage = _d[1];
    var locale = react.useMemo(function () { return locales[activeLanguage]; }, [locales, activeLanguage]);
    var getLocale = react.useCallback(function (_a) {
        var name = _a.name, params = _a.params;
        var localeValue = locale[name];
        if (localeValue) {
            return localeValue(params);
        }
        return name;
    }, [locale]);
    return (jsxRuntime.jsx(LocalesContext.Provider, __assign({ value: {
            locale: locale,
            getLocale: getLocale,
            setActiveLanguage: setActiveLanguage,
        } }, { children: children }), void 0));
};
var useLocalesContext = function () {
    var context = react.useContext(LocalesContext);
    if (context === undefined) {
        throw new Error('useLocalesContext must be used within an LocalesContext.Provider');
    }
    return context;
};

var useLocale = function () {
    return useLocalesContext();
};

var useSocket = function (_a) {
    var onopen = _a.onopen, onclose = _a.onclose, onerror = _a.onerror, onmessage = _a.onmessage;
    var user = useAuth().user;
    var username = (user || {}).username;
    //@ts-ignore
    var _b = react.useState({}), socket = _b[0], setSocket = _b[1];
    var connect = react.useCallback(function () {
        var readyState = socket.readyState;
        if (readyState === WebSocket.OPEN || readyState === WebSocket.CONNECTING)
            return;
        var host = process.env.REACT_APP_PROXY_HOST;
        var protocol = process.env.REACT_APP_USE_SSL === "1" ? "wss" : "ws";
        var _socket = new WebSocket(protocol + "://" + host + "/ws?username=" + username);
        setSocket(_socket);
    }, [username, socket]);
    react.useEffect(function () {
        connect();
    }, [connect]);
    react.useEffect(function () {
        if (socket) {
            socket.onopen = function (e) {
                if (onopen)
                    onopen(e);
            };
            socket.onmessage = function (event) {
                var _data = event.data;
                var data = _data;
                try {
                    data = JSON.parse(data);
                }
                catch (e) {
                    console.error("JSON PARSE error", e);
                }
                onmessage(data);
                //console.log(`[message] Data received from server`, data, _data);
            };
            socket.onclose = function (event) {
                if (onclose)
                    onclose(event);
                if (event.wasClean) ;
            };
            socket.onerror = function (error) {
                if (onerror)
                    onerror(error);
            };
        }
    }, [onclose, onerror, onmessage, onopen, socket]);
    react.useEffect(function () {
        return function () {
            if (socket.close)
                socket.close(1000, "User disconnected!");
        };
    }, [socket]);
    return { connect: connect, socket: socket };
};

exports.ApiProvider = ApiProvider;
exports.AuthProvider = AuthProvider;
exports.DimensionsProvider = DimensionsProvider;
exports.EventListenerProvider = EventListenerProvider;
exports.LoadingProvider = LoadingProvider;
exports.LocalesProvider = LocalesProvider;
exports.useApi = useApi;
exports.useAuth = useAuth;
exports.useDimensions = useDimensions;
exports.useEventListener = useEventListener;
exports.useLoading = useLoading;
exports.useLocalStorage = useLocalStorage;
exports.useLocales = useLocale;
exports.useSocket = useSocket;
exports.useUtils = useUtils;
