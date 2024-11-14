import Articles from './Cycle/Articles';
import Calendar from './Cycle/Calendar';
import Settings from './Cycle/Settings';
import {GeneralTest} from './interfaces';
import {
  CalendarIcon,
  CalendarIconOutline,
  GridIcon,
  GridIconOutline,
  SettingsIcon,
  SettingsIconOutline,
} from '../assets/Icons';

export const surveyData: GeneralTest[] = [
  {
    question:
      'Is your menstrual cycle regular (intervals between periods vary by no more than 7 days)?',
    answers: ['I have a regular cycle', 'I have an irregular cycle', "I don't know"],
  },
  {
    question:
      'How long is your menstrual cycle? (Count from the first day of your period to the first day of your next period)',
    answers: ['From 23 to 35 days', 'More then 35 days', 'Less the 23 days', "I don't know"],
  },
  {
    question: 'How long is your menstrual period?',
    answers: ['2-3 days', '5-7 days', 'More then 7 days', "I don't know"],
  },
  {
    question: 'Do you experience discomfort for any of the following reasons?',
    answers: [
      'Lower abdominal pain during menstruation',
      'PMS symptoms',
      'Atypical discharge',
      'Heavy menstruation',
      'Mood swings',
      'Other',
      'Nothing bothers me',
    ],
  },
  {
    question: 'Do you have any reproductive health conditions?',
    answers: ['Yes', 'No', 'No, but I used to have one', "Don't know"],
  },
  {
    question: 'Do you have trouble sleeping?',
    answers: [
      'No, I sleep well',
      'Difficulty falling asleep',
      'I wake up tired',
      'I wake up in the middle of the night',
      'Irregular sleep',
      'Insomnia',
      'Other',
    ],
  },
  {
    question: 'Is there anything you are not happy with about the condition of your skin?',
    answers: [
      'No, I have perfect skin',
      'Blackheads and pimples',
      'Dark spots and enlarged pores',
      'Dryness',
      'Wrinkles, including fine lines',
      'Dullness and texture',
      'Other',
    ],
  },
];

export const TabContent = [
  {
    activeTabIcon: CalendarIcon,
    icon: CalendarIconOutline,
    component: Calendar,
    name: 'Calendar',
  },
  {
    activeTabIcon: GridIcon,
    icon: GridIconOutline,
    component: Articles,
    name: 'Notification',
  },
  {
    activeTabIcon: SettingsIcon,
    icon: SettingsIconOutline,
    component: Settings,
    name: 'Settings',
  },
];
