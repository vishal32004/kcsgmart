export interface ApiResponseBrands {
    status: number;
    error: string | null;
    total: number;
    data: Brands[];
}
export interface Brands {
    id: number;
    brand: string;
    slug: string;
    parent_id: number | null;
    ordering: number | null;
    brand_img: string;
    cat_id: number | null;
    description: string;
    banner_id: number | null;
    status: number;
    created_at: string;
    updated_at: string;
}