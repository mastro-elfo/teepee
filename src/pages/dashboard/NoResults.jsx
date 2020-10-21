import React from "react";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  // CardMedia,
  // IconButton,
  Typography
} from "@material-ui/core";

import { Push } from "mastro-elfo-mui";

import SadIcon from "@material-ui/icons/SentimentVeryDissatisfied";
// import NotFoundImage from "../../assets/404.png";

export default function NoResultFound({ query }) {
  const field = query.match(/^\d+$/) ? "barcode" : "name";

  return (
    <Box py={1}>
      <Card>
        {
          //   <CardMedia
          //   style={{ height: 140 }}
          //   image={NotFoundImage}
          //   title="Oh no!"
          // />
        }
        <CardHeader
          title="Nessun prodotto trovato"
          action={
            <Box mt={2} mr={1}>
              <SadIcon color="secondary" />
            </Box>
          }
        />
        <CardContent>
          <Typography variant="h6" color="textSecondary">
            {query}
          </Typography>
        </CardContent>

        <CardActions>
          <Push
            Component={Button}
            href={`/product/c?${field}=${query}`}
            color="primary"
            variant="contained"
            title="Crea nuovo prodotto"
            size="small"
          >
            Aggiungi
          </Push>
          {
            //   <IconButton size="small" title="Apri scheda prodotto">
            //     <VisibilityIcon />
            //   </IconButton>
          }
        </CardActions>
      </Card>
    </Box>
  );
}
