let SortFilter = ({ onSortChange }) => {
  return (
    <div>
      <select onChange={(e) => onSortChange(e.target.value)}>
        <option value="price-asc">Price Low to High</option>
        <option value="price-desc">Price High to Low</option>
        <option value="sqft-asc">Sqft Low to High</option>
        <option value="sqft-desc">Sqft High to Low</option>
      </select>
    </div>
  );
};

export default SortFilter;
