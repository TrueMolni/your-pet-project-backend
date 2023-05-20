const express =require("express");
const  tryCatchWrapper  =require("../../utils/tryCatchWrapper.js");
const ctrls=require("../../controllers/auth-controllers.js");
const authenticate  =require("../../middlewares/authenticate.js");
const router = express.Router();

router.post("/register",tryCatchWrapper(ctrls.ctrlRegisterUser));
router.post("/login", tryCatchWrapper(ctrls.ctrlLoginUser));
router.post("/logout", authenticate, tryCatchWrapper(ctrls.ctrlLogOut));
router.get('/current', authenticate, tryCatchWrapper(ctrls.ctrlVerifyUser));
router.get("/google",tryCatchWrapper(ctrls.googleAuth));
router.get("/google-redirect",tryCatchWrapper(ctrls.googleRedirect));
router.patch("/info", authenticate, tryCatchWrapper(ctrls.ctrlUserInfo));

module.exports = router;
