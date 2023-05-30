const mongoose = require('mongoose');
const dotenv = require('dotenv');

/** Handle the uncaughtException */
process.on('uncaughtException', err => {
    console.log(`uncaughtException, Shutitng Down!\n${err.name} ${err.message}`);
    process.exit(1);
});

/**
 * Config File
 */
dotenv.config({ path: './config.env' });
const app = require('./index');

/**
 * Database Connection
 */
mongoose.connect(
    process.env.DATABASE_LOCAL
).then(() => {
    console.log('DATABASE CONNECTION SUCCESSFUL!');
}).catch((err) => console.log('Disconnected !'))

/**
 * Hosting port
 */
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Server Listening on Port ${port}`);
});


/**
 * Handle the unhandledRejection
 */
process.on('unhandledRejection', err => {
    console.log(`unhandledRejection, Shutitng Down!\n${err.name} ${err.message}`)
    server.close(() => {
        process.exit(1);
    });
});