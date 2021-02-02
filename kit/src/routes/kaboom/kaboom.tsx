import { useLinkTo } from '@react-navigation/native';
import React from 'react';
import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';

declare const global: { HermesInternal: null | {} };

const val = true;

function Bomb() {
    if (val) {
        throw new Error('💥 CABOOM 💥');
    }
    return null;
}

const Kaboom = () => {
    const [explode, setExplode] = React.useState(false);
    const linkTo = useLinkTo();
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
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
                                Edit{' '}
                                <Text style={styles.highlight}>kaboom.tsx</Text>{' '}
                                to change this screen and then come back to see
                                your edits.
                            </Text>
                        </View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>
                                See Your Changes
                            </Text>
                            <Text style={styles.sectionDescription}>
                                kaboom Hello world changes testing!
                            </Text>
                        </View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Debug</Text>
                            <Text style={styles.sectionDescription}>
                                kaboom Hello world debug testing!
                            </Text>
                        </View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Learn More</Text>
                            <Text style={styles.sectionDescription}>
                                kaboom Read the docs to discover what to do
                                next:
                            </Text>
                        </View>
                    </View>
                    <Button
                        title="Go to Setting"
                        onPress={() => linkTo('/setting')}
                    />
                    <Button
                        title="Go to Home"
                        onPress={() => linkTo('/home')}
                    />
                    {explode ? <Bomb /> : null}
                    <Button title="Explode" onPress={() => setExplode(true)} />
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

export default Kaboom;
