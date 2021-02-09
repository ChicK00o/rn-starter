import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { Column as Col, Grid, Row } from 'react-native-responsive-grid';
import { componentData } from '../componentSelector';

const data = [...new Array(12).keys()];

// column width (relative to screen size)
const sizes = { sm: 100, md: 50, lg: 33.333, xl: 25 };

let els: any = {};

const hide = (id: any) => {
    els[id].hide();
};

const showAll = (_: any) => {
    Object.keys(els).forEach((id) => {
        els[id].show();
    });
};

const Item = (props: any) => {
    return (
        <Col
            ref={(col) => (props.els[props.id] = col)}
            smSize={sizes.sm}
            mdSize={sizes.md}
            lgSize={sizes.lg}
            xlSize={sizes.xl}
            style={{ backgroundColor: colors[props.id] }}>
            <Row
                smSizePoints={
                    props.state.layout.grid
                        ? props.state.layout.grid.height / 2
                        : 0
                }
                mdSizePoints={
                    props.state.layout.grid
                        ? props.state.layout.grid.width / 2
                        : 0
                }
                lgSizePoints={
                    props.state.layout.grid
                        ? props.state.layout.grid.width / 3
                        : 0
                }
                xlSizePoints={
                    props.state.layout.grid
                        ? props.state.layout.grid.width / 4
                        : 0
                }
                alignLines="stretch">
                <Col fullWidth>
                    <Row rtl>
                        <Col fullWidth offsetPoints={10}>
                            <TouchableOpacity
                                onPress={() => {
                                    props.hide(props.id);
                                }}>
                                <Text style={{ fontSize: 22, marginTop: 15 }}>
                                    X
                                </Text>
                            </TouchableOpacity>
                        </Col>
                    </Row>
                </Col>
                <Col fullWidth hAlign="center">
                    <Text style={{ fontSize: 48, marginTop: 5 }}>
                        {props.id}
                    </Text>
                </Col>
            </Row>
        </Col>
    );
};

const layout = (state: any) => {
    return data.map((i) => {
        return [<Item key={i} id={i} els={els} hide={hide} state={state} />];
    });
};

const IGrid: React.FunctionComponent<componentData> = () => (
    <Grid>
        {({ state, _ }: any) => {
            console.log(state);
            return (
                <Col fullWidth={true} style={{ backgroundColor: 'lightgray' }}>
                    <ScrollView removeClippedSubviews={true}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={(e) => showAll(e)}>
                            <Row>{layout(state)}</Row>
                        </TouchableOpacity>
                    </ScrollView>
                </Col>
            );
        }}
    </Grid>
);

export default IGrid;

const colors = [
    'lightyellow',
    'lightsalmon',
    'lightseagreen',
    'lightskyblue',
    'pink',
    'orange',
    'yellow',
    'lime',
    'lightgreen',
    'purple',
    'magenta',
    'gold',
];
