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

type Trend = null | 'up' | 'down';

export interface Station {
  id: string,
  name: string,
  address: string,
  city: City,
  location: {
    type: 'Point'
    coordinates:  mapboxgl.LngLatLike
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