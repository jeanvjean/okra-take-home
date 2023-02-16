import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

export const compare = (password, comparePassword) => {
    const isValid = bcrypt.compareSync(password, comparePassword);
    return isValid;
}

export const signUser = (data) => {
    try {
        const token = jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: "2h" })
        return token;
    } catch (error) {
        console.log('an error occurred', error.message);
    }
}

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.TOKEN_SECRET);
      } catch (error) {
        return error;
      }
}