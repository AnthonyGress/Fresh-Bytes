import CategoryMenu from "../components/CategoryMenu";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const Order = () => {
  return (
    <section id="order">
      <Typography align="center" variant="h2">
        {"Order"}
      </Typography>
      <CategoryMenu />
    </section>
  );
};

export default Order;
