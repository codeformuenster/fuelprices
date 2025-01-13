import type { AveragePrice, City, Price, Station } from '@/types/models.ts';

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

export interface PricesListResponse extends ApiResponse<Price[]> {
}

export interface AveragePriceResponse extends ApiResponse<AveragePrice> {
}

export interface StationsListQueries {
  cityId: string;
}

export interface PricesListQueries {
  startDay: string;
  endDay: string;
}