export enum DBErrorMessages {
  MISSING_TITLE_AND_CONTENT = 'You must provide a title and a content to create a post!',
  ONE_FIELD_TO_UPDATE = 'Need to have at least one filed to update',
  MISSING_POST = 'Selected post does not exists!',
  SERVER_ERROR = 'Something went wrong!',
  MISSING_SIGNUP_DATA = 'You must provide a name, email, password and bio to create a user!',
  SHORT_PASSWORD = 'Your password must be longer than 6 characters!',
  PASSWORDS_DO_NOT_MATCH = 'Your passwords do not match!',
  MISSING_INPUTS = 'All fields are mandatory!',
  INVALID_EMAIL_ADDRESS = 'Your email address is invalid!',
  EMAIL_ADDRESS_ALREADY_IN_USE = 'The email address is already in use! Please, choose another one!',
  AUTHORIZATION_FAILED = 'Wrong login credentials!',
}
