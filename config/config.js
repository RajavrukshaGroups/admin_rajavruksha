const mongoose = require('mongoose');

const dbConnect=()=>{
    const url = cluster_url = 'mongodb+srv://enquiry:mHpnVFW1fNgdla8h@cluster0.osdmv.mongodb.net/';
  mongoose.connect(cluster_url)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

}
module.exports={ dbConnect}