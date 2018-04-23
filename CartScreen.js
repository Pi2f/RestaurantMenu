import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class CartScreen extends Component {

  constructor(props) {
      super(props);
      this.state = {
        cart: this.props.screenProps.cart,
      }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.cart}
          keyExtractor={(item, index) => item+index}
          renderItem={({item}) => {
            return (
              <View style={styles.listItem}>
                <Image
                  source={{uri: item.image}}
                  style={{width: 50, height: 50}} />
                <Text style={{minWidth: 200, maxWidth: 200, marginLeft: 5}}>{item.name}</Text>
                <Text>{parseFloat(item.price).toFixed(2)} €</Text>
                <TouchableOpacity>
                </TouchableOpacity>
                </View>
              );
            }}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    paddingTop: 5,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between'
  }
});
