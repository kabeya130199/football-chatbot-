require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const port = process.env.PORT || 3001;
app.use(cors());
app.use(helmet());


//MongoDB Connection Setup
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => console.log('Mongoose is Connected'));
if(process.env.NODE_ENV !== 'production'){

    const mDb = mongoose.connection;

    mDb.on("error", (error) => {
        console.log('err', error);
    });

    mDb.once("open", () => {
        console.log("MongoDB is connected")
    });
    
    app.use(morgan('tiny'));
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const handleError = require('./src/utils/errorHandler');

//Load Router

const userRouter = require('./src/router/userRouter');
const ticketRouter = require('./src/router/ticketRouter');
const tokensRouter = require('./src/router/tokenRouter');
const appearanceRouter = require('./src/router/appearanceRouter');
const chatRouter = require('./src/router/chatRouter')
const assistantRouter = require('./src/router/assistantRouter')

//Use Router
app.use("/v1/user", userRouter);
app.use("/v1/appearance", appearanceRouter);
app.use("/v1/ticket", ticketRouter);
app.use('/v1/tokens', tokensRouter);
app.use('/v1/chat', chatRouter);
app.use('/v1/assistant', assistantRouter);


app.use("*", (req, res, next) => {
    const error = new Error("Resources not found")
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    handleError(error, res)
})


app.listen(port, () => {
    console.log(`API is running on http://127.0.0.1:${port}`);
})