import React, { useState } from "react";

import clsx from "clsx";
import { useSnackbar } from "notistack";

import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  CardContent,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Push } from "mastro-elfo-mui";

import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import StorageIcon from "@material-ui/icons/Storage";
import VisibilityIcon from "@material-ui/icons/Visibility";

import { useCart } from "../cart/context";

const useStyles = makeStyles(theme => ({
  expand: {
    transform: "rotate(0deg)",
    // marginLeft: 'auto',
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
}));

export default function ResultCard({ item, expand = false }) {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(expand);
  const [cart, setCart] = useCart();

  const handleAddCart = () => {
    const copy = cart.slice();
    const index = copy.findIndex(i => i.id === item.id);
    if (index !== -1) {
      copy[index].quantity += 1;
    } else {
      copy.push({ ...item, quantity: 1 });
    }
    setCart(copy);
    enqueueSnackbar(`${item.name} aggiunto al carrello`, { variant: "info" });
  };

  const { id, name, description, barcode, stock, price } = item;

  return (
    <Box py={1}>
      <Card>
        <CardActionArea component="div" onClick={() => setExpanded(!expanded)}>
          <CardHeader
            title={name}
            subheader={expanded ? barcode : description}
            action={
              <Box mt={2} mr={1}>
                <ExpandMoreIcon
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded
                  })}
                />
              </Box>
            }
          />
          <Collapse in={expanded} unmountOnExit>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                {description}
              </Typography>
              <Grid container spacing={1}>
                <Grid item>
                  <Typography variant="body1">{`${price.toFixed(
                    2
                  )}€`}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Prezzo
                  </Typography>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item>
                  <Typography variant="body1">{stock}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Magazzino
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Collapse>
        </CardActionArea>

        <Collapse in={expanded} unmountOnExit>
          <CardActions>
            <Push
              Component={IconButton}
              href={`/product/v/${id}`}
              title="Apri scheda prodotto"
            >
              <VisibilityIcon />
            </Push>
            <IconButton title="Aggiungi al carrello" onClick={handleAddCart}>
              <AddShoppingCartIcon />
            </IconButton>
            {
              //   <IconButton size="small" title="Gestisci magazzino">
              //   <StorageIcon />
              // </IconButton>
            }
          </CardActions>
        </Collapse>
      </Card>
    </Box>
  );
}

/*


*/
