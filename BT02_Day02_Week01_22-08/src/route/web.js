import express from "express";
import homeController from '../controllers/homeController.js';

const router = express.Router(); // khởi tạo Route

const initWebRoutes = (app) => {
    // Test route
    router.get('/', (req, res) => {
        return res.send('Uý Nữ Kiều Linh _ 21110896');
    });

    // Gọi hàm trong controller
    router.get('/home', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.getFindAllCrud); // sửa tên hàm
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    app.use("/", router);
};

export default initWebRoutes; // ✅ ES Module