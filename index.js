const express = require('express');
const cors = require('cors');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./src/graphql/explore/schema');
const root = require('./src/graphql/explore/controllers');
const NoIntrospection = require('graphql-disable-introspection');

const app = express();
const port = process.env.PORT || 4000;

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Allow Cross-Origin requests
// app.use(cors());

// Set security HTTP requests
// app.use(helmet());

// Limit request from the same IP
const limiter = rateLimit({
    max: 150,
    windowMs: 10 * 60 * 100, // 150 requests per 10 mins
});
app.use(limiter);

// Prevent parameter pollution
app.use(hpp());

app.get('/', (req, res) => {
    res.send("Music Life Resource Server");
});
app.use(`/api/explore`, graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
    validationRules: [NoIntrospection]
}));

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});