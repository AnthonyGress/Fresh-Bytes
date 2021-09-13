import React, { useEffect } from "react";
import ProductItem from "../ProductItem";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";
import { makeStyles } from "@material-ui/core/styles";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: { maxWidth: "300px" },
  media: {
    height: 250,
    width: 300,
    paddingTop: "56.25%", // 16:9
  },
  box: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  push: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    paddingRight: "1rem",
    paddingLeft: "1rem",
  },
}));

function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      idbPromise("products", "get").then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }
  const theme = useTheme();
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  let gridClass;
  isMobile ? (gridClass = classes.box) : (gridClass = null);
  return (
    <Box>
      {state.products.length ? (
        <Grid container spacing={3}>
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </Grid>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </Box>
  );
}

export default ProductList;
