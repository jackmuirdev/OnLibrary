import { Grid, Paper } from "@mui/material";
import Loading from "../../components/common/Loading";
import ProductList from "../../components/layout/interface/catalogue-page/ProductList";
import useProducts from "../../hooks/useProducts";
import { setProductParams, setPageNumber } from "../../slices/catalogSlice";
import { useAppSelector, useAppDispatch } from "../../store/configureStore";
import NotFound from "../errors/NotFoundScreen";
import CustomPagination from "../../components/layout/interface/catalogue-page/CustomPagination";
import ProductSearch from "../../components/layout/interface/catalogue-page/ProductSearch";
import RadioButtonGroup from "../../components/layout/interface/catalogue-page/RadioButtonGroup";
import CheckBoxButtons from "../../components/layout/interface/catalogue-page/CheckBoxButtons";

const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceDesc', label: 'Price - High to Low' },
  { value: 'price', label: 'Price - Low to High' }
]

const CatalogueScreen = () => {
  const { products, filtersLoaded, authors, categories, metaData } = useProducts();
  const { productParams } = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  if (!filtersLoaded) return <Loading />

  if (!products) return <NotFound />

  return (
    <>
      <Grid container columnSpacing={4} sx={{ width: '100%', maxWidth: 'initial', padding: "50px" }}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ mb: 2 }}>
            <ProductSearch />
          </Paper>
          <Paper sx={{ mb: 2, p: 2 }}>
            <RadioButtonGroup
              selectedValue={productParams.orderBy}
              options={sortOptions}
              onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))}
            />
          </Paper>
          <Paper sx={{ mb: 2, p: 2 }}>
            <CheckBoxButtons
              items={authors}
              checked={productParams.authors}
              onChange={(items: string[]) => dispatch(setProductParams({ authors: items }))}
            />
          </Paper>
          <Paper sx={{ mb: 2, p: 2 }}>
            <CheckBoxButtons
              items={categories}
              checked={productParams.categories}
              onChange={(items: string[]) => dispatch(setProductParams({ categories: items }))}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <ProductList products={products} />
        </Grid>
        <Grid item xs={12} md={9} sx={{ mb: 2, mt: 3 }}>
          {metaData &&
            <CustomPagination
              metaData={metaData}
              onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))}
            />}
        </Grid>
      </Grid>
    </>
  )
}

export default CatalogueScreen;