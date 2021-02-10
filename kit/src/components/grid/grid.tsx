import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { componentData } from '../componentSelector';

const Grid: React.FunctionComponent<componentData> = () => {
    const [items] = React.useState([
        { name: 'TURQUOISE', code: '#1abc9c', type: 'button' },
        { name: 'EMERALD', code: '#2ecc71', type: 'text' },
        { name: 'PETER RIVER', code: '#3498db' },
        { name: 'AMETHYST', code: '#9b59b6' },
        { name: 'WET ASPHALT', code: '#34495e' },
        { name: 'GREEN SEA', code: '#16a085' },
        { name: 'NEPHRITIS', code: '#27ae60', type: 'button' },
        { name: 'BELIZE HOLE', code: '#2980b9' },
        { name: 'WISTERIA', code: '#8e44ad' },
        { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
        { name: 'SUN FLOWER', code: '#f1c40f' },
        { name: 'CARROT', code: '#e67e22' },
        { name: 'ALIZARIN', code: '#e74c3c', type: 'text' },
        { name: 'CLOUDS', code: '#ecf0f1' },
        { name: 'CONCRETE', code: '#95a5a6' },
        { name: 'ORANGE', code: '#f39c12' },
        { name: 'PUMPKIN', code: '#d35400' },
        { name: 'POMEGRANATE', code: '#c0392b' },
        { name: 'SILVER', code: '#bdc3c7' },
        { name: 'ASBESTOS', code: '#7f8c8d' },
    ]);

    const renderItem = ({ name, code, type }: any) => {
        switch (type) {
            case 'button':
                return (
                    <View
                        style={[
                            styles.itemContainer,
                            { backgroundColor: code },
                        ]}>
                        <Button title={name} onPress={() => {}} />
                    </View>
                );
            case 'text':
                return (
                    <View
                        style={[
                            styles.itemContainer,
                            { backgroundColor: code },
                        ]}>
                        <Text style={styles.itemName}>{name + code}</Text>
                    </View>
                );
            default:
                return (
                    <View
                        style={[
                            styles.itemContainer,
                            { backgroundColor: code },
                        ]}>
                        <Text style={styles.itemName}>{name}</Text>
                        <Text style={styles.itemCode}>{code}</Text>
                    </View>
                );
        }
    };

    return (
        <FlatGrid
            itemDimension={300}
            data={items}
            style={styles.gridView}
            // staticDimension={300}
            // fixed
            spacing={10}
            renderItem={({ item }) => renderItem(item)}
        />
    );
};

export default Grid;

const styles = StyleSheet.create({
    gridView: {
        marginTop: 10,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
});
