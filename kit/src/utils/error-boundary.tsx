import * as React from 'react';
import {
    Button,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from 'react-native';
import RNRestart from 'react-native-restart';

const changedArray = (a: Array<unknown> = [], b: Array<unknown> = []) =>
    a.length !== b.length ||
    a.some((item, index) => !Object.is(item, b[index]));

interface FallbackProps {
    error: Error;
    resetErrorBoundary: (...args: Array<unknown>) => void;
}

interface ErrorBoundaryPropsWithComponent {
    onResetKeysChange?: (
        prevResetKeys: Array<unknown> | undefined,
        resetKeys: Array<unknown> | undefined,
    ) => void;
    onReset?: (...args: Array<unknown>) => void;
    onError?: (error: Error, info: { componentStack: string }) => void;
    resetKeys?: Array<unknown>;
    FallbackComponent: React.ComponentType<FallbackProps>;
}

declare function FallbackRender(
    props: FallbackProps,
): React.ReactElement<
    unknown,
    string | React.FunctionComponent | typeof React.Component
> | null;

interface ErrorBoundaryPropsWithRender {
    onResetKeysChange?: (
        prevResetKeys: Array<unknown> | undefined,
        resetKeys: Array<unknown> | undefined,
    ) => void;
    onReset?: (...args: Array<unknown>) => void;
    onError?: (error: Error, info: { componentStack: string }) => void;
    resetKeys?: Array<unknown>;
    fallbackRender: typeof FallbackRender;
}

interface ErrorBoundaryPropsWithFallback {
    onResetKeysChange?: (
        prevResetKeys: Array<unknown> | undefined,
        resetKeys: Array<unknown> | undefined,
    ) => void;
    onReset?: (...args: Array<unknown>) => void;
    onError?: (error: Error, info: { componentStack: string }) => void;
    resetKeys?: Array<unknown>;
    fallback: React.ReactElement<
        unknown,
        string | React.FunctionComponent | typeof React.Component
    > | null;
}

interface ErrorBoundaryPropsEmpty {
    onResetKeysChange?: (
        prevResetKeys: Array<unknown> | undefined,
        resetKeys: Array<unknown> | undefined,
    ) => void;
    onReset?: (...args: Array<unknown>) => void;
    onError?: (error: Error, info: { componentStack: string }) => void;
    resetKeys?: Array<unknown>;
}

type ErrorBoundaryProps =
    | ErrorBoundaryPropsWithFallback
    | ErrorBoundaryPropsWithComponent
    | ErrorBoundaryPropsWithRender
    | ErrorBoundaryPropsEmpty;

type ErrorBoundaryState = { error: Error | null };

const initialState: ErrorBoundaryState = { error: null };

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
    return (
        <SafeAreaView>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <View>
                    <Text>Something went wrong:</Text>
                    <Text>{error.message}</Text>
                    <Button title="Refresh" onPress={resetErrorBoundary} />
                    <Text>{error.stack}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// for web refresh hack
const globalAny: any = global;

class ErrorBoundary extends React.Component<
    React.PropsWithRef<React.PropsWithChildren<ErrorBoundaryProps>>,
    ErrorBoundaryState
> {
    static getDerivedStateFromError(error: Error) {
        return { error };
    }

    state = initialState;
    updatedWithError = false;
    resetErrorBoundary = (...args: Array<unknown>) => {
        this.props.onReset?.(...args);
        this.reset();
    };

    reset() {
        this.updatedWithError = false;
        this.setState(initialState);
        if (Platform.OS === 'web') {
            // for web refresh hack
            globalAny.window.location.reload(true);
        } else {
            RNRestart.Restart();
        }
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        this.props.onError?.(error, info);
    }

    componentDidUpdate(prevProps: ErrorBoundaryProps) {
        const { error } = this.state;
        const { resetKeys } = this.props;

        // There's an edge case where if the thing that triggered the error
        // happens to *also* be in the resetKeys array, we'd end up resetting
        // the error boundary immediately. This would likely trigger a second
        // error to be thrown.
        // So we make sure that we don't check the resetKeys on the first call
        // of cDU after the error is set
        if (error !== null && !this.updatedWithError) {
            this.updatedWithError = true;
            return;
        }

        if (error !== null && changedArray(prevProps.resetKeys, resetKeys)) {
            this.props.onResetKeysChange?.(prevProps.resetKeys, resetKeys);
            this.reset();
        }
    }

    render() {
        const { error } = this.state;
        // @ts-expect-error ts(2339) (at least one of these will be defined though, and we check for their existance)
        const { fallbackRender, FallbackComponent, fallback } = this.props;

        if (error !== null) {
            const props = {
                error,
                resetErrorBoundary: this.resetErrorBoundary,
            };
            if (React.isValidElement(fallback)) {
                return fallback;
            } else if (typeof fallbackRender === 'function') {
                return (fallbackRender as typeof FallbackRender)(props);
            } else if (FallbackComponent) {
                return <FallbackComponent {...props} />;
            } else {
                return ErrorFallback(props);
                // throw new Error(
                //     'react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop',
                // );
            }
        }

        return this.props.children;
    }
}

function withErrorBoundary<P>(
    Component: React.ComponentType<P>,
    errorBoundaryProps: ErrorBoundaryProps,
): React.ComponentType<P> {
    const Wrapped: React.ComponentType<P> = (props) => {
        return (
            <ErrorBoundary {...errorBoundaryProps}>
                <Component {...props} />
            </ErrorBoundary>
        );
    };

    // Format for display in DevTools
    const name = Component.displayName || Component.name || 'Unknown';
    Wrapped.displayName = `withErrorBoundary(${name})`;

    return Wrapped;
}

function useErrorHandler<P = Error>(
    givenError?: P | null | undefined,
): React.Dispatch<React.SetStateAction<P | null>> {
    const [error, setError] = React.useState<P | null>(null);
    if (givenError) {
        throw givenError;
    }
    if (error) {
        throw error;
    }
    return setError;
}

export { ErrorBoundary, withErrorBoundary, useErrorHandler };

// export type {
//     FallbackProps,
//     ErrorBoundaryPropsWithComponent,
//     ErrorBoundaryPropsWithRender,
//     ErrorBoundaryPropsWithFallback,
//     ErrorBoundaryPropsEmpty,
//     ErrorBoundaryProps,
// };
