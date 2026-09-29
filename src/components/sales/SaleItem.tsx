import type { Product } from "../../types/product";

interface SaleItemProps {
  product: Product;
  quantity: number;
  onQuantityChange: (
    quantity: number
  ) => void;
  onRemove: () => void;
}

export default function SaleItem({
  product,
  quantity,
  onQuantityChange,
  onRemove,
}: SaleItemProps) {
  const total =
    product.selling_price *
    quantity;

  return (
    <div className="sale-item">

      <div className="sale-item-info">
        <strong>
          {product.name}
        </strong>

        <span>
          {product.selling_price.toLocaleString(
            "fr-FR"
          )}{" "}
          FCFA / unité
        </span>
      </div>

      <div className="sale-item-quantity">
        <label
          htmlFor={`quantity-${product.id}`}
        >
          Quantité
        </label>

        <input
          id={`quantity-${product.id}`}
          type="number"
          min="1"
          max={product.stock_quantity}
          value={quantity}
          onChange={(event) => {
            const newQuantity =
              Number(event.target.value);

            if (
              Number.isFinite(
                newQuantity
              ) &&
              newQuantity >= 1 &&
              newQuantity <=
                product.stock_quantity
            ) {
              onQuantityChange(
                newQuantity
              );
            }
          }}
        />
      </div>

      <div className="sale-item-total">
        <strong>
          {total.toLocaleString(
            "fr-FR"
          )}{" "}
          FCFA
        </strong>
      </div>

      <button
        type="button"
        className="sale-item-remove"
        onClick={onRemove}
      >
        Retirer
      </button>

    </div>
  );
}