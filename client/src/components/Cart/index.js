import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Container, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";

import CloseIcon from "@material-ui/icons/Close";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import CartItem from "../CartItem";
// import Auth from "../../utils/auth";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_MULTIPLE_TO_CART, CLEAR_CART } from "../../utils/actions";
// import "./style.css";
const drawerWidth = 420;
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: "flex",
  // },
  // appBar: {
  //   transition: theme.transitions.create(["margin", "width"], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen,
  //   }),
  // },
  // appBarShift: {
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   transition: theme.transitions.create(["margin", "width"], {
  //     easing: theme.transitions.easing.easeOut,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  //   marginRight: drawerWidth,
  // },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    // width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    paddingTop: "calc(env(safe-area-inset-top, 0)/1.5)",
    paddingLeft: "env(safe-area-inset-left, 0)",
    paddingRight: "env(safe-area-inset-right, 0)",
    paddingBottom: "0",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

export default function CartDrawer() {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  // function toggleCart() {
  //   dispatch({ type: TOGGLE_CART });
  // }

  // function clearCart() {
  //   dispatch({ type: CLEAR_CART });
  // }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    // setTotal(sum.toFixed(2));
    return sum.toFixed(2);
  }

  function submitCheckout() {
    if (!loading) {
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setLoading(false);
      }, 12000);
    }
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        // let productObj = { id: item._id, quantity: item.purchaseQuantity };
        productIds.push(item._id);
        // productIds.push(productObj);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  const classes = useStyles();
  // const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [loading, setLoading] = React.useState(false);
  const timer = React.useRef();
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        // edge="end"
        onClick={handleDrawerOpen}
        // className={clsx(open && classes.hide)}
      >
        <ShoppingCartOutlinedIcon fontSize="large" />
      </IconButton>

      <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Box
          className={classes.drawerHeader}
          style={{ background: "var(--primary)" }}
        >
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon style={{ color: "var(--light)" }} fontSize="large" />
          </IconButton>
        </Box>
        <Divider />
        <Box mb={1} mt={1}>
          <Typography align="center" variant="h4">
            {"Cart"}
          </Typography>
        </Box>

        {state.cart.length ? (
          <Container>
            <Typography align="center" variant="h6">
              {`Total: $${calculateTotal()}`}
            </Typography>
            <Box mb={3} boxShadow={5}>
              <Button
                variant="contained"
                style={{ background: "var(--secondary)", minHeight: "36px" }}
                fullWidth={true}
                disabled={loading}
                onClick={submitCheckout}
              >
                {loading ? (
                  <CircularProgress
                    size={25}
                    style={{
                      color: "var(--primary)",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: -12,
                      marginLeft: -12,
                    }}
                  />
                ) : (
                  "Proceed to Checkout"
                )}
              </Button>
            </Box>
            <Grid container spacing={4}>
              {state.cart.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
              {/* <strong>Total: ${calculateTotal()}</strong> */}
              {/* {Auth.loggedIn() ? (
                <button onClick={submitCheckout}>Checkout</button>
              ) : (
                <span>(log in to check out)</span>
              )} */}
              {/* <button onClick={submitCheckout}>Checkout</button> */}
            </Grid>
            {/* <Box>
              <Button onClick={clearCart}>Clear Cart</Button>
            </Box> */}
          </Container>
        ) : (
          <>
            <Box mt={1}>
              <Typography align="center" variant="h5">
                {"Your cart is empty, add some items!"}
              </Typography>
            </Box>
            <Link to="/order">
              <Box mt={2} mr={2} ml={2}>
                <Button
                  variant="contained"
                  style={{ background: "var(--secondary)", minHeight: "36px" }}
                  fullWidth={true}
                  disabled={loading}
                  onClick={handleDrawerClose}
                >
                  Order Now
                </Button>
              </Box>
            </Link>
          </>
        )}
      </Drawer>
    </>
  );
}
