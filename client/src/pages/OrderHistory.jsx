import React from "react";
import { Link } from "react-router-dom";
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
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

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
  rowEnd: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    padding: "1rem",
  },
}));

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }
  console.log(user);
  const theme = useTheme();
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <section>
      {user ? (
        <>
          <Typography align="center" variant="h2">
            {`${user.firstName}'s Past Orders `}
          </Typography>
          <Box ml={3} mr={3} mt={2}>
            {user.orders.map((order) => (
              <Box key={order._id} mb={4}>
                <Paper elevation={12}>
                  <Box pt={2} pb={2} className={classes.rowEnd}>
                    <Typography variant="h5" align="center">
                      {"Order on "}
                      {new Date(
                        parseInt(order.purchaseDate)
                      ).toLocaleDateString()}
                    </Typography>
                    <Typography variant="h5" align="center">
                      {`Total: $${order.total}`}
                    </Typography>
                  </Box>
                  <Box className={isMobile ? classes.box : classes.row}>
                    {order.products.map(
                      ({ _id, image, name, price, quantity }, index) => (
                        <Box mt={1} mb={2} key={index}>
                          <Card className={classes.card} elevation={8}>
                            <Link to={`/products/${_id}`}>
                              <CardMedia
                                image={`/images/${image}`}
                                className={classes.media}
                              ></CardMedia>
                            </Link>
                            <Box className={classes.box} pt={1}>
                              <Typography variant="h6" noWrap={true}>
                                {name} {quantity && `x ${quantity}`}
                              </Typography>
                              <Box pb={1}>
                                <span>${price}</span>
                              </Box>
                            </Box>
                          </Card>
                        </Box>
                      )
                    )}
                  </Box>
                </Paper>
              </Box>
            ))}
          </Box>
        </>
      ) : null}
    </section>
  );
}

export default OrderHistory;
