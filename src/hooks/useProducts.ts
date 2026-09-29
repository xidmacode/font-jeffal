import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/products";

import type {
  Product,
  ProductCreate,
  ProductUpdate,
} from "../types/product";

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  addProduct: (
    data: ProductCreate
  ) => Promise<Product>;
  editProduct: (
    productId: number,
    data: ProductUpdate
  ) => Promise<Product>;
  removeProduct: (
    productId: number
  ) => Promise<void>;
}

export function useProducts(
  businessId: number | null
): UseProductsReturn {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const refresh = useCallback(
    async () => {
      if (!businessId) {
        setProducts([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data =
          await getProducts(businessId);

        setProducts(data);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Impossible de charger les produits";

        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [businessId]
  );

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const addProduct = async (
    data: ProductCreate
  ): Promise<Product> => {
    if (!businessId) {
      throw new Error(
        "Aucune activité sélectionnée"
      );
    }

    const product =
      await createProduct(
        businessId,
        data
      );

    setProducts((current) => [
      ...current,
      product,
    ]);

    return product;
  };

  const editProduct = async (
    productId: number,
    data: ProductUpdate
  ): Promise<Product> => {
    if (!businessId) {
      throw new Error(
        "Aucune activité sélectionnée"
      );
    }

    const product =
      await updateProduct(
        businessId,
        productId,
        data
      );

    setProducts((current) =>
      current.map((item) =>
        item.id === productId
          ? product
          : item
      )
    );

    return product;
  };

  const removeProduct = async (
    productId: number
  ): Promise<void> => {
    if (!businessId) {
      throw new Error(
        "Aucune activité sélectionnée"
      );
    }

    await deleteProduct(
      businessId,
      productId
    );

    setProducts((current) =>
      current.filter(
        (item) => item.id !== productId
      )
    );
  };

  return {
    products,
    loading,
    error,
    refresh,
    addProduct,
    editProduct,
    removeProduct,
  };
}