// Next-React Imports
import React, { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
// UI Imports
import {
  Box,
  Button,
  CardContent,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
// Redux Imports
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  updateTentAdmin,
  deleteTentAdmin,
} from "../../../state/actions/tentsAction";
// Utils Imports
import numeral from "numeral";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { ChevronDown as ChevronDownIcon } from "../../../icons/chevron-down";
import { ChevronRight as ChevronRightIcon } from "../../../icons/chevron-right";
import { DotsHorizontal as DotsHorizontalIcon } from "../../../icons/dots-horizontal";
import { Image as ImageIcon } from "../../../icons/image";
import { Scrollbar } from "../../../utils/scrollbar";
import { SeverityPill } from "../../../utils/severity-pill";
import Loader from "../../../components/layout/Loader";

const categoryOptions = [
  {
    label: "Small",
    value: "small",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Large",
    value: "large",
  },
];

export const ProductListTable = (props) => {
  const {
    onPageChange,
    onRowsPerPageChange,
    page,
    products,
    productsCount,
    rowsPerPage,
    ...other
  } = props;
  const [openProduct, setOpenProduct] = useState(null);

  // Ref for uncontrolled components
  const Name = React.createRef();
  const SKU = React.createRef();
  const Category = React.createRef();
  const Price = React.createRef();

  const disaptch = useDispatch();
  const router = useRouter();

  const { error, loading } = useSelector((state) => state.newTent);

  useEffect(() => {
    if (error) {
      toast.error(error);
      disaptch(clearErrors());
    }
  });

  const handleOpenProduct = (productId) => {
    setOpenProduct((prevValue) => (prevValue === productId ? null : productId));
  };

  const handleCancelEdit = () => {
    setOpenProduct(null);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div {...other}>
          <Scrollbar>
            <Table sx={{ minWidth: 1200 }}>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell width="25%">Name</TableCell>
                  <TableCell width="25%">Stock</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>sku</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => {
                  const open = product._id === openProduct;

                  return (
                    <Fragment key={product._id}>
                      <TableRow hover key={product._id}>
                        <TableCell
                          padding="checkbox"
                          sx={{
                            ...(open && {
                              position: "relative",
                              "&:after": {
                                position: "absolute",
                                content: '" "',
                                top: 0,
                                left: 0,
                                backgroundColor: "primary.main",
                                width: 3,
                                height: "calc(100% + 1px)",
                              },
                            }),
                          }}
                          width="25%"
                        >
                          <IconButton
                            onClick={() => handleOpenProduct(product._id)}
                          >
                            {open ? (
                              <ChevronDownIcon fontSize="small" />
                            ) : (
                              <ChevronRightIcon fontSize="small" />
                            )}
                          </IconButton>
                        </TableCell>
                        <TableCell width="25%">
                          <Box
                            sx={{
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            {product.images.url ? (
                              <Box
                                sx={{
                                  alignItems: "center",
                                  backgroundColor: "background.default",
                                  backgroundImage: `url(${product.images[0].url})`,
                                  backgroundPosition: "center",
                                  backgroundSize: "cover",
                                  borderRadius: 1,
                                  display: "flex",
                                  height: 80,
                                  justifyContent: "center",
                                  overflow: "hidden",
                                  width: 80,
                                }}
                              />
                            ) : (
                              <Box
                                sx={{
                                  alignItems: "center",
                                  backgroundColor: "background.default",
                                  borderRadius: 1,
                                  display: "flex",
                                  height: 80,
                                  justifyContent: "center",
                                  width: 80,
                                }}
                              >
                                <ImageIcon fontSize="small" />
                              </Box>
                            )}
                            <Box
                              sx={{
                                cursor: "pointer",
                                ml: 2,
                              }}
                            >
                              <Typography variant="subtitle2">
                                {product.name}
                              </Typography>
                              <Typography color="textSecondary" variant="body2">
                                in {product.category}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell width="25%">
                          <LinearProgress
                            value={product.quantity}
                            variant="determinate"
                            color={product.quantity >= 10 ? "success" : "error"}
                            sx={{
                              height: 8,
                              width: 36,
                            }}
                          />
                          <Typography color="textSecondary" variant="body2">
                            {product.quantity} in stock
                            {product.variants > 1 &&
                              ` in ${product.variants} variants`}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {numeral(product.price).format(
                            `${product.currency}0,0.00`
                          )}
                        </TableCell>
                        <TableCell>{product.sku}</TableCell>
                        <TableCell>
                          <SeverityPill
                            color={
                              product.status === "published"
                                ? "success"
                                : "info"
                            }
                          >
                            {product.status}
                          </SeverityPill>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton>
                            <DotsHorizontalIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      {open && (
                        <TableRow>
                          <TableCell
                            colSpan={7}
                            sx={{
                              p: 0,
                              position: "relative",
                              "&:after": {
                                position: "absolute",
                                content: '" "',
                                top: 0,
                                left: 0,
                                backgroundColor: "primary.main",
                                width: 3,
                                height: "calc(100% + 1px)",
                              },
                            }}
                          >
                            <CardContent>
                              <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                  <Typography variant="h6">
                                    Basic details
                                  </Typography>
                                  <Divider sx={{ my: 2 }} />
                                  <Grid container spacing={3}>
                                    <Grid item md={6} xs={12}>
                                      <TextField
                                        fullWidth
                                        label="Product name"
                                        name="name"
                                        defaultValue={product.name}
                                        inputRef={Name}
                                      />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                      <TextField
                                        fullWidth
                                        label="SKU"
                                        name="sku"
                                        defaultValue={product.sku}
                                        inputRef={SKU}
                                      />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                      <TextField
                                        fullWidth
                                        label="Category"
                                        select
                                        defaultValue={product.category}
                                        inputRef={Category}
                                      >
                                        {categoryOptions.map((option) => (
                                          <MenuItem
                                            key={option.value}
                                            value={option.value}
                                          >
                                            {option.label}
                                          </MenuItem>
                                        ))}
                                      </TextField>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                      <TextField
                                        disabled
                                        fullWidth
                                        label="Product ID"
                                        name="Product ID"
                                        defaultValue={product._id}
                                      />
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                  <Typography variant="h6">
                                    Pricing and stocks
                                  </Typography>
                                  <Divider sx={{ my: 2 }} />
                                  <Grid container spacing={3}>
                                    <Grid item md={6} xs={12}>
                                      <TextField
                                        fullWidth
                                        label="Old price"
                                        name="old-price"
                                        defaultValue={product.price}
                                        InputProps={{
                                          startAdornment: (
                                            <InputAdornment position="start">
                                              {product.currency}
                                            </InputAdornment>
                                          ),
                                        }}
                                        type="number"
                                      />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                      <TextField
                                        fullWidth
                                        label="New price"
                                        name="new-price"
                                        defaultValue={product.price}
                                        inputRef={Price}
                                        InputProps={{
                                          startAdornment: (
                                            <InputAdornment position="start">
                                              $
                                            </InputAdornment>
                                          ),
                                        }}
                                        type="number"
                                      />
                                    </Grid>
                                    <Grid
                                      item
                                      md={6}
                                      xs={12}
                                      sx={{
                                        alignItems: "center",
                                        display: "flex",
                                      }}
                                    >
                                      <Switch />
                                      <Typography variant="subtitle2">
                                        Keep selling when stock is empty
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </CardContent>
                            <Divider />
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                px: 2,
                                py: 1,
                              }}
                            >
                              <Button
                                onClick={() => {
                                  setOpenProduct(null);
                                  toast.success("Product updated");

                                  const tentData = {
                                    name: Name.current.value,
                                    sku: SKU.current.value,
                                    category: Category.current.value,
                                    price: Price.current.value,
                                  };

                                  disaptch(
                                    updateTentAdmin(product._id, tentData)
                                  );
                                  router.reload();
                                }}
                                sx={{ m: 1 }}
                                type="submit"
                                variant="contained"
                              >
                                Update
                              </Button>
                              <Button
                                onClick={handleCancelEdit}
                                sx={{ m: 1 }}
                                variant="outlined"
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={() => {
                                  disaptch(deleteTentAdmin(product._id));
                                  router.reload();
                                }}
                                color="error"
                                sx={{
                                  m: 1,
                                  ml: "auto",
                                }}
                              >
                                Delete product
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      )}
                    </Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </Scrollbar>
          <TablePagination
            component="div"
            count={productsCount}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </div>
      )}
    </>
  );
};

ProductListTable.propTypes = {
  products: PropTypes.array.isRequired,
  productsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
