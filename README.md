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

  

```ts

import { LocalesProvider, EventListenerProvider, SocketProvider, AuthProvider, ApiProvider, DimensionsProvider } from  '@reactivers/hooks';

const AppWrapper = ()=>{
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
	
	//Extra info for user
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

	//Return user object
	user: UserInfo,

	//Return token
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
	
	const onLogin = useCallback(()=>{
		load({
			endpoint:'/signin',
			method: "POST",
			params: { 
				username: "reactivers",
				password: "hooks"
			},
			onSuccess: response => login(response.data)
	},[load, login])

	...
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

```ts
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
	Ï
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
```ts
...
import { useApi } from  "@reactivers/hooks";
...

const ComponentWithUseApi = ({id})=>{
	const { load, response, fetching, firstTimeFetched, fetched } = useApi();

	useEffect(()=>{
		load({
			endpoint:`/products/${id}`,
			method:"POST",
			params:{
				name:"Product Name"
			},
			onSuccess: ()=>  console.log("Saved successfully!"),
			onError: ()=>  console.log("Exception!");
		})
	},[load, id])

	if(!firstTimeFetched){
		return <ShowDummyShimmerList/>

	const hasItems = response.data.length>0;

	if(fetched && !hasItems)
		return <EmptyResult/>
		
	return (
		<>
			{
				response.data.map((item)=>{
					return <span key={item.id}>{item.name}</span>
				})
				{
				fetching ?
					<ShowShimmer/>
				 	: null
				}
			}
		</>
	)
}

```


## DimensionsProvider

 A context for ```useDimensions``` hook.

### Interface
```ts

export  declare  type  Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl"
  

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

```ts
...
import { useDimensions } from  "@reactivers/hooks";
...

const ComponentWithUseDimensions = ()=>{

	const { width, height, size, isSizeEqualOrLargerThan } = useDimensions({ breakpoints: ["md"], watchWindowSize:  false });

	const  showCancelButton = size === "xs";

	const  hideOnMobile = isSizeEqualOrLargerThan("md");

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

```ts
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

```ts

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
export  declare  const  emptyFunction: () =>  void;

export  declare  const  isEqualJSON: (json1?: {}, json2?: {}) =>  boolean;

export  declare  const  deepCopy: (json?: {}) =>  any;

export  declare  const  combineReducers: (reducers: any) => (state: {}, action: any) => {};

export  declare  const  transformObj: (obj: any) => {};

export  declare  const  JSONToArray: (json: {}, key: any, valueKey: any) =>  any[];

export  declare  const  EnumToArray: (enums: any, valueKey: any, descriptionKey: any) => {

[x: number]: any;

}[];

export  declare  const  download: (newBlob: any, type: any) =>  void;

export  declare  const  downloadQRCodeById: (id: any) =>  void;

export  declare  const  downloadQRCodeBySVGElement: (QRCodeSVGElement: any, type?: string, size?: {

width?: number;

height?: number;

}) =>  void;

export  declare  const  downloadByDataURL: (dataURL: any, type: any) =>  void;

export  declare  const  bytesToSize: (bytes: any) =>  string;

export  declare  const  sum: (array?: any[]) =>  any;

export  declare  const  ArrayToJSON: (array: any, keyName: any, valueName: any) => {};

export  declare  const  formatDate: (date: any, format?: string) =>  string;

export  declare  const  isJSONEmpty: (json?: {}) =>  boolean;

export  declare  const  isArrayEmpty: (array?: any[]) =>  boolean;

export  declare  const  guid: () =>  string;

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

export  declare  const  getAddressText: (address: Address) =>  string;

export  declare  const  getUriFromImageObject: (host: string, image?: {

base64Data: any;

fileType: any;

id: any;

}) =>  string;

export  declare  const  updateObjectByName: (oldObject: {}, name: any, value: any) => {};

export  declare  const  getFirstLetters: (string?: string) =>  string;

export  declare  const  hashCode: (str: any) =>  number;

export  declare  const  generatedColorFromString: (_i: any) =>  string;

export  declare  const  destructArray: (array?: any[]) =>  any[];

export  declare  const  takeUndefinedAsTrue: (parameter: any) =>  any;

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

export  declare  const  iFetch: (payload: FetchProps) =>  void;

export  declare  const  changeColor: (color: any, amt: any) =>  string;

export  declare  const  takeIf: (condition: any, value: any, defaultValue?: any) =>  any;

export  declare  const  spliceString: (string: any, startCount: any, deleteCount: any) =>  any;

export  declare  const  dateToDescription: (date: any) =>  string;

export  declare  const  isNullOrUndefined: (item: any) =>  boolean;

export  declare  const  coalasce: (first: any, second: any) =>  any;

export  declare  const  numberShouldStartWithZero: (number: any) =>  any;

export  declare  const  getTodayYear: () =>  number;

export  declare  const  getTodayMonth: () =>  number;

export  declare  const  getMonthDescription: (_month: any) =>  string;

export  declare  const  getDatesOfYear: (year: any) =>  any[];

export  declare  const  monthsNumberArray: number[];

export  declare  const  isArrayContains: (array: any, value: any, key: any) =>  boolean;

export  declare  const  JSONArrayIndexOf: (array: any, value: any, key: any) =>  any;

export  declare  const  cos: (degree: number) =>  number;

export  declare  const  insertOrUpdateElementInArrayByKey: (array: any, idKey: any, id: any, item: any) =>  any;

export  declare  const  deleteElementFromArrayByKey: (array: any, idKey: any, id: any) =>  any;

export  declare  const  findLastIndex: (array: any, predicate: any) =>  number;
```

### Sample

```ts
...
import { useUtils } from "@reactivers/hooks";
...

const ComponentWithUseUtils = ()=>{
	
	const { takeIf } = useUtils();
	
	const text = takeIf(Math.random() > 0.5, "lucky", "unlucky");
	
	return <>{text}</>
}

```
