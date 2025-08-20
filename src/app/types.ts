export interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: any;
}

export interface Extra {
  _id: string;
  name: string;
  price: number;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  note?: string;
  category?: Category; // <-- con ? porque puede ser undefined
  extras?: Extra[];
}
