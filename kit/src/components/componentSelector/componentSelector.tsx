import React from 'react';
import CtaButton from '../ctaButton';
import TextWithHeader from '../textWithHeader';

export type componentData = {
    id?: string;
    type: string;
    data: any;
};

const ComponentSelector = (data: componentData) => {
    switch (data.type) {
        case 'textWithHeader':
            return React.createElement(TextWithHeader, {
                key: data.id,
                ...data,
            });
        case 'ctaButton':
            return React.createElement(CtaButton, { key: data.id, ...data });
        default:
            null;
    }
};

export default ComponentSelector;

/*
{
    "id":"2",
    "type":"textWithHeader",
    "data":{simple object for component control},
},
*/
