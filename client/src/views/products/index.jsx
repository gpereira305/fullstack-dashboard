import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Rating,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Header } from "../../components";
import { useGetProductsQuery } from "../../state/api";

export default function Products() {
  const { data, isLoading } = useGetProductsQuery();
  const isMobile = useMediaQuery("(max-width: 1000px)");

  return (
    <Box m="1.5rem 2.5rem" height="100%">
      <Header title={"PRODUTOS"} subtitle={"Lista de Produtos"} />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          justifyContent="space-between"
          gap="20px"
          // columnGap="1.33%"
          // sx={{
          //   "& > div": { gridColumn: isMobile ? undefined : "span 4" },
          // }}
        >
          {data?.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
              />
            )
          )}
        </Box>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "inherit",
            alignItems: "center",
          }}
        >
          <h1> Carregando...</h1>
        </div>
      )}
    </Box>
  );
}

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={Number(rating)} readOnly />

        <Typography variant="body2">{description}</Typography>

        <CardActions>
          <Button
            variant="primary"
            size="small"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {!isExpanded ? "Ver mais" : "Ver menos"}
          </Button>
        </CardActions>

        <Collapse
          in={isExpanded}
          timeout="auto"
          unmountOnExit
          sx={{ color: theme.palette.neutral[300] }}
        >
          <CardContent>
            <Typography>id: {_id}</Typography>
            <Typography>Suprimento: {supply}</Typography>
            <Typography>Vendas anuais: {stat.yearlySalesTotal}</Typography>
            <Typography>
              Vendas anuais por unidade: {stat.yearlyTotalSoldUnits}
            </Typography>
          </CardContent>
        </Collapse>
      </CardContent>
    </Card>
  );
};
