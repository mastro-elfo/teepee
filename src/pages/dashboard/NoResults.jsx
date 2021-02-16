import React from "react";

import { useTranslation } from "react-i18next";

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
  Typography,
} from "@material-ui/core";

import { Push } from "mastro-elfo-mui";

import SadIcon from "@material-ui/icons/SentimentVeryDissatisfied";
// import NotFoundImage from "../../assets/404.png";

export default function NoResultFound({ query }) {
  const { t } = useTranslation();

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
          title={t("DashboardNoResultCard:Header")}
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
          <Push href={`/product/c?${field}=${query}`}>
            <Button
              color="primary"
              variant="contained"
              title={t("DashboardNoResultCard:create-new-title")}
              size="small"
            >
              {t("Add")}
            </Button>
          </Push>
        </CardActions>
      </Card>
    </Box>
  );
}
