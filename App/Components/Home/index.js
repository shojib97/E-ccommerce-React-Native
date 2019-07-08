import React, { Component } from 'react'
import {
  Alert,
  BackHandler,
  Dimensions,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { LOGOUT } from '../../Redux/LoginRedux'

import { StackActions, NavigationActions } from 'react-navigation'

const { height } = Dimensions.get('window')

class Home extends Component {
  componentDidMount () {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
    }
  }

  handleBackButton = () => {
    Alert.alert(
      'Exit App',
      'Exiting the application?', [{
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }, {
        text: 'OK',
        onPress: () => BackHandler.exitApp()
      }], {
        cancelable: false
      }
    )
    return true
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
  }

  next (param) {
    this.props.navigation.navigate('Dashboard', { type: param })
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity activeOpacity={0.6}
            onPress={() => {
              this.props.logout()
              const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'LoginScreen' })]
              })
              this.props.navigation.dispatch(resetAction)
            }}
            style={{
              height: 40,
              width: '30%',
              backgroundColor: 'rgba(1,18,148, 1)',
              elevation: 1,
              justifyContent: 'center',
              position: 'absolute',
              right: 0,
              zIndex: 999
            }}>
            <Text style={{ fontSize: 15, color: '#fff', alignSelf: 'center' }}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.next.bind(this, 'Female')}
            style={styles.type}>
            <ImageBackground source={require('../../assets/Female.jpg')}
              style={styles.ImageBackground} resizeMode='stretch'>
              <Text style={styles.typeText}> Female</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.next.bind(this, 'Male')}
            style={styles.type}>
            <ImageBackground source={require('../../assets/Male.jpg')}
              style={styles.ImageBackground} resizeMode='stretch'>
              <Text style={styles.typeText}> Male</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.next.bind(this, 'Kids')}
            style={styles.type}>
            <ImageBackground source={require('../../assets/Kids.jpg')}
              style={styles.ImageBackground} resizeMode='stretch'>
              <Text style={styles.typeText}> Kids</Text>
            </ImageBackground>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = ({ user = {} }) => {
  return { user }
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(LOGOUT())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

const styles = StyleSheet.create({
  container: { flex: 1 },
  ImageBackground: { flex: 1, justifyContent: 'flex-end' },
  typeText: { fontSize: 25, fontWeight: 'bold', color: '#fff', margin: 20 },
  type: { height: height / 3 }
})
