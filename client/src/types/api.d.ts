import type { City, Station } from '@/types/models.ts';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

// Example usage with a User list
export interface CitiesListResponse extends ApiResponse<City[]> {
}

export interface StationsListResponse extends ApiResponse<Station[]> {
}

export interface StationsListQueries {
  cityId: string;
}