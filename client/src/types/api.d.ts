import type { City } from '@/types/models.ts';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

// Example usage with a User list
export interface CitiesListResponse extends ApiResponse<City[]> {}