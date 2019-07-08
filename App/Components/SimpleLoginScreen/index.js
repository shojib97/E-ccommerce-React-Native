import React, { Component } from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import styles from '../Login_signUpStyle/index'
import Logo from '../../assets/logo2.png'
import { connect } from 'react-redux'
import { LOGIN } from '../../Redux/LoginRedux'
import Share, {ShareSheet, Button} from 'react-native-share'
class SimpleLoingScreen extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      email: 'abc@gmail.com',
      password: '123456',
      isLoader: false,
      isAlreadyLogin: true
    }
  }

  componentDidMount (): void {
  }

  navigateHome = () => {
    this.props.navigation.navigate('Home')
  }

  submit () {
    this.setState({
      isLoader: true
    })
    const {
      email,
      password
    } = this.state

    if (email !== '' & password !== '') {
      this.props.login({ email, password, navigations: this.props.navigation })
    }
  }

  render () {
    const {
      email,
      password
    } = this.state
    const { user = {} } = this.props
    const { loginLoading = false } = user || {}
    return (
      <View style={styles.ScrollView_View}>
        <ScrollView>
          <View style={[styles.ScrollViewContainet]}>
            <View style={styles.logoContainer}>
              <Image
                source={Logo}
                resizeMode={'stretch'}
                style={styles.logoImage} />
            </View>
          </View>
          <View style={styles.ScrollViewContainet}>
            <View style={{ flex: 1 }}>
              <View style={styles.TextInputView}>
                <TextInput
                  value={email}
                  onChangeText={(email) => this.setState({ email })}
                  style={styles.TextInput} placeholder='Email' />
              </View>
              <View style={styles.TextInputView}>
                <TextInput
                  value={password}
                  onChangeText={(password) => this.setState({ password })}
                  style={styles.TextInput}
                  placeholder='Password'
                  secureTextEntry />
              </View>
              <TouchableOpacity
                onPress={this.submit.bind(this)}
                style={styles.TouchableOpacity_btn}>
                <Text style={styles.buttontext}>SIGN IN</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignUpScreen')}
                style={[styles.TouchableOpacity_btn, { marginTop: 30 }]}>
                <Text style={styles.buttontext}>SIGN UP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        {(loginLoading)
          ? <View style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(250,  250, 250,  0.5)',
            justifyContent: 'center'
          }}>
            <ActivityIndicator color='#003347' size={30} />
          </View>
          : null}
      </View>
    )
  }
}

const mapStateToProps = ({ user = {} }) => {
  return { user }
}

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(LOGIN(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(SimpleLoingScreen)
