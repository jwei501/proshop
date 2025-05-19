// cuz we defined the proxy in the package.json file,
// if we used the absolute path here, accessing the API would not work
// due to the Cross-Origin Resource Sharing (CORS) policy violation
//export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';
export const BASE_URL = '';
export const PRODUCTS_URL = '/api/products';
export const USERS_URL = '/api/users';
export const ORDERS_URL = '/api/orders';
export const PAYPAL_URL = '/api/config/paypal';