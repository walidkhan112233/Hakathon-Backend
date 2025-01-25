const express = require('express');
const UserModel = require("../models/usermodel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const Route = express.Router();

Route.get("/", async (req, res) => {
    try {
      const result = await UserModel.find({});
      res.status(200).json({
        isSuccefull: true,
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        isSuccefull: false,
        error: error.message,
      });
    }
  });

Route.get("/:id", async (req,res) => {
    try{
        const id = req.params.id;
        const result = await UserModel.findById(id);
        res.status(200).json({
            isSuccessfull: true,
            data:result, 
        });
    }catch (error) {
        console.log(error);
        res.status(400).json({
            isSuccessfull: false,
            error:error.message, 
        })
    }
});


Route.post("/Login", async (req, res) => {
    try {
        const body = req.body;

        if (!body.email) {
          res.status(400).json({
            isSuccefull: false,
            error: "Email is missing",
          });
        };
        if (!body.password) {
          res.status(400).json({
            isSuccefull: false,
            error: "Password is missing",
          });
        };
        const existingUser = await UserModel.findOne({ email: body.email});

        if (existingUser) {
            // login Work
            const passwordMatched = await bcrypt.compare(
              body.password,
              existingUser.password
            );

            if (passwordMatched) {
                const token = jwt.sign({ ...existingUser }, "abcdefgh123456789");
                
                res.status(200).json({
                  isSuccefull: true,
                  alert: "Logged In Successfully",
                  data: {
                    user: existingUser,
                    token: token,
                  },
                });
              }else{
                res.status(400).json({
                    isSuccefull: false,
                    error: "Wrong Password",
                  });
              } 
            } else {
                res.status(401).json({
                  isSuccefull: false,
                  error: "No User found with this email",
                });
              }

}catch(error){
    console.log(error);
    res.status(400).json({
      isSuccefull: false,
      error: error.message,
    });
}
});

Route.post("/signup", async (req, res) =>{
 try{
    const body = req.body;
    if (!body.email) {
      res.status(400).json({
        isSuccefull: false,
        error: "Email is Missing",
      });
    }

    if (!body.password) {
      res.status(400).json({
        isSuccefull: false,
        error: "Password is Missing",
      });
    }

    const existingUser = await UserModel.findOne({ email: body.email });

    if (existingUser) {
      res.status(400).json({
        isSuccefull: false,
        error: "With this email user already exist",
      });
    } else {
      const hashedPassword = await bcrypt.hash(body.password, 10);

      const obj = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: hashedPassword,
      };

      const modelObj = new UserModel(obj);
      modelObj
        .save()
        .then((result) => {
          res.status(201).json({
            isSuccefull: true,
            error: "User Signup Successfully",
            data: result,
          });
        })
        .catch((err) => {
          throw err;
        });
    }
 }catch(error) {
    console.log(error);
    res.status(400).json({
      isSuccefull: false,
      error: error.message,
    });
  }

})

Route.delete("/:id", async (req,res) => {
    try{
        const id = req.params.id;
        const deletedUser = await UserModel.findByIdAndDelete(id);
        res.status(200).json({
            isSuccessful: true,
            message: "User Deleted Successfully",
            data: deletedUser
        });
  
    }catch(error){
        res.status(500).json({
            isSuccessful: false,
            error: error.message,
        });
      }
  });

module.exports = Route; 

