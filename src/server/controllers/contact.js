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
    res.render('pages/contact-new')
  },
  post: [
    bodyParser.urlencoded({
      extended: true
    }),
    async (req, res, next) => {
      try {
        const {
          subject,
          email,
          name,
          companyName,
          phoneNumber,
          content
        } = req.body

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
                    <div>Contact info:</div>
                    <ul>
                      <li>Company Name: ${ escape(companyName) }</li>
                      <li>Phone Number: ${ escape(phoneNumber) }</li>
                    </ul>
                    <hr>
                    <div>Contact for: ${ escape(Array.isArray(subject) ? subject.join(', ') : subject) }</div>
                    <p>${ escape(content) }</p>
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
