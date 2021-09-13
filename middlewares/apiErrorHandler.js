import {ApiError} from './apiError.js';

export function apiErrorHandler(err, req, res, next) {
  console.log(err.code, err.message)
  if (err instanceof ApiError) {
    res.status(err.code).json(err.message);
    return;
  }

  res.status(500).json('something went wrong');
};