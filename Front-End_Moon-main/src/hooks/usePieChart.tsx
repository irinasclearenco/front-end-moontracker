import {useMemo} from 'react';
enum Goals {
  'BECOME_PREGNANT' = 'become pregnant',
  'MONITORING_PERIODS' = 'monitoring periods',
  'MONITORING_PREGNANCY' = 'monitoring pregnancy',
}
enum GoalsColor {
  'BECOME_PREGNANT' = '#6cbcf5',
  'MONITORING_PERIODS' = '#f3468e',
  'MONITORING_PREGNANCY' = '#8d65f1',
}

export const usePieChart = data => {
  const goalCounts: Record<string, number> = useMemo(
    () =>
      data?.reduce((acc, user) => {
        acc[user?.goal] = (acc[user?.goal] || 0) + 1;
        return acc;
      }, {}),
    [data],
  );
  // Map goal counts to the desired format
  const goalData = goalCounts
    ? useMemo(
        () =>
          Object.entries(goalCounts)
            .map(([goal, count]) => ({
              name: Goals[goal],
              goal: count,
              color: GoalsColor[goal],
              legendFontColor: 'black',
              legendFontSize: 10,
            }))
            .sort((a, b) => b.goal - a.goal),
        [goalCounts],
      )
    : [];
  return goalData;
};
