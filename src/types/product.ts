import { ProductListCategoryItem } from "./category";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    brand: string;
    mrpPrice?: number
    slug: string;
}
export type CartProduct = {
    id: number;
    name: string;
    price: number;
    image: string;
    mrpPrice?: number
    qty: number;
    minQuantity: number;
    priceRange: ProductPrice[]
}


export interface ProductPrice {
    id: number;
    type: string;
    type_id: number;
    weight: string | null;
    color: string | null;
    size: string | null;
    p_mrp: string;
    p_price: string;
    shipping: string;
    min_quantity: number;
    max_quantity: number;
    status: number;
    created_at: string;
    updated_at: string;
}

export interface ProductSpecification {
    id: number;
    type: string;
    type_id: number;
    specification_title: string;
    specification_type: string;
    option1: string | null;
    option2: string | null;
    option3: string | null;
    option4: string | null;
    option5: string | null;
    option6: string | null;
    select_value: string | null;
    textarea_answer: string | null;
    status: number;
    created_at: string;
    updated_at: string;
}


export interface BackendProduct {
    id: number;
    user_id: number;
    category: string;
    type: string;
    home: string;
    name: string;
    slug: string;
    brand: string;
    image: string;
    introtext: string;
    description: string;
    key_features: string;
    metatitle: string;
    metakeyword: string;
    metadescription: string;
    banner_id: number | null;
    ordering: number | null;
    terms_and_conditions: string | null;
    share: string | null;
    labeling: string;
    labeling_image: string | null;
    tag: string | null;
    quantity: number;
    delivery: string | null;
    video: string | null;
    gst: number;
    manufacturing: string;
    warranty: string;
    p_color: string | null;
    p_size: string | null;
    status: number;
    created_at: string;
    updated_at: string;
    images: ProductImages[];
    Productprice: ProductPrice[];
    ProductSpecification: ProductSpecification[];
}

export interface ProductImages {
    id: number,
    name: string,
    alt: string,
    category_id: number,
    type: string,
    filename: string,
    orderby: string | null,
    status: number,
    created_at: string,
    updated_at: string
}


export interface BackendProductResponse {
    status: boolean;
    error: string | null;
    data: BackendProduct[];
}

export interface ProductListData {
    id: number;
    user_id: number;
    category: string;
    type: string | null;
    home: string | null;
    name: string;
    slug: string;
    brand: string;
    image: string;
    introtext: string;
    description: string | null;
    key_features: string;
    metatitle: string;
    metakeyword: string;
    metadescription: string;
    banner_id: number | null;
    ordering: number | null;
    terms_and_conditions: string | null;
    share: string | null;
    labeling: string;
    labeling_image: string | null;
    tag: string | null;
    quantity: number;
    delivery: string;
    video: string | null;
    gst: number;
    manufacturing: string | null;
    warranty: string | null;
    p_color: string | null;
    p_size: string | null;
    status: number;
    created_at: string;
    updated_at: string;
    Productprice: ProductPrice[];
    ProductSpecification: ProductSpecification[]
    Category: ProductListCategoryItem[];
}

export interface ProductListResponse {
    status: boolean | number;
    error: string | null;
    total: number;
    data: ProductListData[];
}

export interface WishlistProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  slug?: string;
  brand?: string;
  category?: string;
}
