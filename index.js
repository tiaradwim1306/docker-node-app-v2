const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const redis = require('ioredis');
const cors = require("cors");
let redisStore = require('connect-redis').default
const app = express();

const { 
    MONGO_USER, 
    MONGO_PASSWORD, 
    MONGO_IP, 
    MONGO_PORT,
    SESSION_SECRET,
    REDIS_URL,
    REDIS_PORT,
} = require('./config/config');
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT,
});
app.use(express.json());

app.enable("trust proxy")
app.use(cors({}))
app.use(
    session({
        store: new redisStore({ client: redisClient }), // Use new RedisStore and pass client
        secret: SESSION_SECRET,
        cookie: {
            secure: false,
            resave: false,
            saveUninitialized: false,
            httpOnly: true,
            maxAge: 60000,
        }
    })
);

const connectWithRetry = () => {
    mongoose
        .connect(mongoURL) 
        .then(() => console.log("Successfully connected to DB"))
        .catch((e) => {
            console.log(e);
            setTimeout(connectWithRetry, 5000);
        });
};

connectWithRetry();


// localhost:5000/
app.get("/api/v1", (req, res) => {
    res.send("<h2>Hello Again World, This is V5!!<h2>");
    console.log("yeah it run")
});

// localhost:5000/api/v1/post/
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));