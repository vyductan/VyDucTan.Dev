import { all, call, spawn } from "redux-saga/effects";

export default function* rootSaga() {
  //   const sagas = [];
  //
  //   yield all(
  //     sagas.map((saga) =>
  //       spawn(function* () {
  //         while (true) {
  //           try {
  //             yield call(saga);
  //             break;
  //           } catch (e) {
  //             console.error("Saga error, the saga will be restarted", e);
  //           }
  //         }
  //       })
  //     )
  //   );
}

// another way: https://github.com/redux-saga/redux-saga/issues/760#issuecomment-273737022
// // Config here
// const sagas = [groupsSaga];
// const makeRestartable = (
//   saga: () => Generator<ForkEffect<never>, void, unknown>
// ) => {
//   return function* () {
//     yield spawn(function* () {
//       while (true) {
//         try {
//           yield call(saga);
//           console.error(
//             "unexpected root saga termination. The root sagas are supposed to be sagas that live during the whole app lifetime!",
//             saga
//           );
//         } catch (e) {
//           console.error("Saga error, the saga will be restarted", e);
//         }
//         yield delay(1000); // Avoid infinite failures blocking app TODO use backoff retry policy...
//       }
//     });
//   };
// };
//
// const restartableSagas = sagas.map(makeRestartable);
//
// export default function* rootSaga() {
//   yield all(restartableSagas.map((saga) => call(saga)));
// }
