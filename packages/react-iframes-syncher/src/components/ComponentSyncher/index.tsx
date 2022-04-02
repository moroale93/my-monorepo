import {useCallback, useEffect, useMemo, useState} from 'react';
import {useMessage} from '../../hooks/useMessage';
import {postMessage} from '../../utils/postMessage';

export default function ComponentSyncher({
  appName,
  children,
}: { appName: string, children: Function },
) {
  const [props, setProps] = useState<Record<string, unknown>>({});

  useEffect(() => {
    postMessage({
      type: `${appName}/started`,
    }, parent, '*');
  }, []);

  useMessage(`${appName}/synching`, (
      payload: { props: Record<string, unknown> },
  ) => {
    if (JSON.stringify(payload) !== JSON.stringify(props)) {
      setProps(payload);
    }
  });

  const handler = useCallback((callbackName, ...args) => {
    postMessage({
      type: `${appName}/synchingBack`,
      payload: {
        callbackName,
        args,
      },
    }, parent, '*');
  }, []);

  const mappedProps = useMemo<
    Record<'props'|'functions', Record<string, unknown>>
  >(() => {
    const ret: Record<'props'|'functions', Record<string, unknown>> = {
      props: {},
      functions: {},
    };
    Object.keys(props).forEach((key) => {
      if (props[key] === 'CALLBACK') {
        return ret.functions[key] = (...args: unknown[]) => {
          handler(key, args);
        };
      }
      ret.props[key] = props[key];
    });
    return ret;
  }, [props, handler]) || {
    props: {},
    functions: {},
  };

  if (Object.keys(props).length === 0) {
    return null;
  }

  return children({
    ...mappedProps.props,
    ...mappedProps.functions,
  });
}
