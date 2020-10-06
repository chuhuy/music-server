const express = require('express');
const cors = require('cors');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();
const port = 3000;

// Allow Cross-Origin requests
app.use(cors());

// Set security HTTP requests
app.use(helmet());

// Limit request from the same IP
const limiter = rateLimit({
    max: 150,
    windowMs: 10 * 60 * 100, // 150 requests per 10 mins
});
app.use(limiter);

// Prevent parameter pollution
app.use(hpp());

app.get('/', (req, res) => {
    res.send("Hello");
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});