import {useState, useEffect, useCallback} from 'react';

export const useMessage = (watch: unknown, eventHandler: Function) => {
  const [origin, setOrigin] = useState();
  const [source, setSource] = useState();

  const onWatchEventHandler = useCallback(({origin, source, data}) => {
    const {type, payload} = data;
    if (type === watch) {
      setSource(source);
      setOrigin(origin);
      eventHandler(payload);
    }
  }, [watch, eventHandler, setSource, setOrigin]);

  useEffect(() => {
    window.addEventListener('message', onWatchEventHandler);
    return () => window.removeEventListener('message', onWatchEventHandler);
  }, [watch, source, origin, onWatchEventHandler]);

  return null;
};
