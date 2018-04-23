import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Cart from './CartScreen.js';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Image,
} from 'react-native';

export default class AddCartScreen extends Component {

  static navigationOptions = {
    headerTitle: "Add a product",
  };

  constructor(props) {
      super(props);
      this.item = this.props.navigation.state.params;
      this.state = {
        quantity: 1,
      }
  }

  addItem(item){
    this.props.screenProps.cart.push(item);
    this.props.navigation.navigate('Cart',this.props.screenProps.cart);
  }

  render() {
    prixTotal = parseFloat(this.item.price*this.state.quantity).toFixed(2);
    return (
        <View>
          <Text style={{fontSize: 15}}>Voulez vous ajouter l'élément suivant au panier : </Text>
          <View style={styles.listItem}>
           <Image
             source={{uri: this.item.image}}
             style={{width: 50, height: 50}} />
           <Text style={{minWidth: 200, maxWidth: 200, marginLeft: 5}}>{this.item.name}</Text>
           <Text>{parseFloat(this.item.price).toFixed(2)} €</Text>
          </View>
          <View style={styles.listItem}>
            <Text>
              Prix Total : {prixTotal} €
            </Text>
            <View style={styles.quantity}>
              <Text style={{marginRight: 10,fontSize: 15}}>Quantité : </Text>
              <TouchableHighlight
                onPress={() => {
                  if(this.state.quantity > 1){
                    this.setState({ quantity: this.state.quantity-1 });
                  }
                }}>
                <Ionicons name={'md-remove'} size={25} color={'gray'} />
              </TouchableHighlight>
              <Text style={{fontSize: 15}}>{this.state.quantity}</Text>
              <TouchableHighlight
                onPress={() => (this.setState({ quantity: this.state.quantity+1 }))}>
                <Ionicons name={'md-add'} size={25} color={'gray'} />
              </TouchableHighlight>
            </View>
          </View>
          <View style={{justifyContent: 'flex-end', flexDirection: 'row',}}>
            <TouchableHighlight
              onPress={() => {
                this.addItem(this.item);
              }
            }>
            <View style={{backgroundColor: 'green', flexDirection: 'row'}}>
                <Text>Valider</Text>
                <Ionicons name={'md-checkmark'} size={25} color={'white'} />
              </View>
            </TouchableHighlight>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    paddingTop: 5,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between'
  },
  quantity: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});
