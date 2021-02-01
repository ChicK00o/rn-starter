import React from 'react';
import Routes from '../../routes';
import { ErrorBoundary } from '../../utils/error-boundary';

const App = () => {
    return (
        <ErrorBoundary>
            <Routes />
        </ErrorBoundary>
    );
};

export default App;
