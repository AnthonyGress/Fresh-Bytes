import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Cart from "../components/Cart";
import { useStoreContext } from "../utils/GlobalState";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from "../utils/actions";
import { QUERY_PRODUCTS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import spinner from "../assets/spinner.gif";
import {
  Container,
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  Paper,
  useTheme,
  useMediaQuery,
  CardContent,
  CardActions,
  CardHeader,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: { maxWidth: "40%" },
  cardMobile: { maxWidth: "90%" },
  media: {
    height: 400,
    width: 450,
    paddingTop: "56.25%", // 16:9
    borderRadius: "8px",
    maxWidth: "92%",
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

function Detail() {
  const classes = useStyles();
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise("products", "get").then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    idbPromise("cart", "delete", { ...currentProduct });
  };
  let cardClass;
  isMobile ? (cardClass = classes.cardMobile) : (cardClass = classes.card);

  return (
    <section>
      {currentProduct && cart ? (
        <Box>
          <Typography align="center" variant="h3">
            {`Details`}
          </Typography>
          <Box className={classes.row} mt={2} mb={3}>
            <Card className={cardClass} elevation={8}>
              <CardHeader title={currentProduct.name} align="center" />
              <Box className={classes.box}>
                <CardMedia
                  image={`/images/${currentProduct.image}`}
                  className={classes.media}
                />
              </Box>
              <CardContent>
                <Typography variant="body2">
                  {currentProduct.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Box className={classes.push}>
                  <Box className={classes.box} pt={1}>
                    <Box pb={1}>
                      <span>${currentProduct.price}</span>
                    </Box>
                  </Box>
                  <Button
                    variant="contained"
                    onClick={addToCart}
                    style={{
                      background: "var(--secondary)",
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Box>
          {/* <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{" "}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentProduct._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          /> */}
        </Box>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </section>
  );
}

export default Detail;
