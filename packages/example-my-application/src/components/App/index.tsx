import {useMemo, useState} from 'react';
import {isolator, Contract} from 'react-iframes-syncher';

const RemoteInputContract: Contract = {
  address: 'http://localhost:8889',
  appName: 'ale-remote-input',
};

export default function App() {
  const IsolatedInput = useMemo(() => isolator(RemoteInputContract, {
    width: 500,
    height: 140,
    style: {
      border: '1px solid lightgray',
      marginTop: 12,
    },
  }), []);
  const [label, setLabel] = useState('Label');
  const [value, setValue] = useState('');

  return (
    <>
      <h1>Hosting App</h1>
      <label>Set the label name:</label>
      <input
        type="text"
        value={label}
        onChange={(event) => setLabel(event.target.value)}
      />
      <p>
        Inside the isolated app you wrote:
        <br/>
        <strong>{value}</strong>
      </p>
      <IsolatedInput
        label={label}
        type="text"
        value={value}
        onChange={setValue}
      />
    </>
  );
}
