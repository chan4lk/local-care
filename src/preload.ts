// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron'
import { ElectronAPI, IPatient } from './types/electron-api';
contextBridge.exposeInMainWorld('electronAPI', {
  insertPatient: (args: IPatient) => ipcRenderer.invoke('database:insert', args),
  search: (args: {keyword: string}) => ipcRenderer.invoke('database:search', args),
  fetchPaidByDateRange: (args: { start: Date, end: Date }) => ipcRenderer.invoke('database:fetch:paid', args),
  fetchPendingTransactions: () => ipcRenderer.invoke('database:fetch:pending'),
  fetchAll: () => ipcRenderer.invoke('database:fetchall'),
} as ElectronAPI)