import { useLinkTo } from '@react-navigation/native';
import React from 'react';
import {
    ActivityIndicator,
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useAsyncResource } from 'use-async-resource';

interface dataResponse {
    id: number;
    message: string;
}

const fetchData = () =>
    fetch(`http://192.168.0.147:8083/delay`).then((res) => res.json());

const RestRendering = () => {
    const linkTo = useLinkTo();
    const [data] = useAsyncResource<dataResponse>(fetchData, []);
    return (
        <>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Step One</Text>
                <Text style={styles.sectionDescription}>
                    Edit <Text style={styles.highlight}>setting.tsx</Text> to
                    change this screen and then come back to see your edits.
                </Text>
            </View>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>See Your Changes</Text>
                <Text style={styles.sectionDescription}>
                    setting Hello world changes testing!
                </Text>
            </View>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Debug</Text>
                <Text style={styles.sectionDescription}>
                    setting Hello world debug testing!
                </Text>
            </View>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Learn More</Text>
                <Text style={styles.sectionDescription}>
                    setting Read the docs to discover what to do next:
                </Text>
            </View>
            <Button title="Go to Home" onPress={() => linkTo('/home')} />
            <Text> {data().id} </Text>
            <Text> {data().message} </Text>
            <Button title="Go to Kaboom" onPress={() => linkTo('/kaboom')} />
        </>
    );
};

const Setting = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <View style={styles.body}>
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

const styles = StyleSheet.create({
    scrollView: {},
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {},
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

export default Setting;
