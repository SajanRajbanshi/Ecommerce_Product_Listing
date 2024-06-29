import {
  CardContent,
  CardMedia,
  Typography,
  Stack,
  CardActions,
  Button,
} from "@mui/material";
import Card from "@mui/material/Card";

export default function Product(props) {
  return (
    <>
      <Stack
        display={"flex"}
        direction={"row"}
        flexWrap={"wrap"}
        gap={2}
        justifyContent={"space-evenly"}
      >
        {props.productArrayProp.slice(0, 21).map((product) => {
          return (
            <Card
              key={`${product.Category}${product.Name}${product.ID}`}
              sx={{
                height: "420px",
                marginTop: 2,
                padding: 1,
                width: "300px",
              }}
            >
              <CardMedia
                alt={product.Name}
                component="img"
                height={"200px"}
                image={product.Thumbnail_url}
                width={"280px"}
              ></CardMedia>
              <CardContent sx={{ height: "140px" }}>
                <Stack
                  alignItems={"center"}
                  direction={"row"}
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  <Typography variant="h5">{product.Name}</Typography>
                  <Typography fontSize={"12px"} sx={{ color: "grey" }}>
                    {product.Category}
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  <Typography variant="h5">
                    Price: Rs {product.Price}
                  </Typography>
                  <Typography fontSize={"12px"} color={"green"}>
                    -{product.Discount}%
                  </Typography>
                  <Typography variant="h5">{product.Rating}/5</Typography>
                </Stack>
                <Stack>
                  <Typography fontSize={"12px"} color={"grey"}>
                    {product.Launch_date}
                  </Typography>
                </Stack>
              </CardContent>
              <CardActions>
                <Button>Add to Cart</Button>
                <Button>Buy now</Button>
              </CardActions>
            </Card>
          );
        })}
      </Stack>
    </>
  );
}
