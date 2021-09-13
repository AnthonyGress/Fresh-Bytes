import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
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
import { Alert } from "@material-ui/lab/";

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

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const { image, name, _id, price, quantity } = item;

  const { cart } = state;

  const addToCart = () => {
    console.log(cart);
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  const theme = useTheme();
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    // <div className="card px-1 py-1">
    //   <Link to={`/products/${_id}`}>
    //     <img
    //       alt={name}
    //       src={`/images/${image}`}
    //       height={367.25}
    //       width={367.25}
    //     />
    //     <Typography>{name}</Typography>
    //   </Link>
    //   <div>
    //     {/* <div>{quantity} {pluralize("item", quantity)} in stock</div> */}
    //     <span>${price}</span>
    //   </div>
    //   <button onClick={addToCart}>Add to cart</button>
    // </div>

    <Grid item xs={12} sm={6} md={4} lg={3} align="center">
      <Card className={classes.card} elevation={8}>
        <Link to={`/products/${_id}`}>
          <CardMedia
            image={`/images/${image}`}
            className={`${classes.media}`}
          />
          <Box pl={1} pr={1} pb={2} pt={1}>
            <Typography variant="h6" align="center" noWrap={true}>
              {name}
            </Typography>
          </Box>
        </Link>
        <CardActions>
          <Box className={classes.push}>
            <Box pt={1}>
              <Box pb={1}>
                <span>${price}</span>
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
    </Grid>

    // <Grid item xs={12} md={3}>
    //   <Card className={classes.card} elevation={8}>
    //     <Link to={`/products/${_id}`}>
    //       <CardMedia
    //         image={`/images/${image}`}
    //         className={classes.media}
    //       ></CardMedia>
    //     </Link>
    //     <Box className={classes.box} pt={1}>
    //       <Typography variant="h6" noWrap={true}>
    //         {name} {quantity && `x ${quantity}`}
    //       </Typography>
    //       <Box pb={2}>
    //         <span></span>
    //       </Box>
    //     </Box>
    //     <CardActions>
    // <Box className={classes.push}>
    //   <Box pt={1}>
    //     <Box pb={1}>
    //       <span>${price}</span>
    //     </Box>
    //   </Box>
    //   <Button
    //     variant="contained"
    //     onClick={addToCart}
    //     style={{
    //       background: "var(--secondary)",
    //     }}
    //   >
    //     Add to Cart
    //   </Button>
    // </Box>
    //     </CardActions>
    //   </Card>
    // </Grid>
  );
}

export default ProductItem;
