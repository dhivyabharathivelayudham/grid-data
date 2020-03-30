import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import { Toolbar, Data } from "react-data-grid-addons";
import createRowData from "./createRowData";

import "./styles.css";

const defaultColumnProperties = {
  filterable: true,
  width: 120
};

const selectors = Data.Selectors;

const columns = [
  {
    key: "id",
    name: "ID"
  },
  {
    key: "title",
    name: "Title"
  },
  {
    key: "firstName",
    name: "Firstname"
  },
  {
    key: "lastName",
    name: "Last Name"
  },
  {
    key: "email",
    name: "Email"
  },
  {
    key:"gender",
    name:"Gender"
  },
  {
    key:"mobileno",
    name:"Mobileno"

  }
 
  
  
].map(c => ({ ...c, ...defaultColumnProperties }));

const ROW_COUNT = 5;

const handleFilterChange = filter => filters => {
  const newFilters = { ...filters };
  if (filter.filterTerm) {
    newFilters[filter.column.key] = filter;
  } else {
    delete newFilters[filter.column.key];
  }
  return newFilters;
};

function getRows(rows, filters) {
  return selectors.getRows({ rows, filters });
}

function Excel({ rows }) {
  const [filters, setFilters] = useState({});
  const filteredRows = getRows(rows, filters);
  return (
    <ReactDataGrid
      columns={columns}
      rowGetter={i => filteredRows[i]}
      rowsCount={filteredRows.length}
      minHeight={500}
      toolbar={<Toolbar enableFilter={true} />}
      onAddFilter={filter => setFilters(handleFilterChange(filter))}
      onClearFilters={() => setFilters({})}
    />
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Excel rows={createRowData(5)} />, rootElement);
