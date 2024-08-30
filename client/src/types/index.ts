export enum ESelectedPage {
  home = "home",
  aboutus = "about",
  ganjas = "ganjas",
  categories = "categories",
  contact = "contact",
  cart = "cart",
}

export enum ERoutes {
  home = "/",
  verify = "/verify",
  ganjas = "/ganjas",
  authpage = "/authpage",
  category = "/category",
  faq = "/faq",
  makeorder = "/makeorder",
  shipping = "/shipping",
  payment = "/payment",
  order = "/order",
  useraccount = "/useraccount",
  userorders = "/userorders",
  resetpassword = "/reset-password",
}

export type IUser = {
  userName: string;
  email: string;
  role: string;
  photo: string;
  _id: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface IGenericResponse {
  status: string;
  message: string;
}

export interface ILoginResponse {
  status: string;
  message: string;
  accessToken: string;
  email: string;
  password: string;
}

export interface IUserResponse {
  status: string;
  message: string;
  data: {
    user: IUser;
  };
}

export type HomeCardType = {
  id: string;
  image: string;
  title: string;
  description: string;
  className: string;
};

export type GanjaPageImageType = {
  id: string;
  src: string;
  alt: string;
  className: string;
};

export interface IGanjasResponse {
  result: number;
  data: {
    ganjas?: GanjaType[];
    ganja?: GanjaType;
  };
}

export type GanjaType = {
  _id?: string;
  name: string;
  category: string;
  dataTested: Date;
  thca: string;
  thc: string;
  cbda: string;
  cbd: string;
  summary: string;
  price: number;
  coverImage: string;
  rating?: number;
};

export interface ICategoryResponse {
  result: number;
  data: {
    categories: CategoryType[];
  };
}

export type CategoryType = {
  _id?: string;
  name: string;
  origin: string;
  description: string;
  cbdToThcRatio: string;
  effectsOfUse: string;
  periodOfUse: string;
  coverImage: string;
  ganjas: GanjaType[];
};

export type CartItemType = {
  _id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  quantity: number;
};

export type ShippingAddressType = {
  fullName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
};

export type CartType = {
  cartItems: CartItemType[];
  shippingAddress: ShippingAddressType;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};

export type ReviewType = {
  _id: string;
  content: string;
  rating: number;
  user: IUser;
  ganja: GanjaType;
};

export interface IReviewResponse {
  result: number;
  data: {
    reviews: ReviewType[];
  };
}

export interface IOrderResponse {
  result: number;
  data: {
    orders: OrderType[];
  };
}

export type OrderType = {
  _id: string;
  orderItems: CartItemType[];
  shippingAddress: ShippingAddressType;
  paymentMethod: string;
  user: IUser;
  createdAt: string;
  paidAt: string;
  isPaid: boolean;
  isDelivered: boolean;
  deliveredAt: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};
