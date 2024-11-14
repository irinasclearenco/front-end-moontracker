import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosError, AxiosResponse} from 'axios';

import {postSymptom} from '../../services/api';

export const usePostSymptom = () => {
  const queryClient = useQueryClient();
  const {mutateAsync, error, isPending} = useMutation<
    AxiosResponse<any>,
    AxiosError<{message: string}>,
    any,
    unknown
  >({
    mutationFn: async ({id, category, symptom}) => postSymptom(id, category, symptom),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['cycles']});
    },
  });
  return {
    mutateAsync,
    error: error?.response?.data.message,
    isPending,
  };
};
