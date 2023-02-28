// import { NextFunction } from "express";
// import createError from "http-errors";
// import { isSuccess } from "http-status-codes";


// export const httpErrros = (err: Error, req: Request, res: Response, next: NextFunction) => {
//   if (err instanceof createError.HttpError) {
//     if (isSuccess(err.statusCode)) {
//       res.status(err.statusCode).send({ error: err.message });
//     } else {
//       res.status(500).send({ error: "Internal server error" });
//     }
//   } else {
//     console.error(err);
//     res.status(500).send({ error: "Internal server error" });
//   }
// }



