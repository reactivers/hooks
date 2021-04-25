# hooks

This package contains some useful hooks and functions that easier to develop awesome apps.

# Usage

## Sample App.js

```js
import { useEffect } from 'react';
import { ApiProvider, AuthProvider, useApi } from '@reactivers/hooks'

interface TodoItem {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

function App() {
  const { load, response } = useApi<[TodoItem]>();

  useEffect(() => {
    load({
      endpoint: "/todos"
    })
  }, [load])


  return (
    <div style={{ whiteSpace: 'pre' }}>
      {JSON.stringify(response, null, 100)}
    </div >
  );
}

const AppWrapper = () => {
  return (
    <AuthProvider >
      <ApiProvider url="https://jsonplaceholder.typicode.com">
        <App />
      </ApiProvider>
    </AuthProvider>
  )
}

export default AppWrapper;

```

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
