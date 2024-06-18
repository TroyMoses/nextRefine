"use client"

import React from "react";
import { useDataGrid, List } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface IPost {
    id: number;
    name: string;
  }

const ProductList: React.FC = () => {
  const { dataGridProps } = useDataGrid();
  return (
    <List>
      <DataGrid {...dataGridProps} columns={[
        { field: "id", headerName: "ID", type: "number" },
        { field: "name", headerName: "Name", flex: 1 },
      ]} />
    </List>
  );
};

export default ProductList;
