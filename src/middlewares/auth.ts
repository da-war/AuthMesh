import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { User } from '../models/user';
import { sendErrorRes, sendResponse } from '../../src/utils/helper';


declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                name: string;
                email: string;
            };
        }
    }
}

const JWT_ACCESS_SECRET = process.env.JWT_SECRET || 'somethingisfishygeneralsahab';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authToken = req.headers.authorization;
        if (!authToken) return sendResponse(res, 401, 'Unauthorized Request');

        const token= authToken.split('Bearer ')[1];
        console.log(token);
        const payload= jwt.verify(token, JWT_ACCESS_SECRET) as { id: string };


        const user = await User.findById(payload.id);
    if (!user) return sendErrorRes(res, "unauthorized request!", 403);


            req.user = {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
            };

            next();

    } catch (error) {
        if (error instanceof TokenExpiredError) {
          return sendErrorRes(res, "Session expired!", 401);
        }
    
        if (error instanceof JsonWebTokenError) {
          return sendErrorRes(res, "unauthorized assess!", 401);
        }
    
        next(error);
      }
};
