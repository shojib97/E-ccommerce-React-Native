import { createRoutine } from 'redux-saga-routines'
import Immutable from 'seamless-immutable'

export const LOGIN = createRoutine('LOGIN')
export const LOGOUT = createRoutine('LOGOUT')
export const INITIAL_STATE = Immutable({
  isLogin: false,
  loginLoading: false,
  loginError: false
})

export const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case LOGIN.TRIGGER:
      return state.merge({ loginLoading: true })
    case LOGOUT.TRIGGER:
      return state.merge({ isLogin: false })
    case LOGIN.SUCCESS: {
      return state.merge({ isLogin: payload })
    }
    case LOGIN.FAILURE:
      return state.merge({ loginError: payload })
    case LOGIN.FULFILL:
      return state.merge({ loginLoading: false })
    default:
      return state
  }
}
