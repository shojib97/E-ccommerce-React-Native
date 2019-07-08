import { put, call } from 'redux-saga/effects'
import { LOGIN } from '../Redux/LoginRedux'
import { AsyncStorage } from 'react-native'

export function * login (api, { payload = {} }) {
  try {
    const { email, password } = payload
    const { data = {} } = yield call(api.login, { email, password }, true)
    const { message = '' } = data || {}
    console.tron.warn(data)
    if (message === 'Login Successful') {
      yield put(LOGIN.success(true))
      const { navigations } = payload
      navigations.navigate('Home')
    } else {
      alert('Something went wrong')
    }
  } catch (error) {
    const { message = '' } = error
    alert('Somthing went wrong')
    yield put(LOGIN.failure(message))
  } finally {
    yield put(LOGIN.fulfill())
  }
}
