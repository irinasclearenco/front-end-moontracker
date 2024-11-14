export interface SignInParams {
  email: string;
  password: string;
}
export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
}
export interface SignUpParams {
  email: string;
  password: string;
  confirmPassword?: string;
}
export interface GoogleData {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

export interface User {
  birthday: Date;
  cycleLength: number;
  email: string;
  goal: string;
  googleId: string;
  id: number;
  isTfaEnabled: boolean;
  name: string;
  about: string;
  picture: string;
  password: string;
  periodLength: number;
  permissions: string[];
  role: string;
  tfaSecret: string;
  follicularPhaseEnd: number;
  FollicularPhaseLength: number;
  follicularPhaseStart: number;
  lutealPhaseEnd: number;
  LutealPhaseLength: number;
  lutealPhaseStart: number;
  ovulationDay: number;
  accessCode: string;
}
export interface CycleDayDetails {
  id: number;
  userId: number;
  date: string;
  cycleDay: number;
  phase: 'Menstrual' | 'Follicular' | 'Ovulation' | 'Luteal' | 'Unknown'; // Assuming these are the only possible phases
  startingDay: boolean;
  endingDay: boolean;
  color: 'red' | 'green' | 'blue' | 'yellow' | 'gray'; // Assuming these are the only possible colors
}
export interface CycleMap {
  [date: string]: CycleDayDetails;
}
export interface Message {
  id: string;
  senderId: number;
  receiverId: number;
  message: string;
  timestamp: Date;
  isRead: boolean;
  sender: User;
  receiver: User;
}
export interface Post {
  title: string;
  description: string;
  image: string;
  by: string;
  userId: number;
}
