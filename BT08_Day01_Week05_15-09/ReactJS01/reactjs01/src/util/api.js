import axios from './axios.customize';

// Đăng ký người dùng
const createUserApi = (name, email, password) => {
  return axios.post("/v1/api/register", { name, email, password });
};

// Đăng nhập
const loginApi = (email, password) => {
  return axios.post("/v1/api/login", { email, password });
};

// Lấy thông tin user
const getUserApi = () => {
  return axios.get("/v1/api/user");
};

// Lấy danh mục sản phẩm
const getCategoriesApi = async () => {
    const res = await axios.get('/v1/api/categories');
    return res;
};

// Tìm kiếm sản phẩm với filter và phân trang
const searchProductsApi = ({
  category,
  search,
  priceMin,
  priceMax,
  sortViews,
  page = 1,
  limit = 6,
}) => {
  const params = { category, search, priceMin, priceMax, sortViews, page, limit };
  return axios.get("/v1/api/products", { params });
};

const recordProductViewApi = async (id) => {
  return axios.patch(`/v1/api/products/${id}`);
};

export {
  createUserApi,
  loginApi,
  getUserApi,
  getCategoriesApi,
  searchProductsApi,
};