import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { componentData } from '../componentSelector';

interface textWithHeaderData {
    id?: string;
    title?: string;
    text1?: string;
    highlight?: string;
    text2?: string;
}
const TextWithHeader: React.FunctionComponent<componentData> = ({ data }) => {
    const internalData = data as textWithHeaderData;
    if (internalData.id === null) {
        return null;
    }
    return (
        <View style={styles.sectionContainer}>
            {internalData.title && (
                <Text style={styles.sectionTitle}>{internalData.title}</Text>
            )}
            <Text style={styles.sectionDescription}>
                {internalData.text1}{' '}
                {internalData.highlight && (
                    <Text style={styles.highlight}>
                        {internalData.highlight}
                    </Text>
                )}{' '}
                {internalData.text2}
            </Text>
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
export default TextWithHeader;

/*
{
    "id":"2",
    "type":"textWithHeader",
    "data":{
        "id":"2id",
        "title":"title text optional",
        "text1":"text before highlight optional",
        "highlight":"highlight text optional",
        "text2":"text after highlight optional",
    },
},
*/
