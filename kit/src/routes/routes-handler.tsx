import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text } from 'react-native';
import generic from './generic';
import home from './home';
import kaboom from './kaboom';
import setting from './setting';

type routeType = {
    name: string;
    route: string;
    component: React.ComponentType<any>;
    screenOptions?: any;
};

const pages: routeType[] = [
    {
        name: 'Home',
        route: 'home',
        component: home,
        screenOptions: { headerLeft: () => null },
    },
    {
        name: 'Setting',
        route: 'setting',
        component: setting,
        screenOptions: { headerLeft: () => null },
    },
    { name: 'Generic', route: 'generic', component: generic },
    { name: 'Kaboom', route: 'kaboom', component: kaboom },
];

type screenDataPair = {
    [key: string]: string;
};

const Navigator = () => {
    const Stack = createStackNavigator();

    var screenData: screenDataPair = {};
    pages.forEach((data) => {
        screenData[data.name] = data.route;
    });

    const linking = {
        prefixes: ['/'],
        config: {
            initialRouteName: 'Home',
            screens: screenData,
        },
    };

    return (
        <NavigationContainer
            linking={linking}
            fallback={<Text>Loading...</Text>}>
            <Stack.Navigator>
                {pages.map((data) => (
                    <Stack.Screen
                        key={data.name}
                        name={data.name}
                        component={data.component}
                        options={data.screenOptions}
                    />
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigator;
