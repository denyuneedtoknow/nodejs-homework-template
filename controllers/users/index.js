
/* eslint-disable indent */
import repositoryContacts from '../../repository/contacts'
import repositoryUsers from '../../repository/users'
import { httpCode } from '../../lib/constants'
import { UploadFileService, LocalFileStorage, CloudFileStorage } from '../../service/file-storage'
import { EmailService, SenderNodemailer, SenderSendgrid } from '../../service/email/'

const aggregation = async (req, res, next) => {
    const { id } = req.params
    const data = await repositoryContacts.getStatisticsContacts(id)
    if (data) {
        return res
            .status(httpCode.OK)
            .json({ status: 'success', code: httpCode.OK, data })
    }
    res.status(httpCode.NOT_FOUND).json({ status: 'error', code: httpCode.NOT_FOUND, message: 'Not found' })
}
const uploadAvatar = async (req, res, next) => {
    const uploadService = new UploadFileService(LocalFileStorage, req.file, req.user)
    // const uploadService = new UploadFileService(CloudFileStorage, req.file, req.user)
    const avatarURL = await uploadService.updateAvatar()
    res
        .status(httpCode.OK)
        .json({ status: 'success', code: httpCode.OK, data: { avatarURL } })
}
const verifyUser = async (req, res, next) => {
    const verifyToken = req.params.token
    const userFromToken = repositoryUsers.findByVerifyToken(verifyToken)
    if (userFromToken) {
        await repositoryUsers.updateVerify(userFromToken.id, true)
        res
            .status(httpCode.OK)
            .json({ status: 'success', code: httpCode.OK, data: { message: 'Success!' } })
    }
    res
        .status(httpCode.BAD_REQUEST)
        .json({ status: 'success', code: httpCode.BAD_REQUEST, data: { message: 'Invalid token!' } })
}
const repeatEmailForVerifyUser = async (req, res, next) => {
    const { email } = req.body
    const user = repositoryUsers.findByEmail(email)
    if (user) {
        const { email, name, verifyTokenEmail } = user
        const emailService = new EmailService(process.env.NODE_ENV, new SenderNodemailer())

        const isSend = await emailService.sendVerifyEmail(email, name, verifyTokenEmail)
        if (isSend) {
            return res
                .status(httpCode.OK)
                .json({ status: 'success', code: httpCode.OK, data: { message: 'Success!' } })
        }
        res
            .status(httpCode.UE)
            .json({ status: 'error', code: httpCode.UE, data: { message: 'Unprocessable Entity' } })

    }
    res
        .status(httpCode.NOT_FOUND)
        .json({ status: 'error', code: httpCode.NOT_FOUND, data: { message: 'User not found' } })
}

export { aggregation, uploadAvatar, verifyUser, repeatEmailForVerifyUser }