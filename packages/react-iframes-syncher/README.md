[![NPM version](http://img.shields.io/npm/v/react-iframes-syncher.svg)](https://www.npmjs.org/package/react-iframes-syncher)
# `react-iframes-syncher`

Iframes are perfect to fully isolate a component from the rest of the page.
It would be nice to be able to use them transparently as a normal react component, passing properties and executing callbacks.
With this library that will be possible.

## How to install it?

You just need to run:
```sh
yarn add react-iframes-syncher
```
## How to use it?

First you need to create an isolator of the component that you want to isolate.
To do this you need to import the `isolator` utility function and pass it the contract of the component you want to isolate. 
The contract is an object that contains the address of the isolated react app and its name.
PS: to prevent performance issues, remember to memoized the result.

```tsx
import {useMemo} from 'react';
import {isolator} from 'react-iframes-syncher';

const RemoteInputContract = {
  address: 'https://input.alemoretto.dev',
  appName: 'ale-remote-input',
};

export default function App() {
  const IsolatedInput = useMemo(() => isolator(RemoteInputContract), []);
  const [value, setValue] = useState('');

  return (
    <>
      <IsolatedInput value={value} onChange={setValue} />
      <p>
        Inside the isolated app you wrote: 
        <strong>{value}</strong>
      </p>
    </>
  );
}
```

The isolated app need to use the `ComponentSyncher` component to communicate with the hosting/parent app.

```tsx
import {ComponentSyncher} from 'react-iframes-syncher';

export default function InputIsolatedApp() {
  return (
    <ComponentSyncher appName="ale-remote-input">
      {(props: InputProps) => <Input {...props} />}
    </ComponentSyncher>
  );
}
```

## Demo

You can find and example of an isolated app in the [demo here](https://examplemyapplication.alemoretto.it/).