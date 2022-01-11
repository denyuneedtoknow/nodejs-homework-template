/* eslint-disable indent */
import repositoryContacts from '../../repository/contacts'
import { httpCode } from '../../lib/constants'
import { } from '../../service/'

const aggregation = async (req, res, next) => {
    const { id } = req.params
    const data = await repositoryContacts.getStatisticsContacts(id)
    if (data) {
        return res.status(httpCode.OK).json({ status: 'success', code: httpCode.OK, data })
    }
    res.status(httpCode.NOT_FOUND).json({ status: 'error', code: httpCode.NOT_FOUND, message: 'Not found' })
}

const uploadAvatar = async (req, res, next) => {
    const uploadService = new UploadFileService(
        LocalFileStorage, req.file, req.user)
    const avatarUrl = await uploadService.updateAvatar()
}
export { aggregation }
