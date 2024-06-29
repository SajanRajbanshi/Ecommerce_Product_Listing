import "./App.css";
import { useState, useEffect, useRef } from "react";
import products from "./assets/database.json";
import Header from "./Header";
import Product from "./Product";
import Layout from "./components/Layout";

function App() {
  const originalSearchResults = useRef(products);
  const [category, setCategory] = useState("All");
  const [productArray, setProductArray] = useState(
    originalSearchResults.current
  );
  const [isLoading, setIsLoading] = useState(true);
  const [sortAscending, setSortAscending] = useState(false);
  const [sortBy, setSortBy] = useState("Rating");

  function handleSuggestionClick(product) {
    if (product.Category === "Category") {
      setProductArray(products);
      originalSearchResults.current = products;
      setCategory(product.Name);
    } else {
      setProductArray([product]);
      originalSearchResults.current = [product];
      setCategory("All");
    }
  }

  function handleEnterClick(productArraySearchResults) {
    let newArray = productArraySearchResults.filter(
      (product) => product.Category !== "Category"
    );
    setProductArray(newArray);
    originalSearchResults.current = newArray;
    setCategory("All");
  }

  function sortAsPer(newArray) {
    let sortedArray;
    if (sortBy === "Name") {
      if (sortAscending) {
        sortedArray = newArray.sort((a, b) => {
          return a.Name.toLowerCase().localeCompare(b.Name.toLowerCase());
        });
      } else {
        sortedArray = newArray.sort((a, b) => {
          return b.Name.toLowerCase().localeCompare(a.Name.toLowerCase());
        });
      }
    } else if (sortBy === "Launch_date") {
      if (sortAscending) {
        sortedArray = newArray.sort((a, b) => {
          return new Date(a.Launch_date) - new Date(b.Launch_date);
        });
      } else {
        sortedArray = newArray.sort((a, b) => {
          return new Date(b.Launch_date) - new Date(a.Launch_date);
        });
      }
    } else {
      if (sortAscending) {
        sortedArray = newArray.sort((a, b) => {
          return a[sortBy] - b[sortBy];
        });
      } else {
        sortedArray = newArray.sort((a, b) => {
          return b[sortBy] - a[sortBy];
        });
      }
    }
    return sortedArray;
  }

  function handleSortByChange(value) {
    setSortBy(value);
  }

  function handleSortDirectionChange(value) {
    setSortAscending(value);
  }

  function handleCategoryChange(value) {
    setCategory(value);
  }

  useEffect(() => {
    let newArray;
    setIsLoading(true);
    if (category === "All") {
      newArray = originalSearchResults.current;
    } else {
      newArray = originalSearchResults.current.filter((product) => {
        return product.Category === category;
      });
    }
    newArray = sortAsPer([...newArray]);
    setProductArray(newArray);
    setIsLoading(false);
  }, [category, sortAscending, sortBy]);

  return (
    <>
      <Header
        onEnterPress={handleEnterClick}
        onSuggestionClick={handleSuggestionClick}
      ></Header>
      <Layout
        currentTabProp={category}
        isSortPreferenceAscendingProp={sortAscending}
        onAscendingSort={handleSortDirectionChange}
        onCategoryChange={handleCategoryChange}
        onSortByChange={handleSortByChange}
        sortByPreferenceProp={sortBy}
      ></Layout>
      {isLoading ? <></> : <Product productArrayProp={productArray}></Product>}
    </>
  );
}

export default App;
