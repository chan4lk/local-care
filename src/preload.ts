// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron'
import Patient from './database/models/Patient'
import { ElectronAPI } from './types/electron-api';
contextBridge.exposeInMainWorld('electronAPI', {
  insertPatient: (args: Patient) => ipcRenderer.invoke('database:insert', args),
  search: (args: {keyword: string}) => ipcRenderer.invoke('database:search', args),
  fetchAll: () => ipcRenderer.invoke('database:fetchall'),
} as ElectronAPI)