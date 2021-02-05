import { useLinkTo } from '@react-navigation/native';
import React from 'react';
import {
    Button,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';

declare const global: { HermesInternal: null | {} };

const Home = () => {
    const linkTo = useLinkTo();
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
                {global.HermesInternal == null ? null : (
                    <View style={styles.engine}>
                        <Text style={styles.footer}>Engine: Hermes</Text>
                    </View>
                )}
                <View style={styles.body}>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Step One</Text>
                        <Text style={styles.sectionDescription}>
                            Edit <Text style={styles.highlight}>home.tsx</Text>{' '}
                            to change this screen and then come back to see your
                            edits.
                        </Text>
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>
                            See Your Changes
                        </Text>
                        <Text style={styles.sectionDescription}>
                            home Hello world changes testing!
                        </Text>
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Debug</Text>
                        <Text style={styles.sectionDescription}>
                            home Hello world debug testing!
                        </Text>
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Learn More</Text>
                        <Text style={styles.sectionDescription}>
                            home Read the docs to discover what to do next:
                        </Text>
                    </View>
                    <View style={styles.sectionContainer}>
                        <Button
                            title="Go to Generic"
                            onPress={() => linkTo('/generic')}
                        />
                    </View>
                    <View style={styles.sectionContainer}>
                        <Button
                            title="Go to Kaboom"
                            onPress={() => linkTo('/kaboom')}
                        />
                    </View>
                </View>
            </ScrollView>
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
        margin: 16,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        marginLeft: 8,
        marginRight: 8,
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

export default Home;
