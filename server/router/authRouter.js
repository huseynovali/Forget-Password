const express = require("express");
const { loginController } = require("../controller/loginController");
const { registerController } = require("../controller/registerController");


const authRouter = express.Router();

authRouter.get("/",loginController.getUsers)
authRouter.post("/",loginController.getUser)
authRouter.get("/:id",loginController.getUserById)
authRouter.put("/:id",loginController.changeChatId)

authRouter.post("/api/forgot-password",loginController.forgotPassword)
authRouter.post("/api/reset-password",loginController.resetPassword)


authRouter.post("/register/",registerController.addUser)
authRouter.delete("/:id",registerController.deleteUser)





module.exports={
  authRouter

}