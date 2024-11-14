import axios from 'axios';

import {baseUrl} from './consts';
import api from './index';
import {CycleMap, GoogleData, Message, Post, SignInResponse, User} from './interfaces';

export const signIn = async (email: string, password: string) => {
  return await api.post<SignInResponse>(`${baseUrl}/authentication/sign-in`, {
    email,
    password,
  });
};

export const signUp = async (email: string, password: string) => {
  return await api.post<SignInResponse>(`${baseUrl}/authentication/sign-up`, {
    email,
    password,
  });
};

export const updateProfile = async data => {
  return await api.patch<User>(`${baseUrl}/user`, {...data});
};
export const getProfile = async () => {
  const response = await api.get<User>(`${baseUrl}/user`);
  const BleedingDays = response?.data?.periodLength || 5;
  const MenstrualCycleLength = response?.data?.cycleLength || 28;
  const FollicularPhaseLength = MenstrualCycleLength - BleedingDays - 12;
  const LutealPhaseLength = MenstrualCycleLength - BleedingDays - FollicularPhaseLength;
  return {
    ...response.data,
    FollicularPhaseLength,
    LutealPhaseLength,
  };
};

export const continueWithGoogle = async (data: GoogleData) => {
  return await api.post<any>(`${baseUrl}/authentication/google`, {...data});
};
export const getCycles = async () => {
  return await api.get<CycleMap>(`${baseUrl}/moon`);
};
export const getCyclesByUserId = async id => {
  return await api.get<CycleMap>(`${baseUrl}/moon/${id}`);
};

export const markStartCycle = async (startCycleDay: string) => {
  return await api.post<CycleMap>(`${baseUrl}/moon`, {startCycleDay});
};
export const postSymptom = async (id: string, category, symptom) => {
  return await api.post(`${baseUrl}/symptoms/${id}`, {category, symptom});
};
export const getAllUsers = async () => {
  return await api.get<User[]>(`${baseUrl}/user/all`);
};
export const getAllDoctors = async () => {
  return await api.get<User[]>(`${baseUrl}/user/doctors`);
};
export const getUserById = async (id: string) => {
  return await api.get(`${baseUrl}/user/${id}`);
};
export const getMessages = async userId => {
  return await api.get<Message[]>(`${baseUrl}/chat/history/${userId}`);
};
export const getChatList = async () => {
  return await api.get<Message[]>(`${baseUrl}/chat/history`);
};
export const postMessage = async (data: Message) => {
  return await api.post<Message>(`${baseUrl}/chat/send`, {...data});
};
export const getPosts = async () => {
  return await api.get<Post[]>(`${baseUrl}/articles`);
};
export const getPostsByUserId = async id => {
  return await api.get<Post[]>(`${baseUrl}/articles/${id}`);
};
export const createPost = async (data: Post) => {
  return await api.post(`${baseUrl}/articles`, {...data});
};
export const generateAccessCode = async userId => {
  return await api.post(`${baseUrl}/user/generate-access-code`, {userId});
};
export const getUserDataByAccessCode = async accessCode => {
  return await axios.post(`${baseUrl}/moon/get-data-by-access-code/${accessCode}`);
};
export const getAllCycles = async () => {
  return await api.get(`${baseUrl}/moon/all`);
};
export const makeAllRead = async userId => {
  return await api.post(`${baseUrl}/chat/read`, {userId});
};
