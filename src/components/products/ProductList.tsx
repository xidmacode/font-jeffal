import ProductCard from "./ProductCard";

import type {
  Product,
} from "../../types/product";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({
  products,
}: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="product-list-empty">
        <h3>
          Aucun produit
        </h3>

        <p>
          Aucun produit n'a encore été ajouté.
        </p>
      </div>
    );
  }

  return (
    <div className="product-list">
      {products.map(
        (product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        )
      )}
    </div>
  );
}