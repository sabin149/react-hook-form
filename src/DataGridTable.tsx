import {
  AppBar,
  Box,
  Container,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridSortModel,
  GridToolbar,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import "./App.css";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
  },
  {
    field: "userId",
    headerName: "User ID",
    width: 70,
  },
  {
    field: "title",
    headerName: "Title",
    width: 200,
  },
  {
    field: "body",
    headerName: "Body",
    flex: 1,
  },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbar />
    </GridToolbarContainer>
  );
}

interface ResponseInterface {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface PageStateInterface {
  isLoading: boolean;
  data: ResponseInterface[];
  total: number;
  page: number;
  pageSize: number;
  order: string;
  sort: string;
  search: string;
}

function App() {
  const [pageState, setPageState] = useState<PageStateInterface>({
    isLoading: false,
    data: [],
    total: 100,
    page: 1,
    pageSize: 10,
    order: "",
    sort: "",
    search: "",
  });

  console.log({ search: pageState.search });

  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({ ...old, isLoading: true }));
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageState.page}&q=${pageState.search}&_sort=${pageState.sort}&_order=${pageState.order}&_limit=${pageState.pageSize}`
      );
      const json = await response.json();
      setPageState((old) => ({
        ...old,
        isLoading: false,
        data: json,
      }));
    };
    fetchData();
  }, [
    pageState.page,
    pageState.pageSize,
    pageState.sort,
    pageState.order,
    pageState.search,
  ]);

  return (
    <Box>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div">
            Server-side Pagination demo
          </Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: 100, marginBottom: 100 }}>
        <div className="search__div">
          <TextField
            type="text"
            size="small"
            placeholder="Search"
            value={pageState.search}
            onChange={(e) => {
              setPageState((old) => ({
                ...old,
                search: e.target.value,
                isLoading: true,
              }));
            }}
          />
        </div>
        <DataGrid
          autoHeight
          rows={pageState.data}
          rowCount={pageState.total}
          // loading={pageState.isLoading}
          pagination
          paginationMode="server"
          pageSizeOptions={[5, 10, 20]}
          paginationModel={{
            page: pageState.page - 1,
            pageSize: pageState.pageSize,
          }}
          onPaginationModelChange={(model, details) => {
            // console.log({ model, details });
            setPageState((old) => ({
              ...old,
              page: model.page + 1,
              pageSize: model.pageSize,
              isLoading: false,
            }));
          }}
          columns={columns}
          slots={{
            toolbar: CustomToolbar,
          }}
          sortingMode="server"
          onSortModelChange={(model: GridSortModel) => {
            const field = model[0]?.field || "id";
            const sort = model[0]?.sort || "asc";

            // check if the current sort is ascending and the field is either 'id' or 'userId'
            if (sort === "asc" && (field === "id" || field === "userId")) {
              setPageState((old: PageStateInterface) => ({
                ...old,
                sort: field,
                order: "desc",
                isLoading: true,
              }));

              // check if the current sort is descending and the field is either 'id' or 'userId'
            } else if (
              sort === "desc" &&
              (field === "id" || field === "userId")
            ) {
              // if so, remove the sort
              setPageState((old: PageStateInterface) => ({
                ...old,
                sort: "",
                order: "",
                isLoading: true,
              }));

              // otherwise, just set the sort
            } else {
              setPageState((old: PageStateInterface) => ({
                ...old,
                sort: field,
                order: sort,
                isLoading: true,
              }));
            }
          }}
        />
      </Container>
    </Box>
  );
}

export default App;
