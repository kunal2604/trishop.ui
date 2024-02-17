export class Endpoints {
    public static AUTHENTICATE = "/authenticate";
    public static REGISTER_NEW_USER = "/registerNewUser";
    public static FOR_USER = "/forUser";
    public static FOR_ADMIN = "/forAdmin";
    public static ADD_PRODUCT = "/product/add";
    public static GET_ALL_PRODUCTS = "/getAllProducts";
    public static GET_PRODUCT_DETAILS_BY_ID = "/getProductDetailsById/{productId}";
    public static DELETE_PRODUCT_DETAILS = "/deleteProductDetails/{productId}";
    public static GET_PRODUCT_DETAILS = "/getProductDetails/{isSingleProductCheckout}/{productId}";
    public static PLACE_ORDER = "/placeOrder";
}