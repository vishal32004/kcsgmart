"use server"
import { BASE_URL } from "@/constant/data";
import { BlogDetailResponse, BlogResponse } from "@/types/blog";
import { CatagoryResponse } from "@/types/category";
import { ChangePasswordPayload, ChangePasswordResponse, Login, SignUp, SignUpAndLoginResponse, UpdateProfilePayload, UserDetailsResponse } from "@/types/Auth";
import axios from "axios";
import { ProductListResponse } from "@/types/product";
const API_URL = `${BASE_URL}/public/api`
// export async function fetchPagesMetaData(PAGE_NAME: string) {
//     try {
//         const response = await axios.get(
//             `${API_URL}/${PAGE_NAME}`,);
//         return response.data.HomePageData;
//     } catch (error) {
//         console.error("Error:", error);
//     }
// }
// Navbar
export async function fetchNavbarMenus() {
    try {
        const response = await axios.get(
            `${API_URL}/menus-with-category`,);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

// HomeProducts
export async function fetchHomeProducts(type: string) {
    const data = {
        startlimit: 0,
        endlimit: 10,
        type: type,
    };
    try {
        const response = await axios.post(
            `${API_URL}/product-by-type`,
            data
        );
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}
// ProductDetil Page
export async function fetchProductDetail(slug: string) {
    const data = {
        slug: slug,
    };
    try {
        const response = await axios.post(
            `${API_URL}/productdetails`,
            data
        );
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}
// Category Page
// helpers/apiActions.ts
export async function fetchCategoryProducts(slug: string, page: number = 1) {
  const limit = 10;
  const data = {
    slug,
    startlimit: (page - 1) * limit,
    endlimit: limit,
  };

  try {
    const response = await axios.post(`${API_URL}/product-list-category-by-slug`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}



export async function fetchFilterCategory(slug: string): Promise<CatagoryResponse | undefined> {
    const data = {
        slug: slug,
    };
    try {
        const response = await axios.post(
            `${API_URL}/categorybyparentslug`,
            data
        );
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}
// fetchBrands
export async function fetchBrands(start: number, end: number) {
    const data = {
        startlimit: start,
        endlimit: end,
    };
    try {
        const response = await axios.post(
            `${API_URL}/brands`,
            data
        );
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}
// fetchCategories
export async function fetchCategories() {
    try {
        const response = await axios.get(
            `${API_URL}/category-menu`,
        );
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}
// Blogs
export async function fetchBlog(): Promise<BlogResponse | undefined> {
    const data = {
        startlimit: 0,
        endlimit: 10,
    };
    try {
        const response = await axios.post(
            `${API_URL}/blog`,
            data
        );
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}
// BlogDetail
export async function fetchBlogDetail(slug: string): Promise<BlogDetailResponse | undefined> {
    const data = {
        slug: slug
    };
    try {
        const response = await axios.post(
            `${API_URL}/blogbyslug`,
            data
        );
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function signUp(data: SignUp): Promise<SignUpAndLoginResponse | undefined> {
    try {
        const response = await axios.post(
            `${API_URL}/sign-up`,
            data
        );
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}
export async function login(data: Login): Promise<SignUpAndLoginResponse | undefined> {
    try {
        const response = await axios.post(
            `${API_URL}/login`,
            data
        );
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function fetchUserDetails(email: string | undefined): Promise<UserDetailsResponse> {
  try {
    const response = await axios.post(`${API_URL}/user-details`, { email });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching user details:", error);
    throw new Error(error?.response?.data?.message || "Failed to fetch user details");
  }

}

export async function changePassword(data: ChangePasswordPayload): Promise<ChangePasswordResponse | undefined> {
    try {
        const response = await axios.post(
            `${API_URL}/change-password`,
            data
        );
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function updateUserProfile(data: UpdateProfilePayload) {
  try {
    const response = await axios.post(`${API_URL}/profile`, data);
    return response.data;
  } catch (error) {
    console.error("Profile update error:", error);
    throw error;
  }
}

export async function fetchProductList(startlimit: number, endlimit: number): Promise<ProductListResponse | undefined> {
    const data = {
        startlimit,
        endlimit
    }
    try {
        const response = await axios.post(
            `${API_URL}/productlist`,
            data
        );
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}