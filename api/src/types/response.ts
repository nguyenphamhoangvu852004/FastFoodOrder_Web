
export interface ProductResponse {
  id: number
  name: string;
  category: string;
  size: string;
  description: string;
  unitPrice: number;
}


export interface ProductItemResponse {
  success: boolean;
  data: {
    id: number;
    name: string;
    size: string;
    description: string;
    unitPrice: number;
  }[];
}

export interface ErrorResponse {
  success: boolean;
  data: string
}
