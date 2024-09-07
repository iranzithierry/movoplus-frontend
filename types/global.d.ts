type ProductList = {
    id: string;
    name: string;
    price: number;
    image?: {
        original: string;
        small: string;
        medium: string;
    };
    status: ProductStatus;
    totalSales: number;
    addedAt: string;
    updatedAt: string;
}

enum ProductStatus {
    "out_of_stock" = "Out of stock",
    "available" = "Available",
    "reserved" = "Reserved"
}