import { useRoute } from '@react-navigation/native';
import React from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StatusBar,
    View,
} from 'react-native';
import { useAsyncResource } from 'use-async-resource';
import ComponentSelector, {
    componentData,
} from '../../components/componentSelector';

interface pageResponse {
    name: string;
    components: componentData[];
}

const fetchData = (route: string) =>
    fetch('http://192.168.1.18:8083/' + route).then((res) => res.json());

const RestRendering = () => {
    const routeName = useRoute();
    const [data] = useAsyncResource<pageResponse, [string]>(
        fetchData,
        routeName.name,
    );
    return (
        <>
            {data().components.map((component) => {
                return ComponentSelector(component);
            })}
        </>
    );
};

const Generic = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                    <View>
                        <React.Suspense
                            fallback={<ActivityIndicator size="large" />}>
                            <RestRendering />
                        </React.Suspense>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default Generic;
