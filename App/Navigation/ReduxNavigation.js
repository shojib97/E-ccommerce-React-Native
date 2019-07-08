import * as React from 'react'
import { createReactNavigationReduxMiddleware, reduxifyNavigator } from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'
import AppNavigation from './AppNavigation'
import { NavigationActions } from 'react-navigation'

export const appNavigatorMiddleware = createReactNavigationReduxMiddleware(
  'root',
  (state) => state.nav
)

const ReduxAppNavigator = reduxifyNavigator(AppNavigation, 'root')

class ReduxNavigation extends React.Component {
  componentDidMount () {
    if (this.props.user.isLogin) {
      const navigateAction = NavigationActions.navigate({
        routeName: 'Home'
      })
      this.props.dispatch(navigateAction)
    } else {
      console.tron.warn('log out is callled')
    }
  }

  render () {
    return <ReduxAppNavigator dispatch={this.props.dispatch} state={this.props.nav}/>
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
  user: state.user
})
export default connect(mapStateToProps)(ReduxNavigation)
