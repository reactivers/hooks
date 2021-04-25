# hooks

This package contains some useful hooks and functions that easier to develop awesome apps.

# Usage

## useApi
```js
...
import { useApi } from "@reactivers/hooks";
...

const { load, response, fetching, fetched } = useApi();

useEffect(()=>{
    load({
        endpoint:`/products/${id}`,
        method:"POST",
        params:{
            name:"Product Name"
        },
        onSuccess: ()=> console.log("Saved successfully!"),
        onError: ()=> console.log("Exception!");
    })
},[load, id])
```

## useDimensions

```js
...
import { useDimensions } from "@reactivers/hooks";
...

const { width, height, size, isSizeEqualOrLargerThan } = useDimensions();

const showCancelButton = size === "xs";
const hideOnMobile = isSizeEqualOrLargerThan("md");
```
