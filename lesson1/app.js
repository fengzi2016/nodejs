let express=require('../../node_modules/express');
let app=express();
app.get('/',function (req,res) {
    res.send('Hello World');
});
app.listen(3000,function () {
    console.log(`app is listening at port 3000`);
});
