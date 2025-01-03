import type { CitiesListResponse, PricesListResponse, StationsListQueries, StationsListResponse } from '@/types/api';
import type { StationId } from '@/types/models.ts';

const apiUrl = import.meta.env.VITE_API_URL;

export const getCities = async (): Promise<CitiesListResponse> => {
  const response = await fetch(`${apiUrl}/cities`);

  return await response.json();
};

export const getStationsList = async (queries: StationsListQueries): Promise<StationsListResponse> => {
  const response = await fetch(`${apiUrl}/station?${new URLSearchParams({...queries}).toString()}`);

  return await response.json();
};

export const getPrices = async (id: StationId): Promise<PricesListResponse> => {
  const response = await fetch(`${apiUrl}/prices/${id}`);

  return await response.json();
};