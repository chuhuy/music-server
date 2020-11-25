const express = require('express');
const cors = require('cors');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const NoIntrospection = require('graphql-disable-introspection');

const app = express();
const port = process.env.PORT || 4000;
const authenticateToken = require('./src/services/authentication');

// GraphQL root and schema
const exploreSchema = require('./src/graphql/explore/schema');
const exploreRoot = require('./src/graphql/explore/controllers');
const personalSchema = require('./src/graphql/personal/schema');
const personalRoot = require('./src/graphql/personal/controllers');

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
    schema: exploreSchema,
    rootValue: exploreRoot,
    graphiql: true,
    validationRules: [NoIntrospection]
}));
app.use(`/api/personal`, authenticateToken, graphqlHTTP({
    schema: personalSchema,
    rootValue: personalSchema,
    graphiql: true,
    validationRules: [NoIntrospection]
}));

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});