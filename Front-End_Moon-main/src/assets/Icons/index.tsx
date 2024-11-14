import {Icon, IconElement, IconProps} from '@ui-kitten/components';
import * as React from 'react';

export const AlertIcon = (props): IconElement => (
  <Icon {...props} name="alert-circle-outline" fill="black" />
);
export const FacebookIcon = (props: any): IconElement => <Icon name="facebook" {...props} />;
export const GoogleIcon = (props: any) => <Icon name="google" {...props} />;
export const BackIcon = (props: any): IconElement => <Icon {...props} name="arrow-back" />;
export const CalendarIcon = (props: any): IconElement => <Icon {...props} name="calendar" />;
export const CalendarIconOutline = (props): IconElement => (
  <Icon {...props} name="calendar-outline" />
);
export const ChatIcon = (props: any): IconElement => <Icon {...props} name="message-circle" />;
export const ChatIconOutline = (props: any): IconElement => (
  <Icon {...props} name="message-circle-outline" />
);

export const BellIconOutline = (props): IconElement => <Icon {...props} name="bell-outline" />;
export const BellIcon = (props): IconElement => <Icon {...props} name="bell" />;
export const GridIconOutline = (props): IconElement => <Icon {...props} name="grid-outline" />;
export const GridIcon = (props): IconElement => <Icon {...props} name="grid" />;

export const SettingsIconOutline = (props): IconElement => (
  <Icon {...props} name="settings-outline" />
);
export const SettingsIcon = (props): IconElement => <Icon {...props} name="settings" />;
export const BrushIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="brush-outline" />
);
export const FileTextIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="file-text-outline" />
);

export const LogOutIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="log-out-outline" />
);

export const ForwardIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="arrow-ios-forward" />
);
export const PlusIcon = (props: IconProps): IconElement => <Icon name="plus-circle" {...props} />;
export const CloseIcon = (props: IconProps): IconElement => <Icon {...props} name="close" />;
export const PlusSquareIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="plus-square" />
);
export const PersonIcon = (props: IconProps): IconElement => <Icon {...props} name="person" />;
export const PeopleIcon = (props: IconProps): IconElement => <Icon {...props} name="people" />;
export const PersonOutlineIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="person-outline" />
);
export const SearchIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="search-outline" />
);
