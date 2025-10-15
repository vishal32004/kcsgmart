import { BackendProduct, Product } from "@/types/product";

export function mapBackendProductsToProducts(backendProducts: BackendProduct[]): Product[] {
    return backendProducts.map((backendProduct) => {
        const priceInfo = backendProduct.Productprice && backendProduct.Productprice.length > 0
            ? backendProduct.Productprice[0]
            : null;

        const price = priceInfo && priceInfo.p_price
            ? parseFloat(priceInfo.p_price)
            : parseFloat(priceInfo?.p_mrp || '0');

        const mrpPrice = parseFloat(priceInfo?.p_mrp || '')


        return {
            id: backendProduct.id || 0,
            name: backendProduct.name || "Unnamed Product",
            description: backendProduct.description || "No description available.",
            price: price,
            image: backendProduct.image || "/default-image.jpg",
            category: backendProduct.category || "Uncategorized",
            brand: backendProduct.brand || "Unknown Brand",
            slug: backendProduct.slug || "",
            mrpPrice
        };
    });
}


