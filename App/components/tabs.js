import { View, Text, TabBarIOS, TouchableOpacity } from 'react-native';
import React, { Component, PropTypes } from 'react';
import styles from './styles';
import { connect } from 'react-redux';
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';
const { jumpTo } = navigationActions;
import IndexPage from './index';
import ProfilePage from './myProfilePage';
import CreateEvent from './createEvent';
import Notifications from './notifications';
import MessageIndex from './messageIndex';

class ApplicationTabs extends Component {
	_renderTabContent(tab) {
		if (tab.key === 'search') {
			return (
				<IndexPage />
			);
		}

		if (tab.key === 'notifications') {
			return (
				<MessageIndex />
			);
		}

		if (tab.key === 'chat') {
			return (
				<CreateEvent />
			);
		}

		if (tab.key === 'profile') {

			return (
					<ProfilePage />
			);
		}

		return <Text>SOmething went wrong</Text>;
	}

	render() {
		const { dispatch, navigation, indexPage } = this.props;
		const children = navigation.routes.map( (tab, i) => {
			return (
				<TabBarIOS.Item key={tab.key}
						icon={tab.icon}
						selectedIcon={tab.selectedIcon}
						title={tab.title} onPress={ () => dispatch(jumpTo(i, navigation.key)) }
						selected={this.props.navigation.index === i}>
						{ this._renderTabContent(tab) }
				</TabBarIOS.Item>
			);
		});

		return (
			<TabBarIOS
				unselectedTintColor='black'
				tintColor='black'
				unselectedItemTintColor="gray"
				barTintColor='white'>
				{children}
			</TabBarIOS>
		);
	}
}

ApplicationTabs.propTypes = {
    onPress: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}

function mapStateToProps(state) {
	return {
		navigation: state.get('tabs'),
		activitiesPageState: state.get('activitiesPageState')
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(ApplicationTabs);
