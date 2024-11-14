import {io} from 'socket.io-client';

export const baseUrl: string = 'http://192.168.44.30:3000';
// export const baseUrl: string = 'http://192.168.0.47:3000';
// export const baseUrl: string = 'http://192.168.100.109:3000';
// export const baseUrl: string = 'http://172.20.10.3:3000';
export const socket = io(baseUrl);
