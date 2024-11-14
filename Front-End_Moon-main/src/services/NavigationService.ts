import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const navigate = name => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never);
  }
};
