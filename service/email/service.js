import Mailgen from 'mailgen'
class EmailService {
    constructor(env, sender) {
        this.sender = sender
        switch (env) {
            case 'developmant':
                this.link = 'http://localhost:3030/'
                break
            case 'test':
                this.link = 'http://localhost:5000/'
                break
            case 'production':
                this.link = 'http://heroku/'
                break
            default:
                this.link = 'http://localhost:3030/'

        }
    }
    createEmailTemplate(username, verifyToken) {
        const mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'Group35',
                link: this.link
            }
        });
        const email = {
            body: {
                name: username,
                intro: 'Welcome to Mailgen! We\'re very excited to have you on board.',
                action: {
                    instructions: 'To get started with our API, please click here:',
                    button: {
                        color: '#22BC66', // Optional action button color
                        text: 'Confirm your account',
                        link: `${this.link}/api/users/verify/${verifyToken}`
                    }
                },
                outro: 'Need help, or have questions? we\'re sorry'
            }
        };
        return mailGenerator.generate(email);
    }
    async sendVerifyEmail(email, username, verifyToken) {
        const emailBody = this.createEmailTemplate(username, verifyToken)
        const msg = {
            to: email,
            subject: 'verufy email',
            html: emailBody
        }
        try {
            const result = await this.sender.send(msg)
            console.log(result);
            return true
        } catch (error) {
            console.log(error.message);
            return false
        }

    }
}


export default EmailService