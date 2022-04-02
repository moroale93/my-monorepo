import React, {
  IframeHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReactIFrame from '../components/ReactIFrame';
import {useMessage} from '../hooks/useMessage';
import {postMessage} from './postMessage';
import {Contract} from './types';

export default function isolator(
    {address, appName}: Contract,
    iframeProps: IframeHTMLAttributes<HTMLIFrameElement>,
) {
  return function IsolatedConponent(
      props: Record<string, unknown>,
  ): React.ReactElement {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [started, setStarted] = useState(false);

    useMessage(`${appName}/started`, () => {
      if (!started) {
        setStarted(true);
      }
    });

    // To get updates from the isolated app, we need to listen to messages
    useMessage(`${appName}/synchingBack`, (
        payload: {
          callbackName: string,
          args: unknown[],
      },
    ) => {
      (props[payload.callbackName] as Function)(...payload.args);
    });

    // To pass the properties when they update
    useEffect(() => {
      const iframe: HTMLIFrameElement | undefined | null =
      iframeRef?.current?.querySelector('iframe');
      if (started &&
        iframe !== undefined &&
        iframe !== null &&
        iframe.contentWindow
      ) {
        const propsToSend: Record<string, unknown> = {};
        Object.keys(props).forEach((key) => {
          if (typeof props[key] === 'function') {
            return propsToSend[key] = 'CALLBACK';
          }
          propsToSend[key] = props[key];
        });
        postMessage({
          type: `${appName}/synching`,
          payload: propsToSend,
        }, iframe.contentWindow);
      }
    }, [props, iframeRef.current, started]);

    return (
      <div ref={iframeRef} style={{display: 'inline'}}>
        <ReactIFrame {...iframeProps} src={address} />
      </div>
    );
  };
}
