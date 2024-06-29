
import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import {
  Select,
  Stack,
  Typography
} from "@mui/material";
import { motion } from "framer-motion";

const categoryArray = [
  "All",
  "Laptop",
  "Phone",
  "Keyboard",
  "Mouse",
  "Speaker",
  "Headphone",
  "Monitor",
  "Ram",
  "SSD",
  "Pendrive",
];

const AnimatedIconButton = motion(IconButton);

export default function Layout(props) {
  function handleTabChange(newTab) {
    props.onCategoryChange(categoryArray[newTab]);
  }
  function handleSortByChange(event) {
    if (event.target.value === "New") {
      props.onSortByChange("Launch_date");
    } else if (event.target.value === "Popularity") {
      props.onSortByChange("Rating");
    } else {
      props.onSortByChange(event.target.value);
    }
  }

  function handleSortDirectionChange() {
    props.onAscendingSort(!props.isSortPreferenceAscendingProp);
  }
  return (
    <>
      <Stack
        direction={"row"}
        display={"flex"}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
        width={"100%"}
      >
        <Stack sx={{ width: "60%" }}>
          <Stack
            direction={"row"}
            gap={2}
            overflow={"auto"}
            scroll="auto"
            sx={{ scrollbarWidth: "none" }}
            whiteSpace="nowrap"
            width={"100%"}
          >
            {categoryArray.map((category, i) => {
              return (
                <Button
                  key={i}
                  onClick={() => {
                    handleTabChange(i);
                  }}
                  sx={{ minWidth: "auto" }}
                  variant={
                    categoryArray.indexOf(props.currentTabProp) === i
                      ? "contained"
                      : "text"
                  }
                >
                  {category}
                </Button>
              );
            })}
          </Stack>
        </Stack>
        <Stack
          direction={"row"}
          display={"flex"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            minWidth={250}
            width={"40%"}
          >
            <AnimatedIconButton
              animate={{
                rotate: props.isSortPreferenceAscendingProp ? 180 : 0,
              }}
              onClick={handleSortDirectionChange}
            >
              <FilterListRoundedIcon />
            </AnimatedIconButton>
            <Stack
              alignItems={"center"}
              direction={"row"}
              display={"flex"}
              flexWrap={"wrap"}
            >
              <Typography>Sort by:</Typography>
            </Stack>
            <Select
              onChange={handleSortByChange}
              size="small"
              sx={{ width: "120px" }}
              value={
                props.sortByPreferenceProp === "Rating"
                  ? "Popularity"
                  : props.sortByPreferenceProp === "Launch_date"
                  ? "New"
                  : props.sortByPreferenceProp
              }
            >
              <MenuItem value={"Name"}>Name</MenuItem>
              <MenuItem value={"Price"}>Price</MenuItem>
              <MenuItem value={"Discount"}>Discount</MenuItem>
              <MenuItem value={"New"}>New Arrival</MenuItem>
              <MenuItem value={"Popularity"}>Popularity</MenuItem>
            </Select>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
