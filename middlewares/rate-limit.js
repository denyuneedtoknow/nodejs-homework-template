/* eslint-disable indent */
import { httpCode } from '../lib/constants'
import rateLimit from 'express-rate-limit'

const limiter = (duration, limit) => {
    return rateLimit({
        windowMs: duration, // 15 minutes
        max: limit, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        handler: (req, res, next) => {
            return res.status(httpCode.TOO_MANY_REQUESTS).json({
                status: 'error',
                code: httpCode.TOO_MANY_REQUESTS,
                message: 'Too many requests sended, please try again later'
            })
        }
    })
}

export default limiter
