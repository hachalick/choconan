export enum ERoute {
  HOST = "http://127.0.0.1:8080",
  // HOST = "https://api.choconan.ir",
  // app
  GET_VIDEO = "/get-video",
  GET_LAST_VIDEO = "/get-last-video",
  // menu
  GET_FULL_MENU = "/menu/get-menu",
  SEARCH_ON_MENU = "/menu/search",
  ADD_CATEGORY_MENU = "/menu/add-category-menu",
  UPDATE_CATEGORY_MENU = "/menu/update-category-menu",
  DELETE_CATEGORY_MENU = "/menu/delete-category-menu",
  ADD_PRODUCT_MENU = "/menu/add-product-menu",
  UPDATE_PRODUCT_MENU = "/menu/update-product-menu",
  DELETE_PRODUCT_MENU = "/menu/delete-product-menu",
  // order
  GET_TABLES = "/order/get-tables",
  GET_ORDER_TABLES = "/order/get-order-tables",
  ORDER_TABLE = "/order/order-table",
  CREATE_TABLE = "/order/create-table",
  DELETE_TABLE = "/order/delete-table",
  GET_STATUS_TABLE = "/order/get-status-table",
  ACCEPT_STATUS_TABLE = "/order/accept-status-table",
  DELETE_STATUS_TABLE = "/order/delete-status-table",
  EDITABLE_STATUS_TABLE = "/order/editable-status-table",
  // blog
  GET_LIST_BLOG = "/blog/get-list-blog",
  GET_BLOG = "/blog/get-blog",
  CREATE_BLOG = "/blog/create-blog",
  UPDATE_BLOG = "/blog/update-blog",
  DELETE_BLOG = "/blog/delete-blog",
  SET_PUBLISH_BLOG = "/blog/set-publish-blog"
}
