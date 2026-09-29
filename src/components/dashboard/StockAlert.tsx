import type { Product } from "../../types/product";

interface StockAlertProps {
  products: Product[];
  threshold?: number;
}

export default function StockAlert({
  products,
  threshold = 5,
}: StockAlertProps) {
  const lowStockProducts =
    products.filter(
      (product) =>
        product.stock_quantity <=
        threshold
    );

  if (
    lowStockProducts.length === 0
  ) {
    return (
      <div className="stock-alert stock-alert-success">
        <h3>
          Stock
        </h3>

        <p>
          Aucun produit n'a un stock faible.
        </p>
      </div>
    );
  }

  return (
    <div className="stock-alert">
      <div className="stock-alert-header">
        <h3>
          Stock faible
        </h3>

        <span>
          {lowStockProducts.length}
        </span>
      </div>

      <div className="stock-alert-list">
        {lowStockProducts.map(
          (product) => (
            <div
              key={product.id}
              className="stock-alert-item"
            >
              <div>
                <strong>
                  {product.name}
                </strong>

                <span>
                  Stock restant :{" "}
                  {
                    product.stock_quantity
                  }
                </span>
              </div>

              <span className="stock-alert-warning">
                Faible
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}