import moment from "moment";
import 'moment/min/locales.min'

declare global {
    interface Window {
        createObjectURL: (object: any) => string;
        revokeObjectURL: (object: any) => string;
    }
}
export const isBrowser = () => {
    return typeof window !== "undefined"
}

export const emptyFunction = () => { };

export const setIfNotEqual = (variable: any, value: any) => {
    if (variable !== value) variable = value;
}

export const transform = (
    value: number,
    actualRange: [number, number],
    targetRange: [number, number]
) => {
    const [minActualRange, maxActualRange] = actualRange;
    const [minTargetRange, maxTargetRange] = targetRange;

    if (value >= maxActualRange) return maxTargetRange;
    if (value <= minActualRange) return minTargetRange;

    const tranformedValue =
        ((value - minActualRange) / (maxActualRange - minActualRange)) *
        (maxTargetRange - minTargetRange) +
        minTargetRange;
    return tranformedValue;
};

export const memoComparer: <T>(prevProps: T, nextProps: T, props: Array<keyof T>) => boolean = (
    prevProps,
    nextProps,
    props
) => {
    if (Object.keys(prevProps).length !== Object.keys(nextProps).length) return false;
    let isEqual = true;
    props.forEach((prop) => {
        if (isEqual) {
            isEqual = prevProps[prop] === nextProps[prop];
        }
    });
    return isEqual;
};

export const isPointInRect = (
    point: { x: number; y: number },
    rect: { top: number; right: number; bottom: number; left: number },
    includeBorders = false
) => {
    const { x, y } = point;
    const { top, right, bottom, left } = rect;
    if (top === bottom || right === left) return false;
    if (includeBorders) return x >= left && x <= right && y >= top && y <= bottom;
    return x > left && x < right && y > top && y < bottom;
};

type Grow<T, A extends Array<T>> = ((x: T, ...xs: A) => void) extends (...a: infer X) => void
    ? X
    : never;
type GrowToSize<T, A extends Array<T>, N extends number> = {
    0: A;
    1: GrowToSize<T, Grow<T, A>, N>;
}[A['length'] extends N ? 0 : 1];

export type FixedArray<T, N extends number> = GrowToSize<T, [], N>;

export const isInRange = (
    range: FixedArray<number, 2>,
    num: number,
    includeFrom: boolean = true,
    includeTo: boolean = true
) => {
    const [from, to] = range;
    const checkFrom = includeFrom ? num >= from : num > from;
    const checkTo = includeTo ? num <= to : num < to;
    return checkFrom && checkTo;
};

export const deepCompare = (
    obj1: object | JSON | ArrayLike<JSON>,
    obj2: object | JSON | ArrayLike<JSON>
) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const getIsWebkit = () => {
    const UA = navigator.userAgent;
    return (
        /\b(iPad|iPhone|iPod)\b/.test(UA) && /WebKit/.test(UA) && !/Edge/.test(UA) && !window.MSStream
    );
};

export const isEqualJSON = (json1 = {}, json2 = {}) => {
    return JSON.stringify(json1) === JSON.stringify(json2);
}

export const deepCopy = (json = {}) => {
    return JSON.parse(JSON.stringify(json));
}

export const combineReducers = (reducers) => {
    return (state = {}, action) => {
        const newState = {};
        for (let key in reducers) {
            newState[key] = reducers[key](state[key], action);
        }
        return newState;
    }
}

export const transformObj = obj => {
    return Object.keys(obj).reduce((acc, key) => {
        if (key.indexOf('.') >= 0) {
            const [parentKey, childKey] = key.split('.');
            acc[parentKey] = acc[parentKey] || {};
            acc[parentKey][childKey] = obj[key];
        } else {
            acc[key] = obj[key];
        }
        return acc;
    }, {});
};

export const JSONToArray = (json = {}, key, valueKey) => {
    return Object.keys(json).map(_key => ({
        ...(valueKey ? { [valueKey]: json[_key] } : json[_key]),
        [key]: _key
    }))
}

export const EnumToArray = (enums, valueKey, descriptionKey) => {
    return Object.keys(enums).map(_key => ({
        [valueKey]: _key,
        [descriptionKey]: enums[_key]
    }))
}

export const download = (newBlob, type) => {

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
    }

    const url = window.URL || window.webkitURL || window;
    const dataURL = url.createObjectURL(newBlob);
    downloadByDataURL(dataURL, type)
}

export const downloadQRCodeById = (id) => {
    const QRCodeSVGElement = document.getElementById(id);
    downloadQRCodeBySVGElement(QRCodeSVGElement);
}

export const downloadQRCodeBySVGElement = (QRCodeSVGElement, type = 'png', size?: { width?: number, height?: number }) => {
    const { width: _width, height: _height } = size;
    const width = _width || 300, height = _height || 300;
    const clonedQRCodeSVGElement = QRCodeSVGElement.cloneNode(true);
    const outerHTML = clonedQRCodeSVGElement.outerHTML
    const blob = new Blob([outerHTML], { type: 'image/svg+xml;charset=utf-8' });
    const URL = window.URL || window.webkitURL || window;
    const blobURL = URL.createObjectURL(blob);

    if (type === "svg") {
        downloadByDataURL(blobURL, "svg")
        return;
    }

    const img = new Image();
    img.width = width;
    img.height = height;


    let canvas = document.createElement('canvas');
    document.body.appendChild(canvas)
    canvas.width = width;
    canvas.height = height;
    let context = canvas.getContext('2d');
    img.onload = function () {
        // draw image in canvas starting left-0 , top - 0
        context.drawImage(img, 0, 0, width, height);
        const dataURL = canvas.toDataURL("image/png");
        //return;
        downloadByDataURL(dataURL, "png");
        document.body.removeChild(canvas);
    }
    img.src = blobURL;
}

export const downloadByDataURL = (dataURL, type) => {
    const link = document.createElement('a');
    const n = dataURL.lastIndexOf('/');
    //debugger;
    const filname = dataURL.substring(n + 1, dataURL.length);
    link.href = dataURL;
    link.target = '_blank_';
    if (type) {
        link.download = `${filname}.${type}`;
    } else {
        link.download = `${filname}.jpg`;
    }

    link.click();

    const URL = window.URL || window.webkitURL || window;
    setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
        URL.revokeObjectURL(dataURL);
    }, 100);
}

export const bytesToSize = (bytes) => {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    var i = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`);
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
}

export const sum = (array = []) => {
    if (!array.length)
        return 0
    if (array.length === 1)
        return array[0]
    return array.reduce((i1, i2) => i1 + i2)
}

export const ArrayToJSON = (array, keyName, valueName) => {
    const json = {};
    array.forEach(i => {
        json[i[keyName]] = valueName ? i[valueName] : i;
    })
    return json
}

export const formatDate = (date, format = "DD MMMM YYYY") => {
    return moment(date).format(format)
}

export const isJSONEmpty = (json = {}) => {
    return !Object.keys(json).length
}

export const isArrayEmpty = (array = []) => {
    return !array.length
}

export const guid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


interface Province {
    name: string;
}

interface District {
    name: string;
}

interface Address {
    province: Province;
    district: District;
}

export const getAddressText = (address: Address) => {
    const { province, district } = address;
    const { name: provinceName } = province || {}
    const { name: districtName } = district || {}
    return (provinceName || "") + " - " + (districtName || "");
}

export const getUriFromImageObject = (host: string, image = { base64Data: undefined, fileType: undefined, id: undefined }) => {
    if (image.base64Data) {
        return `data:${image.fileType};base64,${image.base64Data}`
    } else if (image.id) {
        return `${host}/attachments/${image.id}`
    } else {
        return undefined
    }
}

export const updateObjectByName = (oldObject = {}, name, value) => {
    const newObject = { ...deepCopy(oldObject) };
    newObject[name] = value;
    return transformObj(newObject);
}

export const getFirstLetters = (string = "") => {
    return string.split(" ").map(i => i[0]).join("")
}

export const hashCode = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

export const generatedColorFromString = (_i) => {
    const i = hashCode(_i);
    const c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "#" + "00000".substring(0, 6 - c.length) + c;
}

export const destructArray = (array = []) => {
    const result = [];
    array.forEach(i => {
        result.push(...i)
    })
    return result;
}

export const takeUndefinedAsTrue = (parameter: any) => {
    return parameter === undefined ? true : parameter;
}

interface FetchProps {
    url: string,
    endpoint: string,
    params?: any,
    method: string,
    formData?: any,
    onSuccess: (response: any) => void,
    onError: (error: any, errorJSON?: any) => void,
    token?: string
    signal: AbortSignal
}

export const iFetch = (payload: FetchProps) => {
    const { url: _url, signal, endpoint, method, params, formData, token, onSuccess, onError } = payload;
    const url = `${_url}${endpoint}`;
    const body = params ? JSON.stringify(params) : formData;

    const headers: HeadersInit = {
        "Content-Type": "application/json"
    }

    if (token)
        headers["Authorization"] = "Bearer " + token;

    if (formData) {
        delete headers["Content-Type"]
    }

    fetch(url, {
        signal,
        method: method || (params || formData ? "POST" : "GET"),
        body,
        headers
    })
        .then(i => {
            const contentType = (i.headers.get('Content-Type') || '').split(";")[0];
            if (i.ok) {
                switch (contentType) {
                    case 'application/json':
                        i.json().then(i2 => {
                            if (i2 instanceof Array)
                                onSuccess(i2)
                            else if (i2.success !== undefined && !i2.success)
                                onError(i, i2)
                            else onSuccess(i2)
                        }, (error) => {
                            console.error(url, error)
                            onSuccess({})
                        });
                        break;
                    default:
                        i.blob().then(blob => {
                            onSuccess(new Blob([blob], { type: contentType }));
                        })
                        break;
                }
            } else if (i.status === 400) {
                console.error("status 400 error", url, i)
                i.json().then(i2 => {
                    onError(i, i2)
                })
            } else {
                onError(i)
            }
        }).catch(e => {
            console.error("e", e)
            onError(e)
        });
}

export const changeColor = (color, amt) => {
    var usePound = false;
    let col = color + "";
    if (col[0] === "#") {
        col = col.slice(1);
        usePound = true;
    }
    var num = parseInt(col, 16);
    var r = (num >> 16) + amt;
    if (r > 255) {
        r = 255;
    } else if (r < 0) {
        r = 0;
    }
    var b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255) {
        b = 255;
    } else if (b < 0) {
        b = 0;
    }
    var g = (num & 0x0000FF) + amt;
    if (g > 255) {
        g = 255;
    } else if (g < 0) {
        g = 0;
    }
    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

export const takeIf = (condition, value, defaultValue = undefined) => {
    if (condition) {
        return value
    } else {
        return defaultValue
    }
}

export const spliceString = (string, startCount, deleteCount) => {
    return string.split("").splice(startCount, deleteCount).join("");
}

export const dateToDescription = (date) => {
    const momentDay = moment(date, "YYYY-MM-DD");
    const momentToday = moment(new Date(), "YYYY-MM-DD");
    const dayDiff = momentToday.diff(momentDay, 'days');
    const monthDiff = momentToday.diff(momentDay, 'month');
    if (dayDiff === 1)
        return `Dün`;
    else if (dayDiff) {
        return `${monthDiff || dayDiff} ${monthDiff ? "ay" : "gün"} önce`
    } else {
        return "Bugün"
    }
}

export const isNullOrUndefined = item => {
    return item === null || item === undefined
}

export const coalasce = (first, second) => {
    if (isNullOrUndefined(first))
        return second
    return first
}

export const numberShouldStartWithZero = number => {
    return parseInt(number) < 10 ? `0${number}` : number
}

export const getTodayYear = () => {
    return new Date().getFullYear();
}

export const getTodayMonth = () => {
    return new Date().getMonth() + 1;
}

export const getMonthDescription = _month => {
    const month = numberShouldStartWithZero(_month);
    return moment(`2020-${month}-01`).format("MMMM");
}

export const getDatesOfYear = year => {
    let date = moment(`${year}-01-01`);
    let currentYear = year;
    const dates = [];
    while (currentYear === year) {
        dates.push(date.format("YYYY-MM-DD"));
        date = moment(date).add(1, 'day')
        currentYear = date.get("year");
    }
    return dates;
}
export const monthsNumberArray = Array(12).fill(0).map((_, index) => ((index) % 12) + 1)

export const isArrayContains = (array, value, key) => {
    return !!array.filter(i => i[key] === value).length
}

export const JSONArrayIndexOf = (array, value, key) => {
    return array.map(i => i[key]).indexOf(value);
}

export const cos = (degree: number) => {
    const value = Math.cos(((degree * Math.PI) as number) / 180);
    return parseFloat(value.toFixed(2))
}

export const insertOrUpdateElementInArrayByKey = (array, idKey, id, item) => {
    const idKeys = array.map(i => i[idKey]);
    const indexOfElement = idKeys.indexOf(id);
    if (indexOfElement > -1)
        array[indexOfElement] = item;
    else
        array.push(item)
    return array
}

export const deleteElementFromArrayByKey = (array, idKey, id) => {
    const idKeys = array.map(i => i[idKey]);
    const indexOfElement = idKeys.indexOf(id);
    if (indexOfElement > -1)
        array.splice(indexOfElement, 1);
    return array
}

export const findLastIndex = (array, predicate) => {
    if (!array) return -1;
    let index = array.length - 1
    if (!predicate) return index;
    for (index; index--; index > -1) {
        if (predicate(array[index])) break;
    }
    return index;
}
