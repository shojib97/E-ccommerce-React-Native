import React, { Component } from 'react'
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { baseUrl } from '../../../Utilities/Contants'
import Icon from 'react-native-vector-icons/Feather';

const { height } = Dimensions.get('window')
export default class ProductsList extends Component {
  state = {
    productList: []
  }

  componentDidMount () {
    this.getProducts()
  }
  getProducts () {
    const fashion = this.props.navigation.state.params.type
    fetch(`${baseUrl}product/getProduct?fashion=` + fashion, {
      method: 'GET'
    }).then((res) => {
      res.json().then((data) => {
        if (!data.name) {
          this.setState({
            productList: data
          })
        } else {
          alert('Nework problem')
        }
      })
    }).catch((err) => {
      console.log('Error: ', err)
    })
  }

  render () {
    const { productList } = this.state
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            paddingLeft: '1%',
            paddingRight: '1%'
          }}>
            {productList.map((val, ind) => {
              return (
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('ViewProduct', val)}
                  activeOpacity={0.6}
                  key={ind}
                  style={{
                    width: '48%',
                    marginTop: '1%',
                    marginBottom: '1%',
                    height: 300,
                    backgroundColor: '#fff',
                    borderRadius: 5
                  }}>
                  <View style={{
                    height: 300, width: '100%'
                  }}>
                    <View style={{ flex: 1 }}>
                      <View style={{ flex: 2.5, padding: 10 }}>
                        <Image
                          source={{ uri: val.imageUrl }}
                          resizeMode={'center'}
                          style={{ height: '100%', width: '100%' }}/>
                      </View>
                      <View style={{ flex: 1, padding: 10, justifyContent: 'space-around' }}>
                        <Text style={{ color: 'rgba(1,18,148, 1)', fontSize: 15, fontWeight: 'bold' }}>{val.name}</Text>
                        <Text style={{
                          color: 'rgba(1,18,148, 1)',
                          fontSize: 14,
                          fontWeight: 'bold'
                        }}>Price:£ {val.price}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            this.getProducts()
          }}
          style={{
            height: 50,
            width: 50,
            backgroundColor: '#f3f3f3',
            borderRadius: 1000,
            position: 'absolute', right: 20, bottom: 20,
            justifyContent: 'center', alignItems: 'center',
            elevation: 2

          }}>
          <Icon name="rotate-cw" color="rgba(1,18,148, 1)" size={20}/>
        </TouchableOpacity>
        {(this.state.isLoader) ?
          <View style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(250,  250, 250,  0.5)',
            justifyContent: 'center',
          }}>
            <ActivityIndicator color="#003347" size={30}/>
          </View>
          : null}

      </View>
    )
  }
}
