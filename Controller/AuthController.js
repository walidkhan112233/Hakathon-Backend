const AuthController = {
    Protected: (req,res,next)=>{
        let token = req.headers?.authorization?.split("")[1];
        console.log(token);
        if(!token){
            res.status(400).json({
                isSuccefull: false,
                error: error.message,
              });
        }
        jwt
        .verify(token, "abcdefgh123456789", async (err,decoded) => {
            if (err) {
                res.status(400).json({
                    isSuccefull: false,
                    error: "you have no rights",
                  });
            }else{next();}

          });
            }
        };

module.exports = AuthController;