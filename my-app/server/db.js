const mongoose = require('mongoose');

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        userUnifiedTopology: true,
    };
    try{
        mongoose.connect(process.env.DB)
    } catch {
        
    }
}