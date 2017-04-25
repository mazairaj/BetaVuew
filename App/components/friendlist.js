import React, { Component, PropTypes } from 'react';
import {
 StyleSheet, View, TextInput, TouchableOpacity, NavigatorIOS,
  ListView, Alert, Image } from 'react-native';
import { Container, Content, Left, Body, Right, ListItem, Thumbnail, Text, Spinner } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper'

import { bindActionCreators } from 'redux';
import * as messagerAction from '../actions/messagerAction';
import Message from './chat/message'

import { connect } from 'react-redux';

class FriendsList extends Component{
  constructor(props){
    super(props);
    this.props.messagerActions.getRecentlyAddedFriend(this.props.profile.userObject._id)
  }
  GetMessage(toUserID){
    this.props.navigator.push({
      component: Message,
      backButtonTitle: 'Chat'
    });
  }
  render(){
    // const dataSource2 = ds.cloneWithRows(favs);
    const userconnection = this.props.message.userconnection;
    console.log(this.props)
    if(userconnection.length > 0){
      var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
      var dataSource = ds.cloneWithRows(userconnection);
    }
    return (
      <View style={{flex: 1}}>
      { userconnection.length > 0 ? (
        <View style={{flex: 1, backgroundColor: '#00A652'}}>
          <Container>
              <Content>
              <View style={{flex: 1, borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, borderColor: 'white', padding: 10 }}>
                  <Text style={{backgroundColor:'rgba(0,0,0,0)', textAlign:'left', color:'white', marginRight: 10, fontSize:12, fontWeight:'500'}}>RECENTLY ADDED FRIENDS</Text>
                  <ListView
                  dataSource = {dataSource}
                  renderRow={(rowData) =>
                    <TouchableOpacity onPress={this.GetMessage.bind(this)}>
                    <Image source={{uri: rowData.profileImg}} resizeMode="stretch"
                    style={{width:80, height:80, marginRight: 10, marginTop: 10, borderRadius: 40, borderWidth: 3, borderColor: 'white',justifyContent:'flex-end', alignItems:'center', padding: 15}}>
                    </Image>
                    <Text style={{backgroundColor:'rgba(0,0,0,0)', textAlign:'center', color:'white', marginRight: 10, fontSize:10, fontWeight:'500'}}>{rowData.firstName}</Text>
                    </TouchableOpacity>
                  }
                  horizontal = {true}
                  showsHorizontalScrollIndicator = {false}
                  onEndReachedThreshold = {500}
                  />
              </View>
              </Content>
          </Container>
        </View>
      ) : (
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Spinner color='green'/>
              </View>
      )}
      </View>
    )
  }
}
// <View style={{flex: 1}}>
//       <Text style={{backgroundColor:'rgba(0,0,0,0)', textAlign:'left', color:'white', margin: 10, fontSize:12, fontWeight:'500'}}>NEW MESSAGES</Text>
//       <ListView
//       dataSource = {dataSource2}
//       renderRow={(rowData) =>
//         <TouchableOpacity>
//         <View style={{flex:1, flexDirection: 'row', borderWidth: 2, borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, borderColor: 'white', padding: 10}}>
//           <View style={{flex: 1}}>
//             <Image source={rowData.image} resizeMode="stretch"
//             style={{width:80, height:80, marginRight: 10, borderRadius: 40, justifyContent:'flex-end', alignItems:'center', padding: 15}}>
//             </Image>
//           </View>
//           <View style={{flex: 3, justifyContent: 'center'}}>
//               <Text style={{backgroundColor:'transparent', textAlign:'left', color:'white', marginRight: 10, marginBottom: 5, fontSize:15, fontWeight:'700'}}>{rowData.name}</Text>
//               <Text style={{backgroundColor:'transparent', textAlign:'left', color:'white', marginRight: 10, marginBottom: 5,fontSize:12, fontWeight:'300'}}>Description about this person</Text>
//               <Text style={{backgroundColor:'transparent', textAlign:'left', color:'white', marginRight: 10, marginBottom: 5,fontSize:13, fontWeight:'700'}}>This is the last message recevied</Text>
//           </View>
//           </View>
//         </TouchableOpacity>
//
//
//       }
//       horizontal = {false}
//       showsHorizontalScrollIndicator = {false}
//       onEndReachedThreshold = {500}
//       />
// </View>

function mapStateToProps(state) {
	return {
		navigation: state.get('tabs'),
    profile: state.get('profile'),
    message: state.get('message')
	};
}

function mapDispatchToProps(dispatch) {
    return {
        messagerActions: bindActionCreators(messagerAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);
