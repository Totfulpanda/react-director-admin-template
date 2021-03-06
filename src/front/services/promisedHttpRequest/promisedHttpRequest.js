// @flow

import { getLocationOrigin } from '../fetchTools';

const BASE_URL = getLocationOrigin();

export const promisedHttpRequest = (
  endpoint: string,
  options: any,
  onProgressCallback: () => any,
) => {
  request('GET', `${BASE_URL}/${endpoint}`, options, onProgressCallback);
};

function request(
  method: string = 'get',
  url: string = '',
  opts: any = {},
  onProgress: () => any,
) {
  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();

    xhr.open(opts.method || method, url);

    Object.keys(opts.headers || {}).forEach(headerKey => {
      xhr.setRequestHeader(headerKey, opts.headers[headerKey]);
    });

    // $FlowIgnore
    xhr.onload = e => res(e.target.responseText || '');

    xhr.onerror = rej;

    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
    }

    xhr.send(opts.body);
  });
}
