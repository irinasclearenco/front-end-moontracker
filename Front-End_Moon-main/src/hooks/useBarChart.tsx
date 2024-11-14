export const useBarChart = data => {
  const symptomCounts = {};

  // Iterate through each moon
  data.forEach(moon => {
    // Iterate through each symptom of the moon
    moon.symptoms.forEach(symptom => {
      const {symptom: symptomName} = symptom;

      // Increment the count for this symptom
      symptomCounts[symptomName] = (symptomCounts[symptomName] || 0) + 1;
    });
  });

  // Extract the symptom names and counts
  const labels = Object.keys(symptomCounts);
  const dataValues = Object.values(symptomCounts);

  // Construct the final data object
  return {
    labels,
    datasets: [
      {
        data: dataValues,
      },
    ],
  };
};
