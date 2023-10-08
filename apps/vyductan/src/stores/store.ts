import { configureStore, type Store } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import createSagaMiddleware, { type Task } from "redux-saga";

import rootSaga from "./saga";
import { settingsSlice } from "./settings";

// const sagaMiddleware = createSagaMiddleware();
//
// export const store = configureStore({
//   reducer: {
//     settings: settingsReducer,
//     groups: groupsReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(sagaMiddleware),
// });
//
// sagaMiddleware.run(taskSaga);

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

export interface SagaStore extends Store {
  sagaTask: Task;
}

// *********** MAIN
const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: {
      [settingsSlice.name]: settingsSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware),
  });

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];

// export an assembled wrapper
export const wrapper = createWrapper<AppStore>(makeStore);
