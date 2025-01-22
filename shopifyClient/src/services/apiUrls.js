export const backendPORT = 5000;
export const baseApiUrl = `http://localhost:${backendPORT}/api`;

// Auth APIs
export const registerUserApi = `${baseApiUrl}/auth/register`;
export const loginUserApi = `${baseApiUrl}/auth/login`;
export const logoutUserApi = `${baseApiUrl}/auth/logout`;
export const checkAuthApi = `${baseApiUrl}/auth/checkAuth`;

// Admin APIs
export const adminProductImageUploadApi = `${baseApiUrl}/admin/products/uploadImage`;
export const fetchAllProductsApi = `${baseApiUrl}/admin/products/fetchAllProducts`;
export const addProductApi = `${baseApiUrl}/admin/products/addProduct`;
export const editProductApi = `${baseApiUrl}/admin/products/editProduct`;
export const deleteProductApi = `${baseApiUrl}/admin/products/deleteProduct`;

// Shop APIs
export const fetchAllShopProductsApi = `${baseApiUrl}/shop/products/fetchAllShopProducts`;
export const fetchShopProductDetailsApi = `${baseApiUrl}/shop/products/fetchShopProductDetails`;
