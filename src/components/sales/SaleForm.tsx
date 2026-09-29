import {
  useState,
} from "react";

import type {
  Product,
} from "../../types/product";

import SaleItem from "./SaleItem";

interface SaleLine {
  product_id: number;
  quantity: number;
}

interface SaleFormProps {
  products: Product[];
  loading?: boolean;
  onSubmit: (
    data: {
      customer_name:
        | string
        | null;

      payment_status: string;

      items: SaleLine[];
    }
  ) => void | Promise<void>;
  onCancel?: () => void;
}

export default function SaleForm({
  products,
  loading = false,
  onSubmit,
  onCancel,
}: SaleFormProps) {
  const [
    customerName,
    setCustomerName,
  ] = useState("");

  const [
    paymentStatus,
    setPaymentStatus,
  ] = useState("paid");

  const [
    selectedProduct,
    setSelectedProduct,
  ] = useState("");

  const [
    quantity,
    setQuantity,
  ] = useState("1");

  const [
    items,
    setItems,
  ] = useState<SaleLine[]>([]);

  const [
    error,
    setError,
  ] = useState<string | null>(null);

  const addProduct = () => {
    setError(null);

    const productId =
      Number(selectedProduct);

    const product =
      products.find(
        (item) =>
          item.id === productId
      );

    const newQuantity =
      Number(quantity);

    if (!product) {
      setError(
        "Sélectionnez un produit."
      );
      return;
    }

    if (
      !Number.isFinite(
        newQuantity
      ) ||
      newQuantity <= 0
    ) {
      setError(
        "La quantité est invalide."
      );
      return;
    }

    if (
      newQuantity >
      product.stock_quantity
    ) {
      setError(
        "La quantité demandée dépasse le stock disponible."
      );
      return;
    }

    const existing =
      items.find(
        (item) =>
          item.product_id ===
          productId
      );

    if (existing) {
      const totalQuantity =
        existing.quantity +
        newQuantity;

      if (
        totalQuantity >
        product.stock_quantity
      ) {
        setError(
          "La quantité totale dépasse le stock disponible."
        );
        return;
      }

      setItems(
        items.map((item) =>
          item.product_id ===
          productId
            ? {
                ...item,
                quantity:
                  totalQuantity,
              }
            : item
        )
      );
    } else {
      setItems([
        ...items,
        {
          product_id:
            productId,
          quantity:
            newQuantity,
        },
      ]);
    }

    setSelectedProduct("");
    setQuantity("1");
  };

  const removeProduct = (
    productId: number
  ) => {
    setItems(
      items.filter(
        (item) =>
          item.product_id !==
          productId
      )
    );
  };

  const updateQuantity = (
    productId: number,
    newQuantity: number
  ) => {
    setItems(
      items.map((item) =>
        item.product_id ===
        productId
          ? {
              ...item,
              quantity:
                newQuantity,
            }
          : item
      )
    );
  };

  const total = items.reduce(
    (sum, item) => {
      const product =
        products.find(
          (product) =>
            product.id ===
            item.product_id
        );

      if (!product) {
        return sum;
      }

      return (
        sum +
        product.selling_price *
          item.quantity
      );
    },
    0
  );

  const handleSubmit =
    async (
      event: React.FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      setError(null);

      if (items.length === 0) {
        setError(
          "Ajoutez au moins un produit."
        );
        return;
      }

      await onSubmit({
        customer_name:
          customerName.trim() ||
          null,

        payment_status:
          paymentStatus,

        items,
      });
    };

  return (
    <form
      className="sale-form"
      onSubmit={handleSubmit}
    >

      <div className="sale-form-field">
        <label htmlFor="customer-name">
          Nom du client
        </label>

        <input
          id="customer-name"
          type="text"
          value={customerName}
          onChange={(event) =>
            setCustomerName(
              event.target.value
            )
          }
          placeholder="Client comptant"
          disabled={loading}
        />
      </div>

      <div className="sale-form-field">
        <label htmlFor="payment-status">
          Mode de paiement
        </label>

        <select
          id="payment-status"
          value={paymentStatus}
          onChange={(event) =>
            setPaymentStatus(
              event.target.value
            )
          }
          disabled={loading}
        >
          <option value="paid">
            Payé
          </option>

          <option value="partial">
            Partiellement payé
          </option>

          <option value="credit">
            Crédit
          </option>
        </select>
      </div>

      <div className="sale-product-selector">

        <div className="sale-form-field">
          <label htmlFor="sale-product">
            Produit
          </label>

          <select
            id="sale-product"
            value={selectedProduct}
            onChange={(event) =>
              setSelectedProduct(
                event.target.value
              )
            }
            disabled={loading}
          >
            <option value="">
              Sélectionner un produit
            </option>

            {products.map(
              (product) => (
                <option
                  key={product.id}
                  value={product.id}
                >
                  {product.name} —{" "}
                  {product.selling_price.toLocaleString(
                    "fr-FR"
                  )}{" "}
                  FCFA
                </option>
              )
            )}
          </select>
        </div>

        <div className="sale-form-field">
          <label htmlFor="sale-quantity">
            Quantité
          </label>

          <input
            id="sale-quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(event) =>
              setQuantity(
                event.target.value
              )
            }
            disabled={loading}
          />
        </div>

        <button
          type="button"
          onClick={addProduct}
          disabled={loading}
        >
          Ajouter
        </button>

      </div>

      {error && (
        <div className="sale-form-error">
          {error}
        </div>
      )}

      <div className="sale-selected-products">

        <h3>
          Produits sélectionnés
        </h3>

        {items.length === 0 ? (
          <p>
            Aucun produit sélectionné.
          </p>
        ) : (
          items.map((item) => {
            const product =
              products.find(
                (product) =>
                  product.id ===
                  item.product_id
              );

            if (!product) {
              return null;
            }

            return (
              <SaleItem
                key={item.product_id}
                product={product}
                quantity={item.quantity}
                onQuantityChange={(
                  newQuantity
                ) =>
                  updateQuantity(
                    item.product_id,
                    newQuantity
                  )
                }
                onRemove={() =>
                  removeProduct(
                    item.product_id
                  )
                }
              />
            );
          })
        )}

      </div>

      <div className="sale-form-total">
        <span>
          Total
        </span>

        <strong>
          {total.toLocaleString(
            "fr-FR"
          )}{" "}
          FCFA
        </strong>
      </div>

      <div className="sale-form-actions">

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
          disabled={
            loading ||
            items.length === 0
          }
        >
          {loading
            ? "Enregistrement..."
            : "Enregistrer la vente"}
        </button>

      </div>

    </form>
  );
}