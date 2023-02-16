import { Router } from 'express';
import * as Controller from './controller';
import * as Middleware from './middleware';

const router = Router();

router.post(
    '/login',
    Middleware.getUser,
    Middleware.signUserToken,
    Controller.loginUser
);

router.post(
    '/fund-wallet',
    Middleware.getAuthToken,
    Middleware.getUser,
    Middleware.checkLoginStatus,
    Controller.fundWallet
);

router.get(
    '/ballance',
    Middleware.getAuthToken,
    Middleware.getUser,
    Middleware.checkLoginStatus,
    Controller.getWallet,
);

router.get(
    '/logout',
    Middleware.getAuthToken,
    Middleware.getUser,
    Middleware.checkLoginStatus,
    Controller.logoutUser,
)

export default router;