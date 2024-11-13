import { validateObjectProperty } from './model.utils';

export interface Song {
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isSongList(data: any): data is Song[] {
  return Array.isArray(data) && data.every(isSong);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isSong(data: any): data is Song {
  return (
    // object, not null, not array
    typeof data === 'object' &&
    data !== null &&
    !Array.isArray(data) &&
    // properties
    validateObjectProperty(data, 'name', 'string')
  );
}
