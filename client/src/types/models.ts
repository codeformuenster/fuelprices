import mapboxgl from 'mapbox-gl';

export interface City {
  id: string;
  name: string;
  postCode: number;
  location: {
    type: 'Point'
    coordinates: number[]
  };
}

export type Trend = {
  status: '' | 'up' | 'down',
  value: number
};

export interface Station {
  id: string,
  name: string,
  address: string,
  city: City,
  location: {
    type: 'Point'
    coordinates: mapboxgl.LngLatLike
  },
  marketTransparencyId: string,
  super: number,
  e10: number,
  diesel: number,
  latestPriceUpdatedAt: Date,
  trend: {
    e10: Trend,
    super: Trend,
    diesel: Trend,
  }
}

export type StationId = Station['id'];

export interface Price {
  id: string,
  e10: number,
  super: number,
  diesel: number,
  updatedAt: Date,
  trend: {
    e10: null | string,
    super: null | string,
    diesel: null | string,
  }
}

export interface AveragePrice {
  date: Date,
  super: string,
  e10: string,
  diesel: string,
}

export interface FuelLabels {
  super: string;
  e10: string;
  diesel: string;
}