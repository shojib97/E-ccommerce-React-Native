import { all, takeLatest } from 'redux-saga/effects'
import API from '../Services/Api'
import { StartupTypes } from '../Redux/StartupRedux'
import { startup } from './StartupSagas'
import { LOGIN } from '../Redux/LoginRedux'
import { login } from './LoginSagas'

/* ------------- Types ------------- */

/* ------------- Sagas ------------- */

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup, api),
    takeLatest(LOGIN.TRIGGER, login, api)
  ])
}
