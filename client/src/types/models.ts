
export interface City {
  id: string;
  name: string;
  postCode: number
  location: {
    type: 'Point'
    coordinates: number[]
  }
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
}