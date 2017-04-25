import React, { Component } from 'react';
import { NavigatorIOS, View } from 'react-native';

import FriendsList from './friendlist'

export default class MessageIndex extends Component {
  render(){
      const {actions } = this.props;
      return (
        <View style={{flex:1}}>
          <NavigatorIOS
          style={{flex: 1}}
          initialRoute={{
              component: FriendsList,
              title: 'Messages',
              showTabBar: true
            }}
            navigationBarHidden={false}>
          </NavigatorIOS>
        </View>
      )
    }
}

module.exports = MessageIndex;
