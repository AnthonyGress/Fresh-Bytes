import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import ProductList from "../ProductList";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { Typography, theme, useMediaQuery } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Container, Box } from "@material-ui/core";
import { Link, scroller, scrollToTop, animateScroll } from "react-scroll";

const useStyles = makeStyles((theme) => ({
  catOption: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "8px !important",
  },
  catOptionProducts: {
    backgroundColor: "white",
  },
  catOptionTitle: {
    color: "white",
    fontSize: "1.8em",
    fontFamily: "Oswald, monospace",
    fontWeight: "300",
    letterSpacing: "2px",
  },
}));

function CategoryMenu() {
  const classes = useStyles();

  const [state, dispatch] = useStoreContext();
  const [expanded, setExpanded] = React.useState(false);
  const [expandCount, setCount] = React.useState(0);

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
    } else if (!loading) {
      idbPromise("categories", "get").then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);

    setCount(
      isExpanded
        ? (prevExpandCount) => prevExpandCount + 1
        : (prevExpandCount) => prevExpandCount - 1
    );
    !isExpanded & (expandCount <= 1) && resetScroll();
    isExpanded && scrollToItem(panel);
  };

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  const scrollToItem = (item) => {
    const isMobile = window.outerWidth < 968;
    let offsetVal;
    isMobile ? (offsetVal = -84) : (offsetVal = -60);
    scroller.scrollTo(item, {
      offset: offsetVal,
      smooth: true,
      isDynamic: true,
      duration: 600,
    });
    // console.log(isMobile);
  };

  const resetScroll = () => {
    // window.scrollTo(0, 0);
    const scroll = animateScroll;
    scroll.scrollToTop({ delay: 0, duration: 400 });
  };
  // console.log(expandCount);
  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      {categories.map((item) => (
        <Accordion
          TransitionProps={{ unmountOnExit: true }}
          // expanded={expanded === item.name}
          onChange={handleChange(item.name)}
          key={item._id}
          className={classes.catOption}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
            aria-controls="panel1bh-content"
            id={item.name}
            name={item.name}
            // onClick={() => {
            // }}
          >
            <Typography className={classes.catOptionTitle}>
              {item.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            className={classes.catOptionProducts}
            style={{ display: "block" }}
          >
            <ProductList />
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}

export default CategoryMenu;
