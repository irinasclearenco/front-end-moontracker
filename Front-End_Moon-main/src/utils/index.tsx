import axios from 'axios';
import React, {ReactElement} from 'react';

import ErrorMessage from '../components/ErrorMessage';
import {errorMessages} from '../pages/Authentication/consts';

export const renderCaption = (type: string, errors): ReactElement => {
  return (
    <>
      {Object.keys(errorMessages[type]).map(el =>
        errors[type]?.type === el ? (
          <ErrorMessage message={errorMessages[type][el]} key={type} />
        ) : null,
      )}
    </>
  );
};
export const getUserInfo = async (accessToken: string) => {
  if (!accessToken) return;
  try {
    const response = await axios.get('https://www.googleapis.com/userinfo/v2/me', {
      headers: {Authorization: `Bearer ${accessToken}`},
    });
    return await response.data;
  } catch (error) {
    throw error;
  }
};
