const mongoose = require('mongoose');

const connectToDb = () => {
    mongoose.connect(
        "mongodb+srv://alexcustodiorg:2Pd2vtGneeuEW51L@fluxodecaixa.flfxokv.mongodb.net/?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(() => {
        console.log('MongoDB connected')
    }).catch((err) => {
        console.log(err)
    });
};

module.exports = connectToDb;