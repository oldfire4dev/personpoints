import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerNavContent from '../components/DrawerNavContent';

import Dashboard from '../views/Dashboard';
import Tasks from '../views/Tasks';

const Drawer = createDrawerNavigator();

export default class DrawerNav extends Component {

    componentDidMount = () => {
        
    }

    render() {
        return (
            <Drawer.Navigator 
                drawerContent={props => <DrawerNavContent {...props} props={this.props} />}
                drawerStyle={{
                    width: 320,
                }}
              >
                <Drawer.Screen
                    name="Dashboard"
                    component={Dashboard}
                />
                <Drawer.Screen
                    name="Tasks"
                    component={Tasks}
                />
            </Drawer.Navigator>
        );
    }
}