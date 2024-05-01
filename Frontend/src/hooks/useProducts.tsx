import { useEffect } from "react";
import { productSelectors, fetchProductsAsync, fetchFilters } from "../slices/catalogSlice";
import { useAppSelector, useAppDispatch } from "../store/configureStore";

export default function useProducts() {
  const products = useAppSelector(productSelectors.selectAll)
  const { productsLoaded, filtersLoaded, authors, categories, productParams, metaData } = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [dispatch, filtersLoaded]);

  return { products, authors, categories, productParams, metaData, filtersLoaded}
}