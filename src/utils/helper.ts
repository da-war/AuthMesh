import { Response } from "express";

export const sendErrorRes = (
  res: Response,
  message: string,
  statusCode: number
) => {
  res.status(statusCode).json({ message });
};

export const sendResponse = (
  res: Response,
  statusCode: number,
  message: string
) => {
  res.status(statusCode).send(message);
};