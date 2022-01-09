// Next-React Imports
import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
// Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { getAllTentsAdmin } from "../../../state/actions/tentsAction";
// UI imports
import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
// Component Imports
import { ProjectListFilters } from "./product-list-filters";
import { ProductListTable } from "./product-list-table";
// Utils Imports
import { useMounted } from "../../../hooks/use-mounted";
import { Download as DownloadIcon } from "../../../icons/download";
import { Upload as UploadIcon } from "../../../icons/upload";
import { Plus as PlusIcon } from "../../../icons/plus";
import Loader from "../../layout/Loader";

const ProductList = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filters, setFilters] = useState({
    name: undefined,
    category: [],
    status: [],
    inStock: undefined,
  });

  const { tents = [], error, loading } = useSelector((state) => state.allTents);

  useEffect(() => {
    dispatch(getAllTentsAdmin());
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const applyFilters = (tents, filters) =>
    tents.filter((product) => {
      if (filters.name) {
        const nameMatched = product.name
          .toLowerCase()
          .includes(filters.name.toLowerCase());

        if (!nameMatched) {
          return false;
        }
      }

      // It is possible to select multiple category options
      if (filters.category?.length > 0) {
        const categoryMatched = filters.category.includes(product.category);

        if (!categoryMatched) {
          return false;
        }
      }

      // It is possible to select multiple status options
      if (filters.status?.length > 0) {
        const statusMatched = filters.status.includes(product.status);

        if (!statusMatched) {
          return false;
        }
      }

      // Present only if filter required
      if (typeof filters.inStock !== "undefined") {
        const stockMatched = product.inStock === filters.inStock;

        if (!stockMatched) {
          return false;
        }
      }

      return true;
    });

  const applyPagination = (tents, page, rowsPerPage) =>
    tents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleFiltersChange = (filters) => {
    setFilters(filters);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  const filteredProducts = applyFilters(tents, filters);
  const paginatedProducts = applyPagination(
    filteredProducts,
    page,
    rowsPerPage
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Head>
            <title>Products</title>
          </Head>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8,
            }}
          >
            <Container maxWidth="xl">
              <Box sx={{ mb: 4 }}>
                <Grid container justifyContent="space-between" spacing={3}>
                  <Grid item>
                    <Typography variant="h4">Products</Typography>
                  </Grid>
                  <Grid item>
                    <NextLink href="/admin/tents/new" passHref>
                      <Button
                        component="a"
                        startIcon={<PlusIcon fontSize="small" />}
                        variant="contained"
                      >
                        Add
                      </Button>
                    </NextLink>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    m: -1,
                    mt: 3,
                  }}
                >
                  <Button
                    startIcon={<UploadIcon fontSize="small" />}
                    sx={{ m: 1 }}
                  >
                    Import
                  </Button>
                  <Button
                    startIcon={<DownloadIcon fontSize="small" />}
                    sx={{ m: 1 }}
                  >
                    Export
                  </Button>
                </Box>
              </Box>
              <Card>
                <ProjectListFilters onChange={handleFiltersChange} />
                <ProductListTable
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  page={page}
                  products={paginatedProducts}
                  productsCount={filteredProducts.length}
                  rowsPerPage={rowsPerPage}
                />
              </Card>
            </Container>
          </Box>
        </>
      )}
    </>
  );
};

export default ProductList;
