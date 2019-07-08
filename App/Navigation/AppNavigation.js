import { createAppContainer, createStackNavigator } from 'react-navigation'

import { CreateProducts, Dashboard, Home, LoginScreen, SignUpScreen, ViewProduct } from '../Components'
// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
  SignUpScreen: {
    screen: SignUpScreen,
    navigationOptions: {
      header: null
    }
  },
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      header: null
    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  CreateProducts: {
    screen: CreateProducts
  },
  ViewProduct: {
    screen: ViewProduct
  }

}, {
  initialRouteName: 'LoginScreen'
})

export default createAppContainer(PrimaryNav)
