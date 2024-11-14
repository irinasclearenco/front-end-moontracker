import {FC} from 'react';

export interface Route {
  name: any;
  component: FC;
}
export interface RouteName {
  HOME: string;
  DETAILS: string;
  AUTHENTICATION: string;
  WAYTOUSE: string;
  BIRTHDAY: string;
  AVATARANDNAME: string;
  SURVEY: string;
  CYCLELENGTH: string;
  EDITUSERDATA: string;
  CABINET: string;
  CHAT: string;
  CREATEPOSTS: string;
  CHATLIST: string;
  DOCTORSLIST: string;
  PARTNER: string;
}
