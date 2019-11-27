import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import HomeScreen from './components/screens/HomeScreen';
import MyFiles from './components/screens/MyFilesScreen';


export default class TabViewExample extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'first', title: 'First' },
            { key: 'second', title: 'Second' },
        ],
    };

    render() {
        return (
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    first: () => <HomeScreen active={this.state.index} />,
                    second: () => <MyFiles active={this.state.index} />,
                })}

                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: Dimensions.get('window').width }}
            />
        );
    }
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});