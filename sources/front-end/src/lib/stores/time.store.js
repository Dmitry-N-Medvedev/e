import {
  readable,
} from 'svelte/store';
// see: https://tc39.es/proposal-temporal/docs/index.html
import {
  Temporal,
  // Intl,
  toTemporalInstant,
} from '@js-temporal/polyfill';

Date.prototype.toTemporalInstant = toTemporalInstant;

export const TimeStore = readable(null, (set) => {
  const interval = setInterval(() => {
    const plainTime = Temporal.PlainTime.from((new Date()).toLocaleTimeString());

    set(`${plainTime.hour.toString().padStart(2, '0')}:${plainTime.minute.toString().padStart(2, '0')}:${plainTime.second.toString().padStart(2, '0')}`);
  }, 1000);

  return () => {
    clearInterval(interval);
  }
});