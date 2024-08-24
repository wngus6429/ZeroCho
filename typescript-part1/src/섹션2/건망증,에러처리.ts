interface Axios {
  get(): void;
}

// interface CustomError extends Error {
//   name: string;
//   message: string;
//   stack?: string;
//   response?: {
//     data: any;
//   };
// }

// declare const axios: Axios;

// (async () => {
//   try {
//     await axios.get();
//   } catch (err: unknown) {
//     const customError = err as CustomError;
//     // console.error((err as CustomError).response?.data);
//     // (err as CustomError).response?.data;
//     console.error(customError.response?.data);
//     customError.response?.data;
//   }
// })();

class CustomError extends Error {
  response?: {
    data: any;
  };
}

declare const axios: Axios;

(async () => {
  try {
    await axios.get();
  } catch (err) {
    if (err instanceof CustomError) {
      console.error(err.response?.data);
      err.response?.data;
    }
  }
})();

const a = <T = unknown>(v: T): T => {
  return v;
};
const c = a(3);
