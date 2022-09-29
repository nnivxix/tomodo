// vitest-setup.ts
import { 
  indexedDB, IDBRequest, IDBTransaction, IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor
} from 'fake-indexeddb';

globalThis.indexedDB = indexedDB;
globalThis.IDBRequest = IDBRequest;
globalThis.IDBTransaction = IDBTransaction;
globalThis.IDBDatabase = IDBDatabase;
globalThis.IDBObjectStore = IDBObjectStore;
globalThis.IDBIndex = IDBIndex;
globalThis.IDBCursor = IDBCursor;