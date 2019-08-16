import React from 'react';
import { Row } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import classnames from 'classnames';

import HorizontalCenter from './HorizontalCenter';

import { S3_BUCKET_IMAGE_URL } from '../constants';

const LocationCard = ({
    color,
    icon,
    dataTip,
    children,
    className,
    isCard,
    style,
    toggleCard,
    index
}) => {
    const locationIcon = S3_BUCKET_IMAGE_URL + 'images/Location.svg';
    const centerIcon = `${S3_BUCKET_IMAGE_URL}images/${icon}.svg`;

    const render = isCard ? (
        <HorizontalCenter
            style={{ ...styles.speech, ...style }}
            className='VenueSpeech'
        >
            <Row
                className={classnames(
                    'align-items-center bg-white shadow rounded w-100 speech',
                    className
                )}
            >
                <div style={styles.card} onClick={() => toggleCard(-2)}>
                    X
                </div>
                {children}
            </Row>
        </HorizontalCenter>
    ) : (
        <div onClick={() => toggleCard(index)}>
            <div
                data-tip={dataTip}
                data-event='mouseover'
                data-event-off='click'
                style={{
                    backgroundImage: `url(${locationIcon})`,
                    ...styles.locationIcon
                }}
                className={`filter-${color}`}
            />
            {icon && (
                <img
                    style={styles.centerIcon}
                    className='pr-1'
                    src={centerIcon}
                />
            )}
        </div>
    );

    return (
        <div>
            {render}
                <ReactTooltip
                    place='right'
                    type='light'
                    effect='solid'
                    border={true}
                    globalEventOff='click'
                />
        </div>
    );
};

const styles = {
    speech: {
        width: '15rem',
        height: '7rem',
        transform: 'translate(-50%, -110%)',
        zIndex: '100',
        position: 'absolute'
    },
    card: {
        position: 'absolute',
        top: 0,
        right: 0,
        cursor: 'pointer',
        padding: '10px',
        zIndex: '101'
    },
    image: {
        backgroundSize: 'cover',
        height: '4rem',
        width: '5rem'
    },
    locationIcon: {
        transform: 'translate(-50%, -100%)',
        width: '40px',
        height: '40px',
        zIndex: '1',
        cursor: 'pointer',
        position: 'absolute'
    },
    centerIcon: {
        position: 'absolute',
        zIndex: '2',
        top: '-40px',
        left: '-11px',
        width: '25px',
        height: '25px',
        textAlign: 'center'
    }
};

export default LocationCard;
