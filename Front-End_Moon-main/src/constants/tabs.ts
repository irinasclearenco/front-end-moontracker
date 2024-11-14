import {Tab} from '../pages/Authentication/interfaces';
import {Guest, Login, Register} from '../pages/Authentication/Tabs';

export const Tabs: Tab[] = [
  {name: 'Login', Component: Login},
  {name: 'Register', Component: Register},
  {name: 'Guest', Component: Guest},
];
