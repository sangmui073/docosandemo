import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import * as React from 'react';

interface FontAwesomeProps {
    props?: FontAwesomeIconProps
}

export function Icon({ props }: FontAwesomeProps) {
    return (
        <>
            <FontAwesomeIcon  {...props} icon={props?.icon as IconProp} />
        </>
    );
}
