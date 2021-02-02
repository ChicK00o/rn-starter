import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text } from 'react-native';
import home from './home';
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
        },
    },
};

const Navigator: React.FunctionComponent = ({ children }) => {
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
            </Stack.Navigator>
            {children}
        </NavigationContainer>
    );
};

export default Navigator;
