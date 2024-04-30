import { TextField } from "@mui/material";
import { useState } from "react";
import { setProductParams, fetchProductsAsync } from "../../../../slices/catalogSlice";
import { useAppSelector, useAppDispatch } from "../../../../store/configureStore";

const ProductSearch = () => {
  const { productParams } = useAppSelector((state) => state.catalog);
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
  const dispatch = useAppDispatch();

  const handleSearch = async () => {
    dispatch(setProductParams({ searchTerm }));
    await dispatch(fetchProductsAsync());
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <TextField
      label="Search Products"
      variant="outlined"
      fullWidth
      value={searchTerm || ''}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
      }}
      onKeyPress={handleKeyPress}
    />
  );
};

export default ProductSearch;