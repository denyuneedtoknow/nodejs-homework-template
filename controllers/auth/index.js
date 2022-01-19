import { httpCode } from '../../lib/constants'
import AuthService from '../../service/auth'
import { EmailService, SenderNodemailer, SenderSendgrid } from '../../service/email/'

const authService = new AuthService()

const registration = async (req, res, next) => {
  const { email } = req.body
  const isUserExist = await authService.isUserExist(email)
  if (isUserExist) {
    return res.status(httpCode.CONFLICT).json({
      status: 'error',
      code: httpCode.CONFLICT,
      message: 'Email in use'
    })
  }
  const userData = await authService.create(req.body)
  const emailService = new EmailService(process.env.NODE_ENV, new SenderSendgrid())

  const isSend = await emailService.sendVerifyEmail(email, userData.name, userData.verifyTokenEmail)
  delete userData.verifyTokenEmail
  res.status(httpCode.OK).json({ status: 'success', code: httpCode.OK, data: { ...userData, isSendEmailVelrify: isSend }, })
}
const login = async (req, res, next) => {
  const { email, password } = req.body
  const user = await authService.getUser(email, password)
  if (!user) {
    return res.status(httpCode.UNAUTHORIZED).json({
      status: 'error',
      code: httpCode.UNAUTHORIZED,
      message: 'Email or password is wrong'
    })
  }
  const token = authService.getToken(user)
  await authService.setToken(user.id, token)
  res.status(httpCode.OK).json({ status: 'success', code: httpCode.OK, data: { token } })
}
const logout = async (req, res, next) => {
  await authService.setToken(req.user.id, null)

  res.status(httpCode.NO_CONTENT).json({ status: 'success', code: httpCode.NO_CONTENT, data: {} })
}

export { registration, login, logout }
