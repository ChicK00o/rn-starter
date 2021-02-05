import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Routes from '../../routes';
import ErrorHandler from '../../utils/ErrorHandler';

const App = () => {
    return (
        <ErrorHandler>
            <SafeAreaProvider>
                <Routes />
            </SafeAreaProvider>
        </ErrorHandler>
    );
};

export default App;
