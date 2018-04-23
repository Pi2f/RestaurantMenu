import React from 'react';
import MenuScreen from './MenuScreen.js';
import AddCartScreen from './AddCartScreen.js';
import CartScreen from './CartScreen.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigator, TabNavigator, TabBarBottom, } from 'react-navigation';

const MenuStack = StackNavigator({
  Menu: {
    screen: MenuScreen,
  },
  AddCart: {
    screen: AddCartScreen,
  },
}, { initialRouteName: 'Menu' });

const CartStack = StackNavigator({
  Cart: {
    screen: CartScreen,
  },
}, { initialRouteName: 'Cart' });

const TabNav = TabNavigator({
  Menu: { screen: MenuStack },
  Cart: { screen: CartStack },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Menu') {
          iconName = 'md-clipboard';
        } else if (routeName === 'Cart') {
          iconName = 'md-cart';
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
  }
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
  }
  render() {
    return (
      <TabNav screenProps={this.state}/>
    );
  }
}
