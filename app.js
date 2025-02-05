const express = require('express');
let app = express(); 


app.use(function(req,res){
    console.log(req,"req");
    console.log(res,"res");
    res.send("request from middleware arrived")
})


app.listen(8080, function(){
    console.log("server connected at port 8080")
});

