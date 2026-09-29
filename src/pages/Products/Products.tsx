import {
  useMemo,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import "./Products.css";

import {
  useProducts,
} from "../../hooks/useProducts";

import {
  useBusinessContext,
} from "../../context/BusinessContext";

import type {
  ProductCreate,
} from "../../types/product";

export default function Products() {
  const {
    businessId,
  } = useBusinessContext();

  const {
    products,
    loading,
    error,
    refresh,
    addProduct,
    removeProduct,
  } = useProducts(businessId);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    showForm,
    setShowForm,
  ] = useState(false);

  const [
    name,
    setName,
  ] = useState("");

  const [
    category,
    setCategory,
  ] = useState("");

  const [
    unit,
    setUnit,
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
    formError,
    setFormError,
  ] = useState<string | null>(null);

  const filteredProducts =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      if (!query) {
        return products;
      }

      return products.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(query) ||
          (
            product.category || ""
          )
            .toLowerCase()
            .includes(query)
      );
    }, [products, search]);

  const resetForm = () => {
    setName("");
    setCategory("");
    setUnit("");
    setPurchasePrice("");
    setSellingPrice("");
    setStockQuantity("");
    setFormError(null);
  };

  const handleCreateProduct =
    async (
      event: React.FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      setFormError(null);

      if (!name.trim()) {
        setFormError(
          "Le nom du produit est obligatoire."
        );
        return;
      }

      if (!unit.trim()) {
        setFormError(
          "L'unité est obligatoire."
        );
        return;
      }

      const purchase =
        Number(purchasePrice);

      const selling =
        Number(sellingPrice);

      const stock =
        Number(stockQuantity);

      if (
        !Number.isFinite(purchase) ||
        purchase < 0
      ) {
        setFormError(
          "Le prix d'achat est invalide."
        );
        return;
      }

      if (
        !Number.isFinite(selling) ||
        selling < 0
      ) {
        setFormError(
          "Le prix de vente est invalide."
        );
        return;
      }

      if (
        !Number.isFinite(stock) ||
        stock < 0
      ) {
        setFormError(
          "Le stock est invalide."
        );
        return;
      }

      const data: ProductCreate = {
        name: name.trim(),
        category:
          category.trim() || null,
        unit: unit.trim(),
        purchase_price: purchase,
        selling_price: selling,
        stock_quantity: stock,
      };

      try {
        await addProduct(data);

        resetForm();
        setShowForm(false);
      } catch (err) {
        setFormError(
          err instanceof Error
            ? err.message
            : "Impossible de créer le produit."
        );
      }
    };

  const handleDelete = async (
    productId: number
  ) => {
    const confirmed =
      window.confirm(
        "Voulez-vous vraiment supprimer ce produit ?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await removeProduct(productId);
    } catch (err) {
      window.alert(
        err instanceof Error
          ? err.message
          : "Impossible de supprimer le produit."
      );
    }
  };

  if (!businessId) {
    return (
      <section className="products-page">
        <div className="products-empty">
          <h2>Produits</h2>
          <p>
            Aucune activité sélectionnée.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="products-page">

      <div className="products-header">
        <div>
          <h2>Produits</h2>

          <p>
            Gérez votre stock et vos produits.
          </p>
        </div>

        <button
          type="button"
          className="products-primary-button"
          onClick={() => {
            resetForm();
            setShowForm((value) => !value);
          }}
        >
          {showForm
            ? "Fermer"
            : "Ajouter un produit"}
        </button>
      </div>

      {showForm && (
        <form
          className="product-form"
          onSubmit={handleCreateProduct}
        >
          <h3>
            Nouveau produit
          </h3>

          <div className="product-form-grid">

            <div className="product-field">
              <label htmlFor="product-name">
                Nom
              </label>

              <input
                id="product-name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Ex : Riz"
              />
            </div>

            <div className="product-field">
              <label htmlFor="product-category">
                Catégorie
              </label>

              <input
                id="product-category"
                value={category}
                onChange={(event) =>
                  setCategory(
                    event.target.value
                  )
                }
                placeholder="Ex : Alimentaire"
              />
            </div>

            <div className="product-field">
              <label htmlFor="product-unit">
                Unité
              </label>

              <input
                id="product-unit"
                value={unit}
                onChange={(event) =>
                  setUnit(event.target.value)
                }
                placeholder="Ex : kg"
              />
            </div>

            <div className="product-field">
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
              />
            </div>

            <div className="product-field">
              <label htmlFor="selling-price">
                Prix de vente
              </label>

              <input
                id="selling-price"
                type="number"
                min="0"
                step="1"
                value={sellingPrice}
                onChange={(event) =>
                  setSellingPrice(
                    event.target.value
                  )
                }
              />
            </div>

            <div className="product-field">
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
              />
            </div>

          </div>

          {formError && (
            <div className="product-form-error">
              {formError}
            </div>
          )}

          <button
            type="submit"
            className="products-primary-button"
          >
            Enregistrer
          </button>
        </form>
      )}

      <div className="products-toolbar">

        <input
          type="search"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Rechercher un produit..."
          className="product-search"
        />

        <button
          type="button"
          onClick={() => void refresh()}
          className="products-secondary-button"
        >
          Actualiser
        </button>

      </div>

      {loading ? (
        <div className="products-message">
          Chargement des produits...
        </div>
      ) : error ? (
        <div className="products-message products-error">
          <p>{error}</p>

          <button
            type="button"
            onClick={() => void refresh()}
          >
            Réessayer
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="products-message">
          <h3>
            Aucun produit
          </h3>

          <p>
            Aucun produit ne correspond à votre recherche.
          </p>
        </div>
      ) : (
        <div className="products-table-wrapper">

          <table className="products-table">

            <thead>
              <tr>
                <th>Produit</th>
                <th>Catégorie</th>
                <th>Unité</th>
                <th>Prix achat</th>
                <th>Prix vente</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map(
                (product) => (
                  <tr key={product.id}>

                    <td>
                      <Link
                        to={`/products/${product.id}`}
                      >
                        {product.name}
                      </Link>
                    </td>

                    <td>
                      {product.category ||
                        "—"}
                    </td>

                    <td>
                      {product.unit}
                    </td>

                    <td>
                      {product.purchase_price.toLocaleString(
                        "fr-FR"
                      )}{" "}
                      FCFA
                    </td>

                    <td>
                      {product.selling_price.toLocaleString(
                        "fr-FR"
                      )}{" "}
                      FCFA
                    </td>

                    <td>
                      {product.stock_quantity}{" "}
                      {product.unit}
                    </td>

                    <td>
                      <div className="product-actions">

                        <Link
                          to={`/products/${product.id}`}
                          className="product-action-link"
                        >
                          Voir
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            void handleDelete(
                              product.id
                            )
                          }
                          className="product-delete-button"
                        >
                          Supprimer
                        </button>

                      </div>
                    </td>

                  </tr>
                )
              )}
            </tbody>

          </table>

        </div>
      )}

    </section>
  );
}