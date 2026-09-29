import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import "./Sales.css";

import {
  useBusinessContext,
} from "../../context/BusinessContext";

import {
  useProducts,
} from "../../hooks/useProducts";

import {
  createSale,
} from "../../api/sales";

interface SaleLine {
  product_id: number;
  quantity: number;
}

export default function CreateSale() {
  const navigate =
    useNavigate();

  const {
    businessId,
  } = useBusinessContext();

  const {
    products,
    loading: productsLoading,
  } = useProducts(businessId);

  const [
    customerName,
    setCustomerName,
  ] = useState("");

  const [
    paymentStatus,
    setPaymentStatus,
  ] = useState("paid");

  const [
    lines,
    setLines,
  ] = useState<SaleLine[]>([]);

  const [
    selectedProduct,
    setSelectedProduct,
  ] = useState("");

  const [
    quantity,
    setQuantity,
  ] = useState("1");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState<string | null>(null);

  const addLine = () => {
    setError(null);

    const productId =
      Number(selectedProduct);

    const qty =
      Number(quantity);

    if (!productId) {
      setError(
        "Sélectionnez un produit."
      );
      return;
    }

    if (
      !Number.isFinite(qty) ||
      qty <= 0
    ) {
      setError(
        "La quantité doit être supérieure à 0."
      );
      return;
    }

    const existing =
      lines.find(
        (line) =>
          line.product_id ===
          productId
      );

    if (existing) {
      setLines(
        lines.map((line) =>
          line.product_id ===
          productId
            ? {
                ...line,
                quantity:
                  line.quantity +
                  qty,
              }
            : line
        )
      );
    } else {
      setLines([
        ...lines,
        {
          product_id: productId,
          quantity: qty,
        },
      ]);
    }

    setSelectedProduct("");
    setQuantity("1");
  };

  const removeLine = (
    productId: number
  ) => {
    setLines(
      lines.filter(
        (line) =>
          line.product_id !==
          productId
      )
    );
  };

  const getProduct = (
    productId: number
  ) => {
    return products.find(
      (product) =>
        product.id === productId
    );
  };

  const total = lines.reduce(
    (sum, line) => {
      const product =
        getProduct(
          line.product_id
        );

      if (!product) {
        return sum;
      }

      return (
        sum +
        product.selling_price *
          line.quantity
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

      if (!businessId) {
        setError(
          "Aucune activité sélectionnée."
        );
        return;
      }

      if (lines.length === 0) {
        setError(
          "Ajoutez au moins un produit."
        );
        return;
      }

      try {
        setLoading(true);

        await createSale(
          businessId,
          {
            customer_name:
              customerName.trim() ||
              null,
            payment_status:
              paymentStatus,
            items: lines,
          }
        );

        navigate("/sales", {
          replace: true,
        });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Impossible d'enregistrer la vente."
        );
      } finally {
        setLoading(false);
      }
    };

  if (!businessId) {
    return (
      <section className="sales-page">
        <div className="sales-message">
          Aucune activité sélectionnée.
        </div>
      </section>
    );
  }

  return (
    <section className="sales-page">

      <div className="sales-header">
        <div>
          <Link to="/sales">
            ← Retour aux ventes
          </Link>

          <h2>
            Nouvelle vente
          </h2>
        </div>
      </div>

      <form
        className="sale-form"
        onSubmit={handleSubmit}
      >

        <div className="sale-form-grid">

          <div className="sale-field">
            <label htmlFor="customer-name">
              Client
            </label>

            <input
              id="customer-name"
              value={customerName}
              onChange={(event) =>
                setCustomerName(
                  event.target.value
                )
              }
              placeholder="Nom du client"
              disabled={loading}
            />
          </div>

          <div className="sale-field">
            <label htmlFor="payment-status">
              Paiement
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
                Partiel
              </option>

              <option value="credit">
                Crédit
              </option>
            </select>
          </div>

        </div>

        <div className="sale-add-line">

          <div className="sale-field">
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
              disabled={
                loading ||
                productsLoading
              }
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

          <div className="sale-field">
            <label htmlFor="sale-quantity">
              Quantité
            </label>

            <input
              id="sale-quantity"
              type="number"
              min="1"
              step="1"
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
            className="sales-secondary-button"
            onClick={addLine}
            disabled={loading}
          >
            Ajouter
          </button>

        </div>

        {error && (
          <div className="sales-error">
            {error}
          </div>
        )}

        <div className="sale-lines">

          <h3>
            Produits de la vente
          </h3>

          {lines.length === 0 ? (
            <p>
              Aucun produit ajouté.
            </p>
          ) : (
            <div className="sale-lines-list">

              {lines.map(
                (line) => {
                  const product =
                    getProduct(
                      line.product_id
                    );

                  if (!product) {
                    return null;
                  }

                  const lineTotal =
                    product.selling_price *
                    line.quantity;

                  return (
                    <div
                      key={line.product_id}
                      className="sale-line"
                    >
                      <div>
                        <strong>
                          {product.name}
                        </strong>

                        <span>
                          {line.quantity}{" "}
                          ×{" "}
                          {product.selling_price.toLocaleString(
                            "fr-FR"
                          )}{" "}
                          FCFA
                        </span>
                      </div>

                      <strong>
                        {lineTotal.toLocaleString(
                          "fr-FR"
                        )}{" "}
                        FCFA
                      </strong>

                      <button
                        type="button"
                        onClick={() =>
                          removeLine(
                            line.product_id
                          )
                        }
                      >
                        Retirer
                      </button>
                    </div>
                  );
                }
              )}

            </div>
          )}
        </div>

        <div className="sale-total">
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

        <button
          type="submit"
          className="sales-primary-button"
          disabled={
            loading ||
            lines.length === 0
          }
        >
          {loading
            ? "Enregistrement..."
            : "Enregistrer la vente"}
        </button>

      </form>
    </section>
  );
}