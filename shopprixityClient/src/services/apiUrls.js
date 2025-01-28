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
export const fetchShopProductsApi = `${baseApiUrl}/shop/products/fetchShopProducts`;
export const fetchShopProductDetailsApi = `${baseApiUrl}/shop/products/fetchShopProductDetails`;

// Cart APIs
export const fetchShopCartApi = `${baseApiUrl}/shop/cart/fetchCartItems`;
export const addToShopCartApi = `${baseApiUrl}/shop/cart/addCartItems`;
export const updateShopCartApi = `${baseApiUrl}/shop/cart/updateCartItems`;
export const deleteShopCartApi = `${baseApiUrl}/shop/cart/deleteCartItems`;

// Address APIs
export const fetchAddressApi = `${baseApiUrl}/shop/address/fetchAddress`;
export const addAddressApi = `${baseApiUrl}/shop/address/addAddress`;
export const updateAddressApi = `${baseApiUrl}/shop/address/updateAddress`;
export const deleteAddressApi = `${baseApiUrl}/shop/address/deleteAddress`;

// Order APIs
export const createOrderApi = `${baseApiUrl}/shop/order/createOrder`;
export const capturePaymentServiceApi = `${baseApiUrl}/shop/order/capturePayment`;
export const fetchAllOrdersByUserServiceApi = `${baseApiUrl}/shop/order/allOrders`;
export const fetchOrderDetailsServiceApi = `${baseApiUrl}/shop/order/orderDetails`;

// Admin Order APIs
export const fetchAllOrdersServiceApi = `${baseApiUrl}/admin/order/allOrders`;
export const fetchAdminOrderDetailsServiceApi = `${baseApiUrl}/admin/order/orderDetails`;
export const updateOrderStatusServiceApi = `${baseApiUrl}/admin/order/updateOrderStatus`;
