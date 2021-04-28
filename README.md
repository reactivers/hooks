# @reactivers/hooks


This package contains some useful hooks and functions that easier to develop awesome apps.


[![npm version](https://badge.fury.io/js/@reactivers%2Fhooks.svg)](//www.npmjs.com/package/@reactivers/hooks)


# Installation

### For npm
```sh
npm install --save @reactivers/hooks
```

### For yarn
```sh
yarn add @reactivers/hooks
```  

# Usage


## Sample App.js

```tsx
import {
    LocalesProvider,
    EventListenerProvider,
    SocketProvider,
    AuthProvider,
    ApiProvider,
    DimensionsProvider
} from '@reactivers/hooks';

const AppWrapper = ()=>{
	return (
		<LocalesProvider>
			<EventListenerProvider>
				<SocketProvider>
					<AuthProvider>
						<ApiProvider url={"https://jsonplaceholder.typicode.com"}>
							<DimensionsProvider>
								<App/>
							</DimensionsProvider>
						</ApiProvider>
					</AuthProvider>
				</SocketProvider>
			</EventListenerProvider>
		</LocalesProvider>
	)
}
```

## useLocalStorage

### Interface
```ts
interface ILocalStorage{

	//For key name of local storage item
	key: string;

	//If has no value returns this
	defaultValue?: string;
}
```

### Sample

```tsx
...
import { useLocalStorage } from "@reactivers/hooks";
...

const ComponentWithUseLocalStorage = () => {
	const { getItem, setItem, removeItem } = useLocalStorage("@reactivers/hooks");

  setItem({ "@reactivers": "Awesome Hooks" });
  console.log(getItem());
  removeItem();

  ...

}
```

## AuthProvider

A context for ```useAuth``` hook.


### Interface

```ts

interface  AuthProviderProps {

	//Reads and write from local storage by the key name
	localStorageTokenKeyName?: string; //as default token

	//Default user object
	/*
		{
			isLoggedIn:  false,
			checked:  false
		}
	*/
	user?: UserInfo; 
	
	//Call this on login
	onLogin?: (info: UserInfo) =>  void;

	//Call this on logout
	onLogout?: () =>  void;

}

interface  UserInfo {

	username?: string;

	token?: string;

	isLoggedIn: boolean;

	checked: boolean;
	
	//Extra info for user object
	userInfo?: any;

}
```

## useAuth

### Interface

```ts
interface IUserHook {
	//Call this on login
	login: (data:any)=>void,

	//Call this on logout
	logout: () => void,

	//Update user data
	setUser: (user:UserInfo)=>void,

	//Returns user object
	user: UserInfo,

	//Returns token
	token: string
}
```

### Sample

```ts
...
import { useAuth, useApi } from "@reactivers/hooks";
...

const ComponentWithUseAuth = () => {
	const { load } = useApi();
	const { login } = useAuth();
	
	const onLogin = useCallback(() => {
		load({
			endpoint:'/signin',
			method: "POST",
			params: { 
				username: "reactivers",
				password: "hooks"
			},
			onSuccess: response => login(response.data)
	}, [load, login])

	...
}
```

## useMeasure

### Interface
```ts
interface UseMeasureProps {

	//ref object for observe
    ref: React.MutableRefObject<any>;

	//If set true, will update on window resize
    updateOnWindowResize?: boolean; // Default = false

	//If passed, the hook doesn't return measures, calls only this function
    onResize?: (measure: Measure) => void;
}

interface Measure {
    left: number;
    top: number;
    width: number;
    bottom: number;
    right: number;
    x: number;
    y: number;
    height: number;
    offsetLeft: number;
    offsetTop: number;
}
```

### Sample

```tsx
...
import { useMeasure } from "@reactivers/hooks";
...


const ComponentWithUseMeasure = ()=>{

	const ref = useRef(null);
	const {
		left,
		top,
		width,
		bottom,
		right,
		x
		y,
		height,
		offsetLeft,
		offsetTop,
	} = useMeasure({
		ref,
		updateOnWindowResize: false
	});

	useMeasure({
		ref,
		updateOnWindowResize: true,
		onResize: measure => console.log("MEASURES", measure);
	});

	return (
		<div ref={ref}>
			...
		</div>
	)

}

```

## useHover

Watches mouse or touch position and returns ```isHover```

### Interface

```ts

interface HoverProps {

	//ref object for register
    ref: MutableRefObject<any>;
	
	//If set false, doesn't watch hover action
    active?: boolean;// Default = true
	
	// Axis for Mouse/Touch position. If both set true then watches inside of element.
    axis?: { 
		// Default = true
		vertical?: boolean,
		// Default = true
		horizontal?: boolean
	 };
	
	// Add extra values to real measures
    offsets?: { top?: number, right?: number, bottom?: number, left?: number };
	
	//For touch enabled devices
    updateOnTouchEnd?: boolean;// Default = true
	
	//If set true, checkes for the border values.
    includeBorders?: boolean;// Default = true
}

interface HoverResponse {

	//returns hover state
    isHover: boolean;
}
```

### Sample

```tsx
...
import { useHover } from "@reactivers/hooks";
...

const ComponentWithUseHover = () => {
	
	const ref = useRef(null);
	
	const { isHover } = useHover({
    	ref: buttonRef,
    	axis: { horizontal: true }
  	})
	  
	return(
		<div ref={ref}>
			...
		</div>
	)
}

```


## SocketProvider

A context for ```useSocket``` hook. Has no props.

## useSocket

### Interface

```ts
interface  SocketProps {
	
	//Conntect url
	url: string;
	
	// wss://... 
	wss?: boolean; //false as default

	//Disconnects connection if set True
	disconnectOnUnmount?: boolean; //true as default

	//Registers onopen event
	onOpen?: (a: any) =>  void,

	//Registers onclose event
	onClose?: (a: any) =>  void,

	//Registers onerror event
	onError?: (a: any) =>  void,

	//Registers onmessage event
	onMessage?: (a: any, data: any) =>  void
}

interface  SocketState {

	//Returns WebSocket status.
	readyState: number;

	//Returns the last data
	lastData: any;
}

interface  SocketResponse  extends  SocketState {

	//connects to url
	connect: ({ path: string }) =>  WebSocket;
	
	//socket variable
	socket: WebSocket,
	
	//Function fro sending data
	sendData: (p: any) =>  void;
}
```

### Sample

```tsx
...
import { useSocket } from "@reactivers/hooks";
...
const ComponentWithUseSocket = ()=>{

	const { readyState, lastData, sendData } = useSocket({
		url:  'echo.websocket.org/',
		wss:  true,
		disconnectOnUnmount:  false
	})

	return <>{readyState}</>
}

```


## ApiProvider

A context for ```useApi``` hook.

### Interface 

```ts
interface  ApiContextProps {

	//Sets default url for useApi hook
	url: string;
	
	//Calls on every useApi success.
	onSuccess?: (response: any) =>  void;

	//Calls on every useApi error.
	onError?: (response: any, responseJSON?: any) =>  void;
}

interface  ApiProviderProps {

	// Return default url
	url: string;

	// Return global onSuccess callback
	onSuccess?: (response: any) =>  void;
	
	// Return global onError callback
	onError?: (response: any, responseJSON?: any) =>  void;

}
```

## useApi


### Interface
```ts
  
interface  ApiPayload<T  extends {}> {

	//Overrides the url that passed to ApiProvider
	url?: string;
	
	endpoint?: string;

	method?: string,

	params?: any;
	
	// Initial value for response object
	initialValue?: T;
	
	// Use for form actions
	formData?: any,
	
	// returns response onSuccess.
	onSuccess?: (respose: any) =>  void;
	
	// returns responseJSON if the response is parsed successfully on error!
	// returns response always on error.
	onError?: (responseJSON: any, response: any) =>  void;
}
```
### Sample
```tsx
...
import { useApi } from  "@reactivers/hooks";
...

const ComponentWithUseApi = ({ id })=>{
	const { load, response, fetching, firstTimeFetched, fetched } = useApi();

	useEffect(() => {
		load({
			endpoint:`/products/${id}`,
			method:"POST",
			params:{
				name:"Product Name"
			},
			onSuccess: ()=>  console.log("Saved successfully!"),
			onError: ()=>  console.log("Exception!");
		})
	}, [load, id])

	if(!firstTimeFetched) return <ShowDummyShimmerList/>

	const hasItems = response.data.length > 0;

	if(fetched && !hasItems) return <EmptyResult/>
		
	return (
		<div>
			{
				response.data.map(( item ) => {
					return <span key={item.id}> {item.name} </span>
				})
			}
			{
				fetching ? <ShowShimmer/> : null
			}
		</div>
	)
}
```


## DimensionsProvider

 A context for ```useDimensions``` hook.

### Interface
```ts

declare  type  Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl"
  

interface  DimensionsContextProps {

	sizes: Array<Breakpoint>;

	widths: Array<number>;

}

interface  DimensionsProviderProps {

	sizes?: Array<Breakpoint>;

	widths?: Array<number>;

}

//default sizes and widths
const widths = [576, 768, 992, 1200, 1600];
const sizes = ["xs", "sm", "md", "lg", "xl", "xxl"];
```

  

## useDimensions

  Has to be wrapped by ```<DimensionsProvider/>```

### Interface

```ts
interface  DimensionProps {

	// Wathches the selected breakpoints. As default watches all breakpoints.
	breakpoints?: Array<Breakpoint>,
	
	// Watches window resize event and set state.
	watchWindowSize?: boolean;
}

interface  Dimensions {
	
	//Window width
	width: number,
	
	//Window height
	height: number,
	
	//Size as Breakpoint type
	size: Breakpoint
}
```

### Sample

```tsx
...
import { useDimensions } from  "@reactivers/hooks";
...

const ComponentWithUseDimensions = ()=>{

	const { width, height, size, isSizeEqualOrLargerThan } = useDimensions({ breakpoints: ["md"], watchWindowSize:  false });

	const showCancelButton = size === "xs";

	const hideOnMobile = isSizeEqualOrLargerThan("md");

	if(hideOnMobile) return null;

	return <>{size}</>
}

```
## useEventListener

Has to be wrapped by ```<EventListenerProvider/>```

### Interface 
```ts
interface IEventListener {
	
	//A group name for access it anywhere!
	component: string
}
```

### Sample

```tsx
...
import { useEventListener } from "@reactivers/hooks";
...  

interface IApp {
	
	getCounter: ()=> number;
	
	counter: any;
	
	incrementCounter: () => void;
	
	decrementCounter: () => void;
	
	setCounter: () => void;
}

const ComponentWithUseEventListenerRegister = ()=>{
	
	const [counter, setCounter] = useState(0);
	
	const { registerEvent, registerEventById, callAllEvents } = useEventListener<IApp>("App");

	useEffect(() => {
		return registerEvent("setCoutner", (newCounter)=> setCounter(newCounter))
	},[registerEvent])
	
	useEffect(() => {
		return registerEventById("counter","increment", ()=> setCounter(old => old + 1))
	},[registerEvent])
	
	useEffect(() => {
		return registerEventById("counter","decrement", ()=> setCounter(old => old - 1))
	},[registerEvent])

	return ...
}

const ComponentWithUseEventListenerCall = ()=>{
	const { callEvent, callAllEvents } = useEventListener<IApp>("App");
	
	const onIncrement = useCallback(() => {
		callEvent("counter", "increment")
	},[callEvent])

	const onDecrement = useCallback(() => {
		callEvent("counter", "decrement")
	},[callEvent])
	
	const onReset = useCallback(() => {
		callAllEvents("setCoutner", 0)
	},[callAllEvents])

	return ...
}

```



## LocalesProvider


A context for ```useLocale``` hook.

### Interface

```ts
interface  LocalesContextProps {

	//Current language's values
	locale: any;

	//Gets current language's value by name
	getLocale: (payload: { name: string, params?: any }) =>  string;

	//Sets active language
	setActiveLanguage: (lang: string) =>  void;
}

interface  LocalesProviderProps {
	
	//Custom local json
	locales?: any

	//Set active language as navigator.language
	activeLanguage?: string
}
```


### Sample

```tsx

import { useLocale } from "@reactivers/hooks";

const ComponentWithUseLocale = ()=>{
	const { getLocale } = useLocale();
	
	return (
		<>
			{getLocale({name: "Menu"})}
		</>
	)
}

```


## useUtils

Consists lots of useful functions.

### Interface

```ts
declare  const  emptyFunction: () =>  void;

declare  const  isEqualJSON: (json1?: {}, json2?: {}) =>  boolean;

declare  const  deepCopy: (json?: {}) =>  any;

declare  const  combineReducers: (reducers: any) => (state: {}, action: any) => {};

declare  const  transformObj: (obj: any) => {};

declare  const  JSONToArray: (json: {}, key: any, valueKey: any) =>  any[];

declare  const  EnumToArray: (enums: any, valueKey: any, descriptionKey: any) => {

[x: number]: any;

}[];

declare  const  download: (newBlob: any, type: any) =>  void;

declare  const  downloadQRCodeById: (id: any) =>  void;

declare  const  downloadQRCodeBySVGElement: (QRCodeSVGElement: any, type?: string, size?: {

width?: number;

height?: number;

}) =>  void;

declare  const  downloadByDataURL: (dataURL: any, type: any) =>  void;

declare  const  bytesToSize: (bytes: any) =>  string;

declare  const  sum: (array?: any[]) =>  any;

declare  const  ArrayToJSON: (array: any, keyName: any, valueName: any) => {};

declare  const  formatDate: (date: any, format?: string) =>  string;

declare  const  isJSONEmpty: (json?: {}) =>  boolean;

declare  const  isArrayEmpty: (array?: any[]) =>  boolean;

declare  const  guid: () =>  string;

interface  Province {

	name: string;

}

interface  District {

	name: string;	

}

interface  Address {

	province: Province;

	district: District;

}

declare  const  getAddressText: (address: Address) =>  string;

declare  const  getUriFromImageObject: (host: string, image?: {

	base64Data: any;

	fileType: any;

	id: any;

}) =>  string;

declare  const  updateObjectByName: (oldObject: {}, name: any, value: any) => {};

declare  const  getFirstLetters: (string?: string) =>  string;

declare  const  hashCode: (str: any) =>  number;

declare  const  generatedColorFromString: (_i: any) =>  string;

declare  const  destructArray: (array?: any[]) =>  any[];

declare  const  takeUndefinedAsTrue: (parameter: any) =>  any;

interface  FetchProps {

	url: string;

	endpoint: string;

	params?: any;

	method: string;

	formData?: any;

	onSuccess: (response: any) =>  void;

	onError: (error: any, errorJSON?: any) =>  void;

	token?: string;

	signal: AbortSignal;

}

declare  const  iFetch: (payload: FetchProps) =>  void;

declare  const  changeColor: (color: any, amt: any) =>  string;

declare  const  takeIf: (condition: any, value: any, defaultValue?: any) =>  any;

declare  const  spliceString: (string: any, startCount: any, deleteCount: any) =>  any;

declare  const  dateToDescription: (date: any) =>  string;

declare  const  isNullOrUndefined: (item: any) =>  boolean;

declare  const  coalasce: (first: any, second: any) =>  any;

declare  const  numberShouldStartWithZero: (number: any) =>  any;

declare  const  getTodayYear: () =>  number;

declare  const  getTodayMonth: () =>  number;

declare  const  getMonthDescription: (_month: any) =>  string;

declare  const  getDatesOfYear: (year: any) =>  any[];

declare  const  monthsNumberArray: number[];

declare  const  isArrayContains: (array: any, value: any, key: any) =>  boolean;

declare  const  JSONArrayIndexOf: (array: any, value: any, key: any) =>  any;

declare  const  cos: (degree: number) =>  number;

declare  const  insertOrUpdateElementInArrayByKey: (array: any, idKey: any, id: any, item: any) =>  any;

declare  const  deleteElementFromArrayByKey: (array: any, idKey: any, id: any) =>  any;

declare  const  findLastIndex: (array: any, predicate: any) =>  number;
```

### Sample

```tsx
...
import { useUtils } from "@reactivers/hooks";
...

const ComponentWithUseUtils = ()=>{
	
	const { takeIf } = useUtils();
	
	const text = takeIf(Math.random() > 0.5, "lucky", "unlucky");
	
	return <>{text}</>
}

```
