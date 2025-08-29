import bcrypt from 'bcryptjs'; // import thư viện bcryptjs
import db from '../models/index.js'; // import database

const salt = bcrypt.genSaltSync(10); // thuật toán hash password

// Hàm hash password
let hashUserPassword = async (password) => {
    try {
        let hashPassword = bcrypt.hashSync(password, salt);
        return hashPassword;
    } catch (e) {
        throw e;
    }
};

// Hàm tạo user
let createNewUser = async (data) => {
    try {
        let hashPassword = await hashUserPassword(data.password);
        await db.User.create({
            email: data.email,
            password: hashPassword,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            phoneNumber: data.phoneNumber,
            gender: data.gender === '1' ? true : false,
            roleId: data.roleId
        });
        return 'OK create a new user successfully';
    } catch (e) {
        throw e;
    }
};

// Lấy tất cả user
let getAllUser = async () => {
    try {
        let users = await db.User.findAll({ raw: true });
        return users;
    } catch (e) {
        throw e;
    }
};

// Lấy user theo ID
let getUserInfoById = async (userId) => {
    try {
        let user = await db.User.findOne({
            where: { id: userId },
            raw: true
        });
        return user || [];
    } catch (e) {
        throw e;
    }
};

// Cập nhật user
let updateUser = async (data) => {
    try {
        let user = await db.User.findOne({ where: { id: data.id } });
        if (user) {
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            await user.save();
            let allUsers = await db.User.findAll({ raw: true });
            return allUsers;
        }
        return [];
    } catch (e) {
        throw e;
    }
};

// Xóa user theo ID
let deleteUserById = async (userId) => {
    try {
        let user = await db.User.findOne({ where: { id: userId } });
        if (user) {
            await user.destroy();
        }
    } catch (e) {
        throw e;
    }
};

// Export default object để import dễ dàng
export default {
    createNewUser,
    getAllUser,
    getUserInfoById,
    updateUser,
    deleteUserById
};