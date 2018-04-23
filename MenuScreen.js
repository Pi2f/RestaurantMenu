import React from 'react';
import Menu from './menu.json';
import AddCartScreen from './AddCartScreen.js';
import CartScreen from './CartScreen.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigator, TabNavigator, TabBarBottom, } from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  FlatList, Image,
  TouchableOpacity,
  TouchableHighlight,
  Button,
} from 'react-native';


export default class MenuScreen extends React.Component {

  static navigationOptions = {
    headerTitle: 'Menu',
  };

  constructor(props) {
      super(props);
      this.onPress = this.onPress.bind(this);
      this.setcartVisible = this.setcartVisible.bind(this);
      this.state = {
        cartVisible: false,
        item: {},
      };
  }

  setcartVisible(visible, name, price, image) {
      this.setState({
        cartVisible: visible,
      });

      if(visible){
        this.setState({
          item:{name, price, image}
        });
      }
  }


  onPress(name, price, image){
      this.setcartVisible(true, name, price, image);
  }

  render() {
    const { navigate } = this.props.navigation;
    const menu = Menu.categories.map((s, index) => {
      const { name, products } = s;
      return {title: name, data: products.map((product) => product)};
    });
    return (
      <View style={styles.container}>
        <SectionList
          style={styles.listSections}
          renderItem={({item}) =>
             <FlatList
               data={[item]}
               keyExtractor={(item, index) => item+index}
               renderItem={({item}) => {
                 item.price = parseFloat(item.price).toFixed(2);
                 return (
                   <View style={styles.listItem}>
                     <Image
                       source={{uri: item.image}}
                       style={{width: 50, height: 50}} />
                     <Text style={{minWidth: 200, maxWidth: 200, marginLeft: 5}}>{item.name}</Text>
                     <Text>{parseFloat(item.price).toFixed(2)} €</Text>
                     <TouchableOpacity
                       onPress={() => this.props.navigation.navigate('AddCart',item)}>
                       <Image
                         source={require('./shopping-cart-add-button.png')}
                         style={{width: 30, height: 30}} />
                       </TouchableOpacity>
                     </View>
                   );
                 }}
               />
           }
           renderSectionHeader={({ section: { title } }) => <Text style={styles.listSectionItem}>{title}</Text>}
           sections={menu}
           keyExtractor={(item, index) => item + index}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  listSectionItem: {
    flex:1,
    marginTop: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 10,
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
