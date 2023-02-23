export interface CreateProduct {
  id: string;
  admin_id: number;
  title: string;
  image: string;
  likes: number;
}

export interface UpdateProductDTO {
  id: string;
  admin_id: number;
  title: string;
  image: string;
  likes: number;
}
