export function loginReducer(state = {loading: false, loggedIn: false, error: null}, action) {
    switch (action.type) {
    case 'LOADING':
        return Object.assign({}, state, {
            loading: true
        });

    case 'LOGIN':
        return Object.assign({}, state, {
            loading: false,
            loggedIn: true,
            error: null,
        });

    case 'LOGOUT':
        return Object.assign({}, state, {
            loading: false,
            loggedIn: false,
            error: null
        });

    case 'ERROR': {
        return Object.assign({}, state, {
            loading: false,
            loggedIn: false,
            error: action.err
        });
    }

    default:
        return state;
    }
}

export function profileReducer(state =
  { userObject: null},
  action) {
    switch (action.type) {
    case 'ADD_USER':
        return Object.assign({}, state, {
            userObject: action.userObject,
        });

    default:
        return state;
    }
}

/*
default
{login: {loading: false, loggedIn: false, error: null},
profile: { id: null, name: null, profileImg: null, profileWidth: null, profileHeight: null, email: null}
}
*/
