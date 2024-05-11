import Database from '../database/Database';
/* eslint-disable no-var */

declare global {
    var database: Database; // 👈️ disables type checking for property
}

export { };