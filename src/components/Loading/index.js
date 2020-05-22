import React, { Component } from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';

export default class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() { 
        return (
            <View>
                <ActivityIndicator color={this.props.color} size={this.props.size} style={this.props.loadingContentStyle} />
            </View>
        );
    }
}