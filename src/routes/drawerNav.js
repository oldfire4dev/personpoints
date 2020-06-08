import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerNavContent from '../components/DrawerNavContent';

import Dashboard from '../views/Dashboard';
import Tasks from '../views/Tasks';
import Objectives from '../views/Objectives'
import Settings from '../views/Settings';

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
                <Drawer.Screen
                    name="Objectives"
                    component={Objectives}
                />
                <Drawer.Screen
                    name="Settings"
                    component={Settings}
                />
            </Drawer.Navigator>
        );
    }
}