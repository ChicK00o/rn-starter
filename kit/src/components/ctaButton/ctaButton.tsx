import { useLinkTo } from '@react-navigation/native';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { componentData } from '../componentSelector';

interface buttonAction {
    type: string;
    data: string;
}

interface ctaButtonData {
    id?: string;
    title: string;
    action: buttonAction;
}

const CtaButton: React.FunctionComponent<componentData> = ({ data }) => {
    const internalData = data as ctaButtonData;
    const linkTo = useLinkTo();
    if (internalData.id === null) {
        return null;
    }
    var action: () => void = () => {};
    if (internalData.action.type === 'linkTo') {
        action = () => linkTo(internalData.action.data);
    }
    return (
        <View style={styles.sectionContainer}>
            <Button title={internalData.title} onPress={action} />
        </View>
    );
};

const styles = StyleSheet.create({
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
});
export default CtaButton;

/*
{
    "id":"1",
    "type":"ctaButton",
    "data":{
        "id":"1id",
        "title":"button",
        "action": {
            "type":"linkTo",
            "data":"/setting",
        },
    },
},
*/
