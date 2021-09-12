import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

const Account = () => {
  const { data } = useQuery(QUERY_USER);
  let user;
  if (data) {
    user = data.user;
  }
  // format date helper
  const formatDate = (timestamp) => new Date(parseInt(timestamp));
  const createdAt = formatDate(user.createdAt).toLocaleString();
  const updatedAt = formatDate(user.updatedAt).toLocaleString();
  return (
    <section id="account">
      <Container>
        <Typography align="center" variant="h2">
          {"My Account"}
        </Typography>
        <Box>
          <Typography align="center" variant="h5">
            {`${user.firstName} ${user.lastName}`}
          </Typography>
          <Typography align="center" variant="h5">
            {`Account creation date: ${createdAt}`}
          </Typography>
          {/* if the password has ever been updated (doesn't match creation date) */}
          {updatedAt !== createdAt && (
            <Typography align="center" variant="h5">
              {`Password last updated: ${updatedAt}`}
            </Typography>
          )}
        </Box>
      </Container>
    </section>
  );
};

export default Account;
