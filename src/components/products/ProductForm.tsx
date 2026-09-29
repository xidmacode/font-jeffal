import {
  useEffect,
  useState,
} from "react";

import type {
  Product,
} from "../../types/product";

interface ProductFormProps {
  product?: Product | null;
  loading?: boolean;
  onSubmit: (
    data: {
      name: string;
      description: string;
      purchase_price: number;
      selling_price: number;
      stock_quantity: number;
    }
  ) => void | Promise<void>;
  onCancel?: () => void;
}

export default function ProductForm({
  product,
  loading = false,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const [
    name,
    setName,
  ] = useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    purchasePrice,
    setPurchasePrice,
  ] = useState("");

  const [
    sellingPrice,
    setSellingPrice,
  ] = useState("");

  const [
    stockQuantity,
    setStockQuantity,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState<string | null>(null);

  useEffect(() => {
    if (!product) {
      setName("");
      setDescription("");
      setPurchasePrice("");
      setSellingPrice("");
      setStockQuantity("");
      return;
    }

    setName(product.name);

    setDescription(
      product.description || ""
    );

    setPurchasePrice(
      String(product.purchase_price)
    );

    setSellingPrice(
      String(product.selling_price)
    );

    setStockQuantity(
      String(product.stock_quantity)
    );
  }, [product]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError(null);

    const purchase =
      Number(purchasePrice);

    const selling =
      Number(sellingPrice);

    const stock =
      Number(stockQuantity);

    if (!name.trim()) {
      setError(
        "Le nom du produit est obligatoire."
      );
      return;
    }

    if (
      !Number.isFinite(purchase) ||
      purchase < 0
    ) {
      setError(
        "Le prix d'achat est invalide."
      );
      return;
    }

    if (
      !Number.isFinite(selling) ||
      selling <= 0
    ) {
      setError(
        "Le prix de vente est invalide."
      );
      return;
    }

    if (
      !Number.isFinite(stock) ||
      stock < 0
    ) {
      setError(
        "Le stock est invalide."
      );
      return;
    }

    await onSubmit({
      name: name.trim(),

      description:
        description.trim(),

      purchase_price:
        purchase,

      selling_price:
        selling,

      stock_quantity:
        stock,
    });
  };

  return (
    <form
      className="product-form"
      onSubmit={handleSubmit}
    >

      <div className="product-form-field">
        <label htmlFor="product-name">
          Nom du produit
        </label>

        <input
          id="product-name"
          type="text"
          value={name}
          onChange={(event) =>
            setName(
              event.target.value
            )
          }
          disabled={loading}
          placeholder="Ex : Riz"
        />
      </div>

      <div className="product-form-field">
        <label htmlFor="product-description">
          Description
        </label>

        <textarea
          id="product-description"
          value={description}
          onChange={(event) =>
            setDescription(
              event.target.value
            )
          }
          disabled={loading}
          placeholder="Description du produit"
          rows={4}
        />
      </div>

      <div className="product-form-field">
        <label htmlFor="purchase-price">
          Prix d'achat
        </label>

        <input
          id="purchase-price"
          type="number"
          min="0"
          step="1"
          value={purchasePrice}
          onChange={(event) =>
            setPurchasePrice(
              event.target.value
            )
          }
          disabled={loading}
        />
      </div>

      <div className="product-form-field">
        <label htmlFor="selling-price">
          Prix de vente
        </label>

        <input
          id="selling-price"
          type="number"
          min="1"
          step="1"
          value={sellingPrice}
          onChange={(event) =>
            setSellingPrice(
              event.target.value
            )
          }
          disabled={loading}
        />
      </div>

      <div className="product-form-field">
        <label htmlFor="stock-quantity">
          Quantité en stock
        </label>

        <input
          id="stock-quantity"
          type="number"
          min="0"
          step="1"
          value={stockQuantity}
          onChange={(event) =>
            setStockQuantity(
              event.target.value
            )
          }
          disabled={loading}
        />
      </div>

      {error && (
        <div className="product-form-error">
          {error}
        </div>
      )}

      <div className="product-form-actions">

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
          >
            Annuler
          </button>
        )}

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Enregistrement..."
            : product
              ? "Modifier le produit"
              : "Créer le produit"}
        </button>

      </div>

    </form>
  );
}