import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import SimpleSchema from 'simpl-schema'

// the first time the app is started, we need to create a user

const firstUser = function ({ name, email, role }) {
  new SimpleSchema({
    name: { type: String },
    email: { type: String },
    role: { type: String, optional: true }
  }).validate({ name, email, role })

  // only if no user exists
  const userInfo = Meteor.users.findOne({})
  let userId = userInfo && userInfo._id
  if (!userInfo) {
    if (role === undefined) {
      role = 'operator'
    }
    userId = Accounts.createUser({ name, email, role })
  }

  // default to sending email
  Accounts.sendEnrollmentEmail(userId)
  return userId
}

export default firstUser
