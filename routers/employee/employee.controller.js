const Employee = require('./employee.model');
const Admin = require('../admin/admin.model');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const Review = require('../admin/review.model');

module.exports = (app) => {

    app.post('/api/employee/loginuser', (req, res) => {

        function findUser() {
            return new Promise((resolve, reject) => {
                Admin.findUserByUsername(req.body.username, (err, admin) => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve(admin)
                    }
                })
            })
        }

        let promise = findUser();
        promise.then((success) => {
            if (success == null) {
                res.status(200).json({ "msg": "failed", "result": "Username not existed" });
            }
            else {
                Admin.comparePassword(req.body.password, success.password, (ismatch) => {
                    if (ismatch) {
                        var token = jwt.sign({ id: success._id }, app.get('superSecret'), {
                            expiresIn: 7200 // expires in 2 hours
                        });
                        let user ={
                            "firstname":success.firstname,
                            "lastname":success.lastname,
                            "username":success.username,
                            "userId":success._id
                        }
                        res.status(200).json({ "msg": "success", "result": "Login Success",data:{"token":token,"user":user} });
                    }
                    else {
                        res.status(200).json({ "msg": "failed", result: "Password wrong" });
                    }
                })

            }
        }, (err) => {
            res.status(200).json({ "msg": "failed", "result": "Login Failed" });
        })
    })

    /**get reivew by employee */
    app.post('/api/employee/employeeReview', (req, res) => {
        Review.getEmployeeReview(req.body.empId,(err,result) => {
            if(err){
                res.status(200).json({"msg":"failed","result":err});
            }
            else{
                res.status(200).json({"msg":"success","result":result});
            }
        })
    });

    
}