import { apiFetch } from "./client";

import type {
  Product,
  ProductCreate,
  ProductUpdate,
} from "../types/product";

function productsUrl(
  businessId: number
): string {
  return `/businesses/${businessId}/products`;
}

export function getProducts(
  businessId: number
): Promise<Product[]> {
  return apiFetch<Product[]>(
    `${productsUrl(businessId)}/`
  );
}

export function getProduct(
  businessId: number,
  productId: number
): Promise<Product> {
  return apiFetch<Product>(
    `${productsUrl(businessId)}/${productId}`
  );
}

export function createProduct(
  businessId: number,
  data: ProductCreate
): Promise<Product> {
  return apiFetch<Product>(
    `${productsUrl(businessId)}/`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

export function updateProduct(
  businessId: number,
  productId: number,
  data: ProductUpdate
): Promise<Product> {
  return apiFetch<Product>(
    `${productsUrl(businessId)}/${productId}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    }
  );
}

export function deleteProduct(
  businessId: number,
  productId: number
): Promise<void> {
  return apiFetch<void>(
    `${productsUrl(businessId)}/${productId}`,
    {
      method: "DELETE",
    }
  );
}