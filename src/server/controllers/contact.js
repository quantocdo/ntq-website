import aws from 'aws-sdk'
import bodyParser from 'body-parser'
import escape from 'escape-html'

import config from 'infrastructure/config'

const ses = new aws.SES({
  region: config.ses.region,
  accessKeyId: config.ses.accessKeyId,
  secretAccessKey: config.ses.secretAccessKey
})

export default {
  get(req, res, next) {
    res.render('pages/contact')
  },
  post: [
    bodyParser.urlencoded({
      extended: true
    }),
    async (req, res, next) => {
      try {
        const { name, email, subject, body } = req.body

        await ses.sendEmail({
          Destination: {
            ToAddresses: [ config.ses.receiver ]
          },
          Message: {
            Body: {
              Html: {
                Charset: 'UTF-8',
                Data: `
                  <main>
                    <div>You have a new message, from ${ escape(name) } [${ escape(email) }]</div>
                    <hr>
                    <h1>${ escape(subject) }</h1>
                    <p>${ escape(body) }</p>
                  </main>
                `
              }
            },
            Subject: {
              Charset: 'UTF-8',
              Data: 'You have a new message from www.ntq-solution.com.vn'
            }
          },
          Source: config.ses.sender
        }).promise()

      } finally {
        res.redirect('/contact')
      }
    }
  ]
}
