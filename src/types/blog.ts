interface HomePageData {
    id: number;
    title: string;
    alias: string;
    introtext: string | null;
    article_description: string | null;
    status: number;
    catid: number;
    ordering: number;
    img: string | null;
    img1: string | null;
    metatitle: string;
    metadescription: string;
    metakeyword: string;
    created_at: string;
    updated_at: string;
    key_statistics: string | null;
    products_process: string | null;
    mtitle: string;
    malias: string;
    banner_id: string | null;
}

interface BlogCategory {
    id: number;
    name: string;
    slug: string;
    image: string;
    short: string;
    longdesc: string | null;
    metatitle: string;
    metadescription: string;
    metakeyword: string;
    ordering: number;
    status: number;
    created_at: string;
    updated_at: string;
}

interface BlogTag {
    id: number;
    name: string;
    slug: string;
    status: number;
    created_at: string;
    updated_at: string;
}

export interface BlogPost {
    id: number;
    user_id: number;
    title: string;
    slug: string;
    postdate: string;
    image: string;
    image1: string;
    banner_img: string;
    short: string;
    body: string;
    view_count: number;
    metatitle: string;
    metadescription: string;
    metakeyword: string;
    status: number;
    created_at: string;
    updated_at: string;
    blogcategory_id: number;
    name: string;
}

export interface BlogResponse {
    status: number;
    error: null | string;
    HomePageData: HomePageData[];
    BannerData: any[];
    Blog_Category: BlogCategory[];
    Blog_Tags: BlogTag[];
    Total_Blogs: number;
    Blogs: BlogPost[];
    Latest_Blogs: BlogPost[];
    message: string;
}
interface BlogDetail {
    id: number;
    user_id: number;
    title: string;
    slug: string;
    postdate: string;
    image: string;
    image1: string;
    banner_img: string;
    short: string;
    body: string;
    view_count: number;
    metatitle: string;
    metadescription: string;
    metakeyword: string;
    status: number;
    created_at: string;
    updated_at: string;
}
export interface BlogDetailResponse {
    status: number;
    error: null | string;
    BlogData: BlogDetail[];
    BannerData: [];
    Blog_Category: BlogCategory[];
    Blog_Tags: BlogTag[];
    Latest_Blogs: BlogDetail[];
    message: string;
}