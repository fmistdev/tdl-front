import { Injectable } from '@angular/core';
import { TodoNoId, Todo } from '../../model/todo.model';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { TodoStore } from './indexeddb.utils';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todoList$ = new BehaviorSubject<Todo[]>([]);

  constructor() {
    TodoStore.openIndexedDatabase().subscribe({
      next: () => {
        this.loadAll();
      },
    });
  }

  private loadAll(): void {
    console.log('IndexedDB: loadAll todos');
    const objectStore = TodoStore.getTransactionStore('readonly');
    const getAllRequest = objectStore.getAll();

    getAllRequest.onsuccess = (event) => {
      const todoList = (event.target as IDBRequest).result as Todo[];
      this.todoList$.next(todoList);
    };

    getAllRequest.onerror = (event) => {
      const err = (event.target as IDBRequest).error;
      console.error('Cannot get all todos', err);
      this.todoList$.error(err);
    };
  }

  getAll(): Observable<Todo[]> {
    return this.todoList$;
  }

  createAll(todoNoIdList: TodoNoId[]): Observable<void> {
    return from(
      new Promise<void>((resolve, reject) => {
        const transaction = TodoStore.getTransaction('readwrite');
        const objectStore = TodoStore.getStore(transaction);

        todoNoIdList.forEach((todoNoId) => {
          const request = objectStore.add(todoNoId);

          request.onsuccess = () => {
            console.log(`create Todo: ${todoNoId.label.substring(0, 5)}...`);
          };

          request.onerror = (event: Event) => {
            const err = (event.target as IDBRequest).error;
            console.error('Cannot create todo', todoNoId, err);
          };
        });

        // Gère la fin de la transaction
        transaction.oncomplete = () => {
          console.log('Tous les items ont été ajoutés avec succès.');
          this.loadAll();
          resolve();
        };

        transaction.onerror = (event) => {
          const err = (event.target as IDBRequest).error;
          console.error('Erreur dans la transaction:', err);
          reject(err);
        };
      })
    );
  }

  create(todo: Todo | TodoNoId): Observable<number> {
    console.log('IndexedDB: create todo', todo);

    // remove id if present, because of the auto-increment in db
    const omitIdTodo: Partial<Todo> = { ...todo };
    delete omitIdTodo['id'];

    return from(
      new Promise<number>((resolve, reject) => {
        const objectStore = TodoStore.getTransactionStore('readwrite');
        const request = objectStore.add(omitIdTodo);
        request.onsuccess = () => {
          const id = request.result as number;
          resolve(id);
          this.loadAll();
        };
        request.onerror = (event: Event) => {
          const err = (event.target as IDBRequest).error;
          console.error('Cannot create todo', omitIdTodo, err);
          reject(err);
        };
      })
    );
  }

  update(todo: Todo): Observable<void> {
    console.log('IndexedDB: update', todo);
    return from(
      new Promise<void>((resolve, reject) => {
        const objectStore = TodoStore.getTransactionStore('readwrite');
        const request = objectStore.put(todo);
        request.onsuccess = () => {
          resolve();
          this.loadAll();
        };
        request.onerror = (event: Event) => {
          const err = (event.target as IDBRequest).error;
          console.error('Cannot update todo', todo, err);
          reject(err);
        };
      })
    );
  }

  delete(todoId: number): Observable<void> {
    console.log('IndexedDB: delete', todoId);
    return from(
      new Promise<void>((resolve, reject) => {
        const objectStore = TodoStore.getTransactionStore('readwrite');
        const request = objectStore.delete(todoId);
        request.onsuccess = () => {
          resolve();
          this.loadAll();
        };
        request.onerror = (event: Event) => {
          const err = (event.target as IDBRequest).error;
          console.error('Cannot delete todo', todoId, err);
          reject(err);
        };
      })
    );
  }

  deleteAll(): Observable<void> {
    console.info('IndexedDB: deleteAll');
    return from(
      new Promise<void>((resolve, reject) => {
        const objectStore = TodoStore.getTransactionStore('readwrite');
        const request = objectStore.clear();
        request.onsuccess = () => {
          resolve();
          this.loadAll();
        };
        request.onerror = (event: Event) => {
          const err = (event.target as IDBRequest).error;
          console.error('Cannot delete all todo', err);
          reject(err);
        };
      })
    );
  }
}
