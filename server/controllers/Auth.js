import User from '../models/User.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createError } from '../utils/error.js'

export const register = async (req, res, next) => {
    try {

        let { name, phone, email, password, role } = req.body

        if (!name || !phone || !password || !email) return next(createError(400, 'Make sure to provide all the fields'))
        if (email && !validator.isEmail(email)) return next(createError(400, 'Invalid Email Address'))

        const findedUser = await User.findOne({ email })
        if (Boolean(findedUser)) return next(createError(400, 'Email already exist'))

        const hashedPassword = await bcrypt.hash(password, 12)

        if (email == process.env.ADMIN_EMAIL)
            role = 'admin'
        else
            role = role || 'client'

        const newUser = await User.create({ name, email, phone, password: hashedPassword, role })

        res.status(200).json({ result: newUser, message: 'User created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password: input_password } = req.body;

        if (!email || !input_password) return next(createError(400, 'Make sure to provide all the fields'));

        const findedUser = await User.findOne({ email });
        if (!findedUser) return next(createError(400, 'Wrong Credentials - email'));

        const isPasswordCorrect = await bcrypt.compare(input_password, findedUser.password);
        if (!isPasswordCorrect) return next(createError(401, 'Wrong Credentials - password'));

        const token = jwt.sign(
            { _id: findedUser._id, role: findedUser.role },
            process.env.JWT_SECRET
        );

        const { password, ...userData } = findedUser._doc
            res.status(201).json({
            result: { ...userData, token },
            message: 'User logged in successfully',
            success: true
        })

    } catch (err) {
        next(createError(500, err.message));
    }
};