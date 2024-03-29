const express = require('express');
const onlineJudgeroutes = require('./routes/onlineJudgeRoutes');
const questionRouter = require('./routes/questionRoutes');
const aptiQuestionRouter = require('./routes/aptiQuestionRoutes');
const quizQuestionRouter = require('./routes/quizQuestionRoutes');
const quizRouter = require('./routes/quizRoutes');
const quizSubmissionRouter = require('./routes/quizSubmissionRoutes');
const codeSubmissionRouter = require('./routes/codeSubmissionRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

const hpp = require('hpp');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');

const app = express();

// Parsing the data into body
app.use(cors());
app.options('*', cors())


// Set security HTTP headers
app.use(helmet());

// Limit requests from same API 
const limiter = rateLimit({
    max: 1500,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(mongoSanitize());



// Prevent parameter pollution
// app.use(
//     hpp({
//         whitelist: [
//             //   'check'
//         ]
//     })
// );
app.use(compression());


app.use('/api/v1/aptiquestions', aptiQuestionRouter);
app.use('/api/v1/questions', questionRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/quizQuestions', quizQuestionRouter);
app.use('/api/v1/quizzes', quizRouter);
app.use('/api/v1/quizSubmissions', quizSubmissionRouter);
app.use('/api/v1/codeSubmissions', codeSubmissionRouter);
app.use('/api/v1/onlineJudge', onlineJudgeroutes);


// IF NO ROUTES GOT MATCHED( matlab agar kisine galat url daala tab )
// should be at the end of all the routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use((req, res, next) => {

    next();
}, globalErrorHandler);



module.exports = app;