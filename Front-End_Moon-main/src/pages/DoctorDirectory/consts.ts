import ChatList from './ChatList';
import DoctorData from './DoctorData';
import Research from './Research';
import {
  ChatIcon,
  ChatIconOutline,
  PersonIcon,
  PersonOutlineIcon,
  SearchIcon,
} from '../../assets/Icons';

export const TabDoctorContent = [
  {
    activeTabIcon: ChatIcon,
    icon: ChatIconOutline,
    component: ChatList,
    name: 'Chat',
  },
  {
    activeTabIcon: SearchIcon,
    icon: SearchIcon,
    component: Research,
    name: 'Research',
  },
  {
    activeTabIcon: PersonIcon,
    icon: PersonOutlineIcon,
    component: DoctorData,
    name: 'DoctorData',
  },
];
