import db from '../models/index'; //import database
import CRUDService from '../services/CRUDService' //import service
//ham getHomePage
let getHomePage = async (req, res) => {
    //return res.send('Nguyễn Hữu Trung');
    try {
        let data = await db.User.findAll(); //lấy dữ liệu từ models/index
        console.log('......................')
        console.log(data);
        console.log('......................')
        return res.render('homepage.ejs' ,{
            data: JSON.stringify(data) //trả dữ liệu data về view
        });

    } catch (e) {
        console.log(e);
    }
}

//hàm getAbout
let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

//hàm CRUD
let getCRUD = (req,res) => {
    return res.render('crud.ejs');
}

//hàm findAll CRUD
let getFindAllCrud = async (req,res) => {
    let data = await CRUDService.getAllUser();
    // console. log('......................')
    // console.log(data);
    // console.log('......................')
    //return res.send('FindAll crud to server');
    return res.render('users/findAllUser.ejs',{
        datalist: data
    }); //gọi view và truyền dữ liệu ra view
}

//ham post CRUD
let postCRUD = async (req, res) => { //dùng async để xử lý bat đồng bộ
    let message = await CRUDService.createNewUser(req.body); //goi service
    //console. log(req.body); //lay thong tin body cua http request
    console.log(message);
    return res.send('Post crud to server');
}

//hàm lấy du liệu để edit
let getEditCRUD = async (req,res) => {
    let userId = req.query.id;
    if(userId){ //check Id
        let userData = await CRUDService.getUserInfoById(userId);

        //console. log('......................')
        //console.log(userData);
        //console.log('......................')
        return res.render('users/updateUser.ejs' ,{
            data: userData
        });
    }else{
        return res.send('không lấy được id');
    }
    // console.log(req.query.id);
}

let putCRUD = async (req, res) => {
    let data = req.body;
    await CRUDService.updateUser(data); // chỉ update thôi
    let allUsers = await CRUDService.getAllUser(); // lấy lại tất cả user mới nhất
    return res.render('users/findAllUser.ejs', {
        datalist: allUsers
    });
}


let deleteCRUD = async (req, res) => {
    let id = req.query.id; //vì trên view ?id=1
    if(id){
        await CRUDService.deleteUserById(id);
        return res. send('Deleted!!!!!!!!!!');
    }else{
        return res.send('Not find user')
    }
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    getFindAllCrud: getFindAllCrud,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
};