/* eslint-disable indent */

import { httpCode } from '../lib/constants'
import { FORBIDDEN } from '../lib/messages'

const guard = (role) => async (req, res, next) => {
    const roleCurrentUser = req.user.role
    if (roleCurrentUser !== role) {
        return res.status(httpCode.FORBIDDEN).json({
            status: 'error',
            code: httpCode.FORBIDDEN,
            message: FORBIDDEN[req.app.get('lang')]
        })
    }

    next()
}

export default guard
