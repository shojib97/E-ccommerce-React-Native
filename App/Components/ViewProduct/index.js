import React, { Component } from 'react'
import { View, Text, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native'
import { baseUrl } from '../../Utilities/Contants'
import Share from 'react-native-share'

const { height, width } = Dimensions.get('window')
export default class ViewProduct extends Component {
  static navigationOptions = {
    title: 'Product',
    headerStyle: { backgroundColor: 'rgba(1,18,148, 1)' },
    headerTitleStyle: { color: '#fff', fontSize: 14 },
    headerTintColor: '#ffffff'
  }

  constructor () {
    super()
    this.state = {
      currentProduct: {}
    }
  }

  componentDidMount () {
    this.setState({
      currentProduct: this.props.navigation.state.params
    })
  }

  deleteProduct () {
    const { currentProduct } = this.state
    fetch(`${baseUrl}product/deleteProduct`, {
      method: 'DELETE',
      body: JSON.stringify(currentProduct),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()
      .then((data) => {
        if (data.message === 'Successfuly deleted !') {
          this.props.navigation.navigate('Dashboard')
        } else {
          alert(data.message)
        }
      })
    ).catch((data) => {
      console.log(data)
    })
  }

  shareProduct = () => {
    const { currentProduct = {} } = this.state
    const { name, category = [], imageUrl = '' } = currentProduct || {}
    let shareOptions = {
      title: name,
      message: category.join(', \n'),
      url: `\n ${imageUrl}`,
      subject: 'Share Link' //  for email
    }
    Share.open(shareOptions)
    console.tron.warn(this.state.currentProduct)
  }

  render () {
    const { currentProduct } = this.state
    return (
      <ScrollView>
        <View style={{ flex: 1, height }}>
          <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={{ uri: currentProduct.imageUrl }}
              resizeMode='stretch' style={{ height: '90%', width: '90%' }}/>
          </View>
          <View style={{ flex: 1, padding: 10, justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'rgba(1,18,148, 1)' }}>{currentProduct.name}</Text>
            <Text style={{ fontSize: 15, color: 'rgba(1,18,148, 1)', marginTop: 5 }}>Price:£ {currentProduct.price}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('CreateProducts', { type: 'EDIT', currentProduct })}
              activeOpacity={0.6} style={{
              height: 40,
              width: '30%',
              backgroundColor: 'rgba(1,18,148, 1)',
              elevation: 1,
              justifyContent: 'center',
              borderRadius: 5
            }}>
              <Text style={{ fontSize: 15, color: '#fff', alignSelf: 'center' }}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.deleteProduct.bind(this)} activeOpacity={0.6} style={{
              height: 40,
              width: '30%',
              backgroundColor: 'rgba(1,18,148, 1)',
              elevation: 1,
              justifyContent: 'center',
              borderRadius: 5
            }}>
              <Text style={{ fontSize: 15, color: '#fff', alignSelf: 'center' }}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.shareProduct} activeOpacity={0.6} style={{
              height: 40,
              width: '30%',
              backgroundColor: 'rgba(1,18,148, 1)',
              elevation: 1,
              justifyContent: 'center',
              borderRadius: 5
            }}>
              <Text style={{ fontSize: 15, color: '#fff', alignSelf: 'center' }}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}
