import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import "./Products.css";

import {
  useBusinessContext,
} from "../../context/BusinessContext";

import {
  getProduct,
} from "../../api/products";

import type {
  Product,
} from "../../types/product";

export default function ProductDetails() {
  const {
    id,
  } = useParams();

  const {
    businessId,
  } = useBusinessContext();

  const [
    product,
    setProduct,
  ] = useState<Product | null>(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct =
      async () => {
        if (!businessId || !id) {
          setError(
            "Produit ou activité introuvable."
          );

          setLoading(false);
          return;
        }

        const productId =
          Number(id);

        if (!Number.isFinite(productId)) {
          setError(
            "Identifiant du produit invalide."
          );

          setLoading(false);
          return;
        }

        setLoading(true);
        setError(null);

        try {
          const data =
            await getProduct(
              businessId,
              productId
            );

          setProduct(data);
        } catch (err) {
          setError(
            err instanceof Error
              ? err.message
              : "Impossible de charger le produit."
          );
        } finally {
          setLoading(false);
        }
      };

    void loadProduct();
  }, [businessId, id]);

  if (loading) {
    return (
      <section className="products-page">
        Chargement du produit...
      </section>
    );
  }

  if (error) {
    return (
      <section className="products-page">
        <div className="products-message products-error">
          {error}
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="products-page">
        <div className="products-message">
          Produit introuvable.
        </div>
      </section>
    );
  }

  return (
    <section className="products-page">

      <div className="product-details-header">
        <div>
          <Link to="/products">
            ← Retour aux produits
          </Link>

          <h2>
            {product.name}
          </h2>
        </div>
      </div>

      <div className="product-details-card">

        <div className="product-detail">
          <span>
            Catégorie
          </span>

          <strong>
            {product.category || "—"}
          </strong>
        </div>

        <div className="product-detail">
          <span>
            Unité
          </span>

          <strong>
            {product.unit}
          </strong>
        </div>

        <div className="product-detail">
          <span>
            Prix d'achat
          </span>

          <strong>
            {product.purchase_price.toLocaleString(
              "fr-FR"
            )}{" "}
            FCFA
          </strong>
        </div>

        <div className="product-detail">
          <span>
            Prix de vente
          </span>

          <strong>
            {product.selling_price.toLocaleString(
              "fr-FR"
            )}{" "}
            FCFA
          </strong>
        </div>

        <div className="product-detail">
          <span>
            Stock
          </span>

          <strong>
            {product.stock_quantity}{" "}
            {product.unit}
          </strong>
        </div>

      </div>

    </section>
  );
}