export interface MenuLink {
    id: number;
    menutype: number;
    title: string;
    alias: string;
    path: string;
    hint: string | null;
    status: number;
    parent_id: number | null;
    article_id: number | null;
    banner_id: number | null;
    right_block: number;
    left_block: number;
    ordering: number | null;
    footer_ordering: number | null;
    imgdata: string | '';
    url: string | null;
    file: string | ""
    created_at: string;
    updated_at: string;
    img: string | null;
    introtext: string;
}
export interface MenuItemCategoriesLinks {
    id: number;
    title: string;
    slug: string;
    parent_id: number | null;
    ordering: number | null;
    type: string | null;
    metatitle: string | null;
    metadescription: string | null;
    metakeyword: string | null;
    banner_id: number | null;
    image: string | null;
    home_image: string | null;
    description: string | null;
    status: number;
    created_at: string;
    updated_at: string;
    children: MenuItemCategoriesLinks[];
}

export interface MenuItemResponse {
    status: number;
    error: null | string;
    data: MenuLink[];
    ProductCategory: MenuItemCategoriesLinks[];
    SpecialCategory: MenuItemCategoriesLinks[];
}