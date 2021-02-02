import React from 'react';
import Routes from '../../routes';
import ErrorHandler from '../../utils/ErrorHandler';

const App = () => {
    return (
        <ErrorHandler>
            <Routes />
        </ErrorHandler>
    );
};

export default App;
