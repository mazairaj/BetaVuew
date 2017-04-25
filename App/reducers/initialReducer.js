export function populatedActivities(state = {
  nav: "ActivitiesPage",
  fetchingData: false,
  populatedActivities: {
    currCategory: [],
    prevCategory: [],
    nextCategory: []
  },
  category: "Sport",
  notifications: []
}, action) {
    switch (action.type) {
    case 'POPULATED_ACTIVITIES':
        return Object.assign({}, state, {
            populatedActivities: action.populatedActivities,
            category: action.category
        });
    case 'GET_NOTIFICATIONS':
    console.log('i am here');
          return Object.assign({}, state, {
              notifications: action.notifications
          });
    case "FETCHING_DATA":
        return Object.assign({}, state, {
          fetchingData: true
        })
        case "DONE_FETCHING":
            return Object.assign({}, state, {
              fetchingData: false
            })
    case "SELECT_ACTIVITY":
      return Object.assign({}, state, {
        selectedActivity: action.selectedActivity,
        selectedActivityOwner: action.selectedActivityOwner
      })

    default:
        return state;
    }
}
