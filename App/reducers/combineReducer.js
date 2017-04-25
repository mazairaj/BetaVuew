import tabs from './tabReducer';
import {populatedActivities} from './initialReducer';
import {loginReducer, profileReducer} from './loginReducer';
import { combineReducers } from 'redux-immutable';
import { messageReducer } from './messageReducer';


const applicationReducers = {
	login: loginReducer,
	profile: profileReducer,
	tabs,
	message: messageReducer,
	activityPageState: populatedActivities
};

export default function createReducer() {
	return combineReducers(applicationReducers);
}
