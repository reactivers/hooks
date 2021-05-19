declare global {
    interface Window {
        createObjectURL: (object: any) => string;
        revokeObjectURL: (object: any) => string;
    }
}
export declare const isBrowser: () => boolean;
export declare const emptyFunction: () => void;
export declare const setIfNotEqual: (variable: any, value: any) => void;
export declare const tryJSONparse: (obj: any) => any;
export declare const tryJSONStringify: (obj: any) => any;
export declare const transform: (value: number, actualRange: [number, number], targetRange: [number, number]) => number;
export declare const memoComparer: <T>(prevProps: T, nextProps: T, props: Array<keyof T>) => boolean;
export declare const isPointInRect: (point: {
    x: number;
    y: number;
}, rect: {
    top: number;
    right: number;
    bottom: number;
    left: number;
}, includeBorders?: boolean) => boolean;
declare type Grow<T, A extends Array<T>> = ((x: T, ...xs: A) => void) extends (...a: infer X) => void ? X : never;
declare type GrowToSize<T, A extends Array<T>, N extends number> = {
    0: A;
    1: GrowToSize<T, Grow<T, A>, N>;
}[A['length'] extends N ? 0 : 1];
export declare type FixedArray<T, N extends number> = GrowToSize<T, [], N>;
export declare const isInRange: (range: FixedArray<number, 2>, num: number, includeFrom?: boolean, includeTo?: boolean) => boolean;
export declare const deepCompare: (obj1: object | JSON | ArrayLike<JSON>, obj2: object | JSON | ArrayLike<JSON>) => boolean;
export declare const getIsWebkit: () => boolean;
export declare const isEqualJSON: (json1?: {}, json2?: {}) => boolean;
export declare const deepCopy: (json?: {}) => any;
export declare const combineReducers: (reducers: any) => (state: {}, action: any) => {};
export declare const transformObj: (obj: any) => {};
export declare const JSONToArray: (json: {}, key: any, valueKey: any) => any[];
export declare const EnumToArray: (enums: any, valueKey: any, descriptionKey: any) => {
    [x: number]: any;
}[];
export declare const download: (newBlob: any, type: any) => void;
export declare const downloadQRCodeById: (id: any) => void;
export declare const downloadQRCodeBySVGElement: (QRCodeSVGElement: any, type?: string, size?: {
    width?: number;
    height?: number;
}) => void;
export declare const downloadByDataURL: (dataURL: any, type: any) => void;
export declare const bytesToSize: (bytes: any) => string;
export declare const sum: (array?: any[]) => any;
export declare const ArrayToJSON: (array: any, keyName: any, valueName: any) => {};
export declare const isJSONEmpty: (json?: {}) => boolean;
export declare const isArrayEmpty: (array?: any[]) => boolean;
export declare const guid: () => string;
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
export declare const getAddressText: (address: Address) => string;
export declare const getUriFromImageObject: (host: string, image?: {
    base64Data: any;
    fileType: any;
    id: any;
}) => string;
export declare const updateObjectByName: (oldObject: {}, name: any, value: any) => {};
export declare const getFirstLetters: (string?: string) => string;
export declare const hashCode: (str: any) => number;
export declare const generatedColorFromString: (_i: any) => string;
export declare const destructArray: (array?: any[]) => any[];
export declare const takeUndefinedAsTrue: (parameter: any) => any;
export declare type ResponseContentType = "JSON" | "BLOB" | "FORM-DATA" | "TEXT" | "ARRAY-BUFFER" | "RAW";
export interface IFetch extends RequestInit {
    url: string;
    body?: any;
    method?: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
    stringify?: boolean;
    responseContentType?: ResponseContentType;
}
export declare const applicationJSONHeader: {
    "Content-Type": string;
};
export declare const iFetch: (payload: IFetch) => Promise<Response>;
export declare const changeColor: (color: any, amt: any) => string;
export declare const takeIf: (condition: any, value: any, defaultValue?: any) => any;
export declare const spliceString: (string: any, startCount: any, deleteCount: any) => any;
export declare const isNullOrUndefined: (item: any) => boolean;
export declare const coalasce: (first: any, second: any) => any;
export declare const numberShouldStartWithZero: (number: any) => any;
export declare const getTodayYear: () => number;
export declare const getTodayMonth: () => number;
export declare const monthsNumberArray: number[];
export declare const isArrayContains: (array: any, value: any, key: any) => boolean;
export declare const JSONArrayIndexOf: (array: any, value: any, key: any) => any;
export declare const cos: (degree: number) => number;
export declare const insertOrUpdateElementInArrayByKey: (array: any, idKey: any, id: any, item: any) => any;
export declare const deleteElementFromArrayByKey: (array: any, idKey: any, id: any) => any;
export declare const findLastIndex: (array: Array<any>, predicate: (c: any) => boolean) => number;
export {};
