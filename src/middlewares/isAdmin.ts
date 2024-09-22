import { Request, Response, NextFunction } from 'express';
import { sendErrorRes } from '../../src/utils/helper';
import { User } from 'src/models/user';

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Ensure the user is authenticated and has admin privileges
        if (!req.user || !req.user.id) {
            return sendErrorRes(res, 'Unauthorized request', 403);
        }
        // Fetch the user from the database
        const user = await User.findById(req.user.id);

        if (!user || !user.isAdmin) {
            return sendErrorRes(res, 'Forbidden: Admins only', 403);
        }

        // If user is an admin, proceed
        next();
    } catch (error) {
        next(error);
    }
};
