import axios from 'axios';
import config from '../../config';
import Session from '../Session';

const token = Session?.user?.data?.accessToken;
const accountKey = Session?.user?.data?.accountKey;

function commonHeaders() {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Version': 'v6',
  };

  if (!!token) {
    headers.Authorization = `Bearer ${token}`;
  }
  if (!!accountKey) {
    headers['x-account-key'] = accountKey;
  }

  return headers;
}

async function parseStatus(response) {
  if (['2', '3'].indexOf(response.status.toString().charAt(0)) === -1) {
    let body = null;
    // Try to get more info in response body
    try {
      body = await response.json();
    } catch (e) {
      throw response;
    }
    throw body;
  } else {
    return response;
  }
}

async function parseBody(response) {
  const contentType = response.headers['content-type'];
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.data;
  } else {
    return JSON.stringify(response.data);
  }
}

/**
 * Escape an uri query string values
 * @param uri
 * @returns {string}
 */
function escapeUriQsValues(uri) {
  let result = uri;
  const sliceIdx = result.indexOf('?');
  if (sliceIdx !== -1) {
    // escape query string values
    const search = result
      // take ends of url from '?'
      .slice(sliceIdx)
      // make array of key-value
      .split('&')
      // transform values
      .map((keyVal) => {
        // avoid split('=') to encode '=' in the value string
        const equalIdx = keyVal.indexOf('=');
        const key = keyVal.substr(0, equalIdx);
        const value = keyVal.substr(equalIdx + 1);
        return `${key}=${encodeURIComponent(value)}`;
      })
      // remake string from array
      .join('&');

    result = result.slice(0, sliceIdx) + search;
  }
  return result;
}

export class ApiManager {
  constructor(opts = {}) {
    const { endpoint } = opts;
    this.apiEndpoint = endpoint || config.apiEndpoint;
  }

  /**
   * To perform an HTTP POST request to the api
   * @param {String} path
   * @param {Object} data - data to be transmitted
   * @param {Object} headers - add or overwrite headers
   * @returns {Promise.<JSON>}
   */
  post(path, data, headers) {
    return axios
      .post(escapeUriQsValues(this.apiEndpoint + path), JSON.stringify(data), {
        headers: Object.assign(commonHeaders(), headers),
      })
      .then(parseStatus)
      .then(parseBody);
  }

  /**
   * To perform an HTTP GET request to the api
   * @param {String} path
   * @param {Object} headers - add or overwrite headers
   * @returns {Promise.<JSON>}
   */
  async get(path, headers) {
    return axios
      .get(escapeUriQsValues(this.apiEndpoint + path), {
        headers: Object.assign(commonHeaders(), headers),
      })
      .then(parseStatus)
      .then(parseBody);
  }

  /**
   * To perform an HTTP DELETE request to the api
   * @param {String} path
   * @returns {Promise.<JSON>}
   */
  async del(path) {
    return axios
      .delete(escapeUriQsValues(this.apiEndpoint + path), {
        headers: commonHeaders(),
      })
      .then(parseStatus);
  }

  /**
   * To perform an HTTP PUT request to the api
   * @param {String} path
   * @param {Object} data - data to be transmitted
   * @returns {Promise.<JSON>}
   */
  async put(path, data) {
    return axios
      .put(escapeUriQsValues(this.apiEndpoint + path), JSON.stringify(data), {
        headers: commonHeaders(),
      })
      .then(parseStatus)
      .then(parseBody);
  }

  /**
   * To perform an HTTP PATCH request to the api
   * @param {String} path
   * @param {Object} data - data to be transmitted
   * @returns {Promise.<JSON>}
   */
  async patch(path, data) {
    return axios
      .patch(escapeUriQsValues(this.apiEndpoint + path), JSON.stringify(data), {
        headers: commonHeaders(),
      })
      .then(parseStatus)
      .then(parseBody);
  }
}

export default new ApiManager();
