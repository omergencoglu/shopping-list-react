import { createContext, useState, useEffect, useRef } from "react";

import Layout from "./components/Layout/Layout";
import ItemList from "./components/Items/ItemList";
import NewItem from "./components/NewItem/NewItem";
import FilterListButton from "./components/UI/FilterListButton";

export const ItemContext = createContext();

function App() {
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState("all");

  const isMounted = useRef(false);

  const onOptionChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const listLocal = JSON.parse(localStorage.getItem("todos-list"));
    if (listLocal) {
      setList(listLocal);
    }
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem("todos-list", JSON.stringify(list));
    } else {
      isMounted.current = true;
    }
  }, [list]);

  const addItemHandler = (enteredText) => {
    setList((prevItems) => {
      const updatedList = [...prevItems];
      updatedList.unshift({
        text: enteredText,
        id: crypto.randomUUID(),
        completed: false,
      });
      return updatedList;
    });
  };

  return (
    <ItemContext.Provider value={{ list: list, setList: setList }}>
      <Layout>
        <NewItem onAddItem={addItemHandler} />
        <ItemList items={list} filter={filter} />
        <FilterListButton filter={filter} changeHandler={onOptionChange} />
      </Layout>
    </ItemContext.Provider>
  );
}

export default App;
