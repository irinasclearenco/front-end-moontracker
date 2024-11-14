import {
  HighSexDriveSvg,
  LowSexDriveSvg,
  NoSexSvg,
  OralSexSvg,
  ProtectedSexSvg,
  SensualTouchSvg,
  UnprotectedSexSvg,
  VibratorSvg,
} from '../../assets/sexData';
import {
  AngrySvg,
  AnnoyedSvg,
  CalmSvg,
  EmotionalSvg,
  NeutralSvg,
  SadSvg,
  SleepySvg,
  StressfulSvg,
} from '../../assets/svgEmoji';
import {
  AbdominalPainSvg,
  AcneSvg,
  BackPainSvg,
  BloatingSvg,
  BoobsSvg,
  CravingsSvg,
  FatigueSvg,
  HeadAcheSvg,
  InsomniaSvg,
  NauseaSvg,
  OkSvg,
  VaginaSvg,
} from '../../assets/svgSymptoms';

const MoodData = [
  {name: 'Angry', Svg: AngrySvg},
  {name: 'Calm', Svg: CalmSvg},
  {name: 'Annoyed', Svg: AnnoyedSvg},
  {name: 'Emotional', Svg: EmotionalSvg},
  {name: 'Neutral', Svg: NeutralSvg},
  {name: 'Sad', Svg: SadSvg},
  {name: 'Sleepy', Svg: SleepySvg},
  {name: 'Stressful', Svg: StressfulSvg},
];
const SymptomsData = [
  {name: 'All good', Svg: OkSvg},
  {name: 'Acne', Svg: AcneSvg},
  {name: 'Back pain', Svg: BackPainSvg},
  {name: 'Cravings', Svg: CravingsSvg},
  {name: 'Head ache', Svg: HeadAcheSvg},
  {name: 'Insomnia', Svg: InsomniaSvg},
  {name: 'Nausea', Svg: NauseaSvg},
  {name: 'Bloating', Svg: BloatingSvg},
  {name: 'Fatigue', Svg: FatigueSvg},
  {name: 'Breast pain', Svg: BoobsSvg},
  {name: 'Bellyache', Svg: AbdominalPainSvg},
  {name: 'Vaginal', Svg: VaginaSvg},
];
const SexData = [
  {name: 'No sex', Svg: NoSexSvg},
  {name: 'Safe sex', Svg: ProtectedSexSvg},
  {name: 'Unsafe sex', Svg: UnprotectedSexSvg},
  {name: 'Sex oral', Svg: OralSexSvg},
  {name: 'High libido', Svg: HighSexDriveSvg},
  {name: 'Low libido', Svg: LowSexDriveSvg},
  {name: 'Caress', Svg: SensualTouchSvg},
  {name: 'Solo play', Svg: VibratorSvg},
];
export const AllSymptoms = [
  {categoryData: MoodData, categoryName: 'mood', color: '#fdffc0'},
  {categoryData: SymptomsData, categoryName: 'symptom', color: '#c8ecfc'},
  {categoryData: SexData, categoryName: 'sex', color: '#fcd1db'},
];
