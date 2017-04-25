import React, { Component, PropTypes } from 'react';
import {
  AppRegistry, ScrollView, StyleSheet, View, TextInput, TouchableOpacity, NavigatorIOS,
  ListView, Alert, Image } from 'react-native';
import { Container, Content, Left, Body, Right, ListItem, Thumbnail, Text, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';


import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/initialAction';
import { connect } from 'react-redux';


class Notifications extends Component{
  constructor(props){
    super(props);
    //setting loading and
    this.props.actions.getUserNotifications(this.props.profile.userObject._id)
  }
  onFriendRequest(friendToAddID, choice){
      this.props.actions.acceptFriendRequest(friendToAddID, this.props.profile.userObject._id, choice)
  }
  render(){
    console.log("this is at swiperView.js and this is this.prop: ", this.props)
    const {notifications} = this.props.activityPageState

    if(notifications){
      var notification = notifications.map((x) => {
        return(
          <ListItem thumbnail>
              <Left>
                  <Thumbnail square size={80} source={{uri: x.fromUser.profileImg}} />
              </Left>
              <Body>
                  <Text>{x.fromUser.firstName + ' ' + x.fromUser.lastName}</Text>
                  <Text note>Friend Request</Text>
              </Body>
              <Right style={{paddingBottom: 0, paddingTop: 0}}>
                  <Button transparent style={{paddingTop: 0}} onPress={this.onFriendRequest.bind(this, x.fromUser._id, true)}>
                      <Text style={{fontSize: 13}}>Accept</Text>
                  </Button>
                  <Button transparent style={{paddingTop: 0}} onPress={this.onFriendRequest.bind(this, x.fromUser._id, false)}>
                      <Text style={{fontSize: 13, paddingBottom: 0}}>Decline</Text>
                  </Button>
              </Right>
          </ListItem>
        )
      }
      );

    }


    return (
        <View style={{flex: 1}}>
        { notifications.length > 0 ? (
          <Container>
              <Content>
                  {notification}
              </Content>
          </Container>
        ) : (
          <Container>
              <Content>
                <Text>You do not have any notifications</Text>
              </Content>
          </Container>
        )}
        </View>
)
}
}


function mapStateToProps(state) {
	return {
		navigation: state.get('tabs'),
    profile: state.get('profile'),
    activityPageState: state.get('activityPageState')
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actionCreators, dispatch)
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
