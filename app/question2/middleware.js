import { UserData } from "./user_data"
import * as Util from './util';

export const getUser = async(req, res, next) => {
    try {
        const { body: { username }, data } = req;
        const payload = username || data.username
        const user = await UserData.find(user => user.username === payload);
        if(!user) {
            return res.status(404).json({
                message: 'user not found'
            });
        }
        req.user = user;
        return next();
    } catch (error) {
        console.log('an error occurred', error.message);
    }
}

export const signUserToken = async(req, res, next) => {
    try {
        const { user } = req;
        const token = Util.signUser({ username: user.username, id: user.id, email: user.email });
        req.token = token;
        return next();
    } catch (error) {
        console.log('an error occurred', error.message);
    }
}

export const getAuthToken = async(req, res, next) => {
    try {
        const { headers: { authorization } } = req;
        const decodeAuth = authorization.split(' ');
        const token = decodeAuth[0] === 'Bearer' ? decodeAuth[1] : decodeAuth[0];
        const decode = Util.verifyToken(token);
        if(decode.status === false) {
            return res.status(401).json({
                message: decode.message
            });
        }
        req.data = decode;
        return next();
    } catch (error) {
        console.log('an error occurred', error.message);
    }
}

export const checkLoginStatus = async(req, res, next) => {
    try {
        const { user } = req;
        if(!user.loggedIn) {
            return res.status(401).json({
                message: 'this user is not logged in'
            });
        }
        return next();
    } catch (error) {
        console.log('an error occurred', error.message);
    }
}
