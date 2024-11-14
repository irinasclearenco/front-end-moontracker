import moment from 'moment';
import {useEffect, useState} from 'react';

const useSevenDayData = () => {
  const [dataObject, setDataObject] = useState({});

  useEffect(() => {
    const generateDataObject = () => {
      const newDataObject = {};

      // Define the start date as one year before the current date
      const startDate = moment().subtract(1, 'month').startOf('day');

      // Define the end date as one year after the current date
      const endDate = moment().add(1, 'month').endOf('day');

      // Iterate over each day within the specified range
      for (
        let currentDate = startDate.clone();
        currentDate.isSameOrBefore(endDate);
        currentDate.add(1, 'day')
      ) {
        const dateString = currentDate.format('YYYY-MM-DD');

        const dataArray = [
          {
            day: dateString,
            height: 100,
            name: '',
          },
        ];

        newDataObject[dateString] = dataArray;
      }

      return newDataObject;
    };

    setDataObject(generateDataObject());
  }, []); // This effect runs only once after the component mounts

  return dataObject;
};

export default useSevenDayData;
