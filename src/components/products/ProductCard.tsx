import { Link } from "react-router-dom";

import type { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-card-content">

        <h3>
          {product.name}
        </h3>

        {product.description && (
          <p>
            {product.description}
          </p>
        )}

        <div className="product-card-info">
          <div>
            <span>
              Prix
            </span>

            <strong>
              {product.selling_price.toLocaleString(
                "fr-FR"
              )}{" "}
              FCFA
            </strong>
          </div>

          <div>
            <span>
              Stock
            </span>

            <strong>
              {product.stock_quantity}
            </strong>
          </div>
        </div>

        <Link
          to={`/products/${product.id}`}
          className="product-card-button"
        >
          Voir le produit
        </Link>

      </div>
    </article>
  );
}