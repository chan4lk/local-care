import Database from '../database/Database';
import { ElectronAPI } from './electron-api';
/* eslint-disable no-var */

declare global {
    var database: Database; // 👈️ disables type checking for property
    var electronAPI: ElectronAPI;
}

export { };