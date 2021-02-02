import React from 'react';
import { Button } from 'react-native';
import Routes from '../../routes';
// import { ErrorBoundary } from '../../utils/error-boundary';
import ErrorHandler from '../../utils/ErrorHandler';

const val = true;

function Bomb() {
    if (val) {
        throw new Error('💥 CABOOM 💥');
    }
    return null;
}

const App = () => {
    const [explode, setExplode] = React.useState(false);

    return (
        <ErrorHandler>
            <Routes>
                {explode ? <Bomb /> : null}
                <Button title="Explode" onPress={() => setExplode(true)} />
            </Routes>
        </ErrorHandler>
    );
};

export default App;
