import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text } from 'react-native';
import home from './home';
import kaboom from './kaboom';
import setting from './setting';

const linking = {
    prefixes: ['/'],
    config: {
        screens: {
            Home: {
                path: 'home',
                initialRouteName: 'home',
            },
            Setting: {
                path: 'setting',
                initialRouteName: 'setting',
            },
            Kaboom: {
                path: 'kaboom',
                initialRouteName: 'kaboom',
            },
        },
    },
};

const Navigator = () => {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer
            linking={linking}
            fallback={<Text>Loading...</Text>}>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={home}
                    options={{ headerLeft: () => null }}
                />
                <Stack.Screen
                    name="Setting"
                    component={setting}
                    options={{ headerLeft: () => null }}
                />
                <Stack.Screen name="Kaboom" component={kaboom} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigator;
