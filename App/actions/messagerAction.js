// import socket from '../socket';

function fetching(){
  return {
    type: "FETCHING_DATA"
  }
}
function doneFetching() {
  return {
    type: "DONE_FETCHING"
  }
}

// export function getNewlyAddedFriend(currentUserID, friendToAddID) {
//     return dispatch => {
//         dispatch(fetching());
//         console.log('currentUserID in getNewlyAddedFriend in messagerAction: ', currentUserID);
//         console.log('friendToAddID in getNewlyAddedFriend in messagerAction: ', friendToAddID);
//
//         fetch('http://localhost:8080/getMessage', {
//               method: 'POST',
//               headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//               },
//               body: JSON.stringify({
//                 toUserID: currentUserID,
//                 fromUserID: friendToAddID
//               })
//             }).then((response) => response.json())
//             .then((responseJson) => {
//
//                 var userObject = [...responseJson];
//                 console.log(userObject, "this is in getNewlyAddedFriend")
//                 dispatch(getNewFriendComplete(userObject));
//                 dispatch(doneFetching())
//             })
//             .catch((err) => {
//               console.log('error: ', err)
//             });
//     };
// }

export function getRecentlyAddedFriend(currentUserID) {
    return dispatch => {
        dispatch(fetching());
        console.log('currentUserID in getNewlyAddedFriend in messagerAction: ', currentUserID);

        fetch('http://localhost:8080/getNewlyAddedFriend', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                toUserID: currentUserID
              })
            }).then((response) => response.json())
            .then((responseJson) => {
                var userObject = [...responseJson.connections]
                dispatch(getNewFriendComplete(userObject));
                dispatch(doneFetching())
            })
            .catch((err) => {
              console.log('error: ', err)
            });
    };
}


function getNewFriendComplete(userconnection) {
  console.log('INSIDE FETCH DISPATCH', userconnection)
    return {
        type: 'GET_NEWLYADDEDFRIEND',
        userconnection
    };
}

export function getMessage(currentUserID) {
    return dispatch => {
        dispatch(fetching());
        console.log('currentUserID in getMessage in messagerAction: ', currentUserID);

        fetch('http://localhost:8080/getNotification', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                userID: currentUserID
              })
            }).then((response) => response.json())
            .then((responseJson) => {


                var userObject = [...responseJson];
                console.log(userObject, ' is the super userObject from getUserNotifications');

                  // socket.emit()

                dispatch(getNotifications(userObject));
                dispatch(doneFetching())
            })
            .catch((err) => {
              console.log('error: ', err)
            });
    };
}

// export function createMessage(author, text) {
//   return socket.action({
//     type: 'CREATE_MESSAGE',
//     message: {
//       author,
//       text
//     }
//   });
// };

export function receiveMessage(message) {
  console.log('receiving message', message);
  return {
    type: 'RECEIVE_MESSAGE',
    message
  };
}

// socket.on(RECEIVE_MESSAGE, receiveMessage);
