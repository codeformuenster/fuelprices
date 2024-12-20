import type { CitiesListResponse } from '@/types/api';

const apiUrl = import.meta.env.VITE_API_URL;

export const getCities = async (): Promise<CitiesListResponse> => {
  const response = await fetch(`${apiUrl}/cities`);

  return await response.json();
};