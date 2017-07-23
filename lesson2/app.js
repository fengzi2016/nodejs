let express = require('express');
let utility = require('utility');
let app = express();
app.get('/',function (req,res) {
    let q = req.query.q;
    let mad5Value  = utility.md5(q);
    res.send(mad5Value);
});
app.listen(3000,function (req,res) {
    console.log(`app is running at port 3000`);
});
