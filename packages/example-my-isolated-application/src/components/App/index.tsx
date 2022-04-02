import {ComponentSyncher} from 'react-iframes-syncher';
import {ChangeEvent, InputHTMLAttributes} from 'react';

type InputIsolatedProps =
Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  onChange: (value: string) => void;
  label: string;
}

export default function InputIsolatedApp() {
  return (
    <ComponentSyncher appName="ale-remote-input">
      {({onChange, label, ...props}: InputIsolatedProps) => (
        <>
          <h1>Isolated Component&apos;s App</h1>
          <label>{label}</label>
          <input
            {...props}
            onChange={onChange &&
              function(event: ChangeEvent<HTMLInputElement>) {
                onChange(event.target.value);
              }
            }
          />
        </>
      )}
    </ComponentSyncher>
  );
}
