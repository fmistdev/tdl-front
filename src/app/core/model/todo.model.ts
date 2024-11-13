import { validateObjectProperty } from "./model.utils";

export interface Todo {
  id: number;
  label: string;
  dueDate: string;
  isDone: boolean;
}

export type TodoNoId = Omit<Todo, 'id'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isTodoNoIdList(data: any): data is TodoNoId[] {
    return Array.isArray(data) && data.every(isTodoNoId);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isTodoNoId(data: any): data is TodoNoId {
  return (
    // object, not null, not array
    typeof data === 'object' &&
    data !== null &&
    !Array.isArray(data) &&
    // properties
    validateObjectProperty(data,'label', 'string') &&
    validateObjectProperty(data,'dueDate', 'string') &&
    validateObjectProperty(data,'isDone', 'boolean')
  );
}




