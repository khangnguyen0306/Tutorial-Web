
// import { productAPI } from "../services/productAPI";
// import ProductReducer from "../slices/product.slice";
import { doctorAPI } from "../services/doctorAPI";
import doctorReducer from "../slices/doctor.slice";
import { authApi } from "../services/authAPI";
import AuthReducer from "../slices/auth.slice";
import { courseAPI } from "../services/coursesAPI";
import CourseReducer from "../slices/course.slice";
import { userAPI } from "../services/userAPI";
import UserReducer from "../slices/user.slice";
import { paymentAPI } from "../services/paymentAPI";
// import { postAPI } from "../services/postAPI";
import modalReducer from "../slices/modal.slice";
import { revenueAPI } from "../services/revenueAPI";
import revenueReducer from "../slices/revenue.slice";
// import { chatAPI } from "../services/chatAPI";
// import chatReducer from "../slices/chat.slice";
// import { appealApi } from "../services/appealAPI";
// import appealReducer from "../slices/appeal.slice";
// import NotiReducer from "../slices/notification.slice";

import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Using localStorage
import sessionStorage from 'redux-persist/lib/storage/session'

const persistConfig = {
  key: 'root',
  storage: sessionStorage, // Bạn có thể chọn storage là sessionStorage
  whitelist: ['user', 'token'],
};
// const persistedReducer = persistReducer(persistConfig, flowerReducer);
// const ProductPerisReducer = persistReducer(persistConfig, ProductReducer);
const DoctorPerisReducer = persistReducer(persistConfig, doctorReducer);
const AuthPerisReducer = persistReducer(persistConfig, AuthReducer);
const CousresPerisReducer = persistReducer(persistConfig, CourseReducer);
const UserPerisReducer = persistReducer(persistConfig, UserReducer);
const RevenuePerisReducer = persistReducer(persistConfig, revenueReducer);
// const PostPerisReducer = persistReducer(persistConfig, postReducer);
// const ExchangePerisReducer = persistReducer(persistConfig, exchangeReducer);
// const ChatPerisReducer = persistReducer(persistConfig, chatReducer);
// const AppealPerisReducer = persistReducer(persistConfig, appealReducer);
// const NotificationReducer = persistReducer(persistConfig, NotiReducer);

export const store = configureStore({
  reducer: {
    // [flowerApi.reducerPath]: flowerApi.reducer,
    // flower: persistedReducer,
    // [productAPI.reducerPath]: productAPI.reducer,
    // product: ProductPerisReducer,
    [doctorAPI.reducerPath]: doctorAPI.reducer,
    user: DoctorPerisReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: AuthPerisReducer,
    [courseAPI.reducerPath]: courseAPI.reducer,
    post: CousresPerisReducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [paymentAPI.reducerPath]: paymentAPI.reducer,
    post1: UserPerisReducer,
    modal: modalReducer,
    [revenueAPI.reducerPath]: revenueAPI.reducer,
    revenue: revenueReducer,
    // chat: ChatPerisReducer,
    // [appealApi.reducerPath]: appealApi.reducer,
    // appeal: AppealPerisReducer,
    // notifications:NotificationReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // flowerApi.middleware,
      // productAPI.middleware,
      // userAPI.middleware,
      authApi.middleware,
      doctorAPI.middleware,
      courseAPI.middleware,
      userAPI.middleware,
      paymentAPI.middleware,
      revenueAPI.middleware
      // exchangeAPI.middleware,
      // appealApi.middleware,
    ),
});

export const Persister = persistStore(store);
