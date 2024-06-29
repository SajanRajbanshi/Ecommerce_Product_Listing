import { useState, useEffect } from "react";
import { TextField, Typography } from "@mui/material";
import products from "./assets/database.json";
import Stack from "@mui/material/Stack";

const categoryArray = [
  { Name: "Laptop", Category: "Category" },
  { Name: "Phone", Category: "Category" },
  { Name: "Keyboard", Category: "Category" },
  { Name: "Mouse", Category: "Category" },
  { Name: "Speaker", Category: "Category" },
  { Name: "Headphone", Category: "Category" },
  { Name: "Monitor", Category: "Category" },
  { Name: "Ram", Category: "Category" },
  { Name: "SSD", Category: "Category" },
  { Name: "Pendrive", Category: "Category" },
];

export default function Header(props) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isSuggestionMenuActive, setSuggestionMenu] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [productArray, setProductArray] = useState([]);

  function handleKeyUp(event) {
    if (event.key === "Enter") {
      console.log("enter key pressed");
      props.onEnterPress(productArray);
    }
  }

  function handleSuggestionClick(product) {
    console.log("suggestion clicked");
    props.onSuggestionClick(product);
    setSearchKeyword(product.Name);
    setSuggestionMenu(false);
  }
//useEffect is de
  useEffect(() => {
    setLoading(true);
    let newArray1 = products.filter((product) => {
      return product.Name.toLowerCase().includes(searchKeyword.toLowerCase());
    });
    let newArray2 = categoryArray.filter((category) => {
      return category.Name.toLowerCase().includes(
        searchKeyword.toLocaleLowerCase()
      );
    });
    let newArray = newArray2.concat(newArray1);
    setProductArray(newArray);
    setLoading(false);
  }, [searchKeyword]);

  return (
    <>
      <>
        <Stack
          direction={"row"}
          display={"flex"}
          justifyContent={"center"}
          paddingY={2}
          position={"relative"}
          sx={{ backgroundColor: "lightgreen" }}
          width={"100%"}
        >
          <Stack width={"50%"}>
            <TextField
              autoComplete="off"
              label="Search..."
              onChange={(event) => {
                console.log(event.target.value);
                setSearchKeyword(event.target.value);
              }}
              onClick={() => {
                setSuggestionMenu(true);
              }}
              onFocus={() => {
                setSuggestionMenu(true);
              }}
              onBlur={() => {
                setSuggestionMenu(false);
              }}
              onKeyUp={handleKeyUp}
              placeholder="What are you looking for?"
              sx={{ backgroundColor: "white" }}
              value={searchKeyword}
              varient="outlined"
            ></TextField>
          </Stack>
          {isSuggestionMenuActive && !isLoading ? (
            <Stack
              direction={"column"}
              gap={1}
              left={"50%"}
              position={"absolute"}
              sx={{
                transform: "translateX(-50%)",
                backgroundColor: "#eeeeee",
                zIndex: 2,
                borderRadius: "20px",
              }}
              top={"90%"}
              width={"50%"}
            >
              {productArray.slice(0, 6).map((product) => {
                return (
                  <Stack
                    direction={"row"}
                    marginX={2}
                    marginY={1}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      setSuggestionMenu(true);
                      handleSuggestionClick(product);
                    }}
                    key={`${product.Category}${product.Name}${product.ID}`}
                  >
                    <Typography>{product.Name}</Typography>
                    <Typography marginLeft={2} color={"grey"}>
                      {product.Category}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
          ) : (
            <></>
          )}
        </Stack>
      </>
    </>
  );
}
