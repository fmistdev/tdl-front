import { from, Observable } from 'rxjs';

export class TodoStore {
  static dbName = 'tdl-app-Database';
  static dbVersion = 13;
  static storeName = 'todos';
  static storeKeyPath = 'id';
  static db: IDBDatabase | null = null;

  static openIndexedDatabase(): Observable<void> {
    return from(
      new Promise<void>((resolve, reject) => {
        console.log(
          `opening indexed database "${this.dbName}" version ${this.dbVersion}`
        );
        const idbRequestOpen = indexedDB.open(this.dbName, this.dbVersion);

        idbRequestOpen.onupgradeneeded = this.onUpgradeNeeded;

        idbRequestOpen.onerror = (event: Event) => {
          const err = (event.target as IDBRequest).error;

          // One of the common possible errors when opening a database is VER_ERR.
          // It indicates that the version of the database stored on the disk is greater than the version that you are trying to open.
          // This is an error case that must always be handled by the error handler.
          if (err?.name === 'VersionError') {
            console.error('Cannot open indexedDB: VersionError.', err);
          } else {
            console.error('Cannot open indexedDB.', err);
          }
          // should stop the app ?
          reject(err);
        };

        idbRequestOpen.onsuccess = (event: Event) => {
          console.log('open indexedDb success');
          const db = (event.target as IDBRequest).result;

          // Generic error handler for all errors targeted at this database's  requests!
          db.onerror = (event: Event) => {
            const err = (event.target as IDBRequest).error;
            console.error(`Database error:`, err);
          };

          this.db = db;
          resolve();
        };
      })
    );
  }

  // a reprendre
  private static onUpgradeNeeded = (event: IDBVersionChangeEvent) => {
    console.warn('indexed database upgrade needed', event);

    const db = (event.target as IDBRequest).result as IDBDatabase;
    const objectStoreNames = Array.from(db.objectStoreNames);

    // remove possible other objects
    objectStoreNames
      .filter((n) => n !== this.storeName)
      .forEach((name) => {
        console.log(`deleteObjectStore ${name}`);
        db.deleteObjectStore(name);
      });

    if (!db.objectStoreNames.contains(this.storeName)) {
      console.log(`Object store '${this.storeName}' does not exist. Create.`);
      const store = db.createObjectStore(this.storeName, {
        keyPath: this.storeKeyPath,
        autoIncrement: true,
      });

      store.createIndex(`index_{this.storeKeyPath}`, this.storeKeyPath, {
        unique: true,
      });
    }
  };

  static getTransaction(mode: IDBTransactionMode): IDBTransaction {
    if (!this.db) {
      throw new Error('Database is not initialized');
    }
    return this.db.transaction([this.storeName], mode);
  }

  static getStore(transaction: IDBTransaction): IDBObjectStore {
    return transaction.objectStore(this.storeName);
  }

  static getTransactionStore(mode: IDBTransactionMode): IDBObjectStore {
    if (!this.db) {
      throw new Error('Database is not initialized');
    }
    const transaction = this.db.transaction([this.storeName], mode);
    return transaction.objectStore(this.storeName);
  }
}
