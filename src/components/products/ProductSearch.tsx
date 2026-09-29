import {
  useEffect,
  useState,
} from "react";

interface ProductSearchProps {
  value?: string;
  onChange: (
    value: string
  ) => void;
  placeholder?: string;
}

export default function ProductSearch({
  value = "",
  onChange,
  placeholder = "Rechercher un produit...",
}: ProductSearchProps) {
  const [
    search,
    setSearch,
  ] = useState(value);

  useEffect(() => {
    setSearch(value);
  }, [value]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue =
      event.target.value;

    setSearch(newValue);
    onChange(newValue);
  };

  return (
    <div className="product-search">
      <label
        htmlFor="product-search-input"
      >
        Rechercher
      </label>

      <input
        id="product-search-input"
        type="search"
        value={search}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
}