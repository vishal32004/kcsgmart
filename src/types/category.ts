export type CatagoryItem = {
    id: number;
    title: string;
    slug: string;
    parent_id: number | null;
    ordering: number | null;
    type: string | null;
    metatitle: string;
    metadescription: string;
    metakeyword: string;
    banner_id: number | null;
    image: string;
    home_image: string | null;
    description: string | null;
    status: number;
    created_at: string;
    updated_at: string;
    children: CatagoryItem[];
};

export type CatagoryResponse = {
    status: number;
    error: string | null;
    data: CatagoryItem[];
};


export interface ProductListCategoryItem {
    id: number;
    title: string;
    slug: string;
    parent_id: number | null;
    ordering: number | null;
    type: string | null;
    metatitle: string;
    metadescription: string;
    metakeyword: string;
    banner_id: number | null;
    image: string;
    home_image: string | null;
    description: string | null;
    status: number;
    created_at: string;
    updated_at: string;
}
