export const postMessage = (
    data: unknown,
    target: Window,
    origin = '*',
) => target.postMessage(data, origin);
