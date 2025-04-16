export interface SignUp {
  name: string;
  email: string;
  password: string;
}

export interface login {
  email: string;
  password: string;
}

export interface product {
  name: string;
  price: number;
  category: string;
  color: string;
  description: string;
  image: string;
  id: string;
  quantity: undefined | number;
}

export interface product {
  name: string;
  price: number;
  category: string;
  color: string;
  description: string;
  image: string;
  id: string;
  quantity: undefined | number;
  productId: undefined | string | number;
}

export interface cart {
  name: string;
  price: number;
  category: string;
  color: string;
  description: string;
  image: string;
  id: number | undefined;
  quantity: undefined | number;
  userId: number;
  productId: number | string;
}

export interface priceSummary {
  price: number;
  discount: number;
  tax: number;
  delievery: number;
  roundoff: number;
  total: number;
}

export interface order {
  email: string;
  address: string;
  contact: string;
  userId: number;
  totalAmount: number;
  id: number | undefined;
}
