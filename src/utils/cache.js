import { baseCacheOptions } from '../constants';

/**
 * Class to manage a session-based cache that
 * survives page reloads and has a definitive ttl.
 * 
 * @see https://www.sohamkamani.com/blog/javascript-localstorage-with-ttl-expiry/
 * 
 * Thanks to Soham Kamani for inspiration with this approach.
 */
export default class Cache {
  options;
  data;

  constructor(options = baseCacheOptions) {
    this.options = { ...baseCacheOptions, ...options };
    this.data = {};
    this._loadFromSessionStorage();
  }

  _loadFromSessionStorage() {
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      const item = sessionStorage.getItem(key);
      this.data[key] = item;
    }
  }

  set(key, value, ttl = null) {
    const currentDateTime = new Date().getTime();
    const expirationTime = new Date(currentDateTime + ((ttl || this.options.stdTtl) * 60000));

	  const item = {
	    data: value,
	    expiration: expirationTime,
	  };
    // Only add the item if the max num of items has not reached
	  if (Object.keys(this.data).length < this.options.maxNumItems)
      sessionStorage.setItem(key, JSON.stringify(item))
  }

  getAll() {
    return this.data;
  }

  get(key) {
    const sessionValue = sessionStorage.getItem(key);
    if (!sessionValue) return null;

    const item = JSON.parse(sessionValue);
	  const now = new Date();
	  if (now.getTime() > item.expiration) {
	    (this.options.deleteOnExpire) && sessionStorage.removeItem(key);
		  return null;
	  }

	  return item.data;
  }

  clear(key) {
    const sessionValue = sessionStorage.getItem(key);
    if (!sessionValue) return false;

    sessionStorage.clear(key);
    return true;
  }

  clearAll() {
    sessionStorage.clear();
  }
}