require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const white_lists = ["/", "/register", "/login"];

    // Kiểm tra whitelist, hỗ trợ URL con
    if (white_lists.some(item => req.originalUrl.startsWith(`/v1/api${item}`))) {
        next();
        return;
    }

    // Kiểm tra token
    if (req?.headers?.authorization?.split(' ')?.[1]) {
        const token = req.headers.authorization.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = {
                email: decoded.email,
                name: decoded.name,
                createdBy: "hoidanit"
            };
            console.log(">>> check token: ", decoded);
            next();
        } catch (error) {
            return res.status(401).json({ message: "Token bị hết hạn hoặc không hợp lệ" });
        }
    } else {
        return res.status(401).json({ message: "Bạn chưa truyền Access Token ở header hoặc token bị hết hạn" });
    }
};

module.exports = auth;