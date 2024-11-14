import {Route} from './interfaces';
import {routeNames} from '../constants/routeNames';
import {HomeScreen, Authentication} from '../pages';
import CycleLength from '../pages/Cycle/CycleLength';
import Dashboard from '../pages/Cycle/Dashboard';
import Cabinet from '../pages/DoctorDirectory/Cabinet';
import Chat from '../pages/DoctorDirectory/Chat';
import ChatList from '../pages/DoctorDirectory/ChatList';
import CreatePosts from '../pages/DoctorDirectory/CreatePosts';
import DoctorsList from '../pages/DoctorDirectory/DoctorsList';
import PartnerPage from '../pages/PartnerPage';
import AvatarAndName from '../pages/UserData/Avatar&Name';
import Birthday from '../pages/UserData/Birthday';
import EditUserData from '../pages/UserData/EditUserData';
import Survey from '../pages/UserData/Survey';
import WayToUseApp from '../pages/UserData/WayToUseApp';
export const routes: Route[] = [
  {name: routeNames.HOME, component: HomeScreen},
  {name: routeNames.AUTHENTICATION, component: Authentication},
];
export const authRoutes: Route[] = [
  {name: routeNames.HOME, component: HomeScreen},
  {name: routeNames.DETAILS, component: Dashboard},
  {name: routeNames.CABINET, component: Cabinet},
  {name: routeNames.AUTHENTICATION, component: Authentication},
  {name: routeNames.WAYTOUSE, component: WayToUseApp},
  {name: routeNames.BIRTHDAY, component: Birthday},
  {name: routeNames.AVATARANDNAME, component: AvatarAndName},
  {name: routeNames.SURVEY, component: Survey},
  {name: routeNames.CYCLELENGTH, component: CycleLength},
  {name: routeNames.EDITUSERDATA, component: EditUserData},
  {name: routeNames.CHAT, component: Chat},
  {name: routeNames.CHATLIST, component: ChatList},
  {name: routeNames.DOCTORSLIST, component: DoctorsList},
  {name: routeNames.CREATEPOSTS, component: CreatePosts},
  {name: routeNames.PARTNER, component: PartnerPage},
];
