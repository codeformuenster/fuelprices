import type { CitiesListResponse, StationsListQueries, StationsListResponse } from '@/types/api';

const apiUrl = import.meta.env.VITE_API_URL;

export const getCities = async (): Promise<CitiesListResponse> => {
  const response = await fetch(`${apiUrl}/cities`);

  return await response.json();
};

export const getStationsList = async (queries: StationsListQueries): Promise<StationsListResponse> => {
  const response = await fetch(`${apiUrl}/station?${new URLSearchParams({...queries}).toString()}`);

  return await response.json();
};