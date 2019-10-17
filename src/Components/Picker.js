import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TextRegular from './TextRegular';
import IconImage from './IconImage';
import IconButton from './IconButton';
import Words from '../Lang/Words.json';
import { getLangArray } from '../Util/Languages';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
`;

const Column = styled.div`
    display: flex;
    align-items: center;
    button {
        margin-left: 15px;
        padding-left: 15px;
        box-sizing: content-box;
        border-left: 1px solid ${({ theme })=> theme.c_lightGray };
    }
`;

const Palette = styled.div`
    background: ${({ color })=> color };
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 2px;
`;

const Picker = ({ className, onClick, type, icon, color, lang }) => {
    return (
        <Container className={className} >
            <TextRegular text={ type === "icon" ? Words.icon : Words.color } lang={lang} weight="bold" />
            <Column>
                { type === "icon" 
                    ? <IconImage url={icon} size="medium" />
                    : <Palette color={color} />
                }
                <IconButton icon="pencel" size="medium" onClick={onClick.bind(this, type)} />
            </Column>
        </Container>
    )
}

Picker.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.oneOf([ 'icon', 'color' ]).isRequired,
    icon: PropTypes.string,
    color: PropTypes.string,
    lang: PropTypes.oneOf( getLangArray() ).isRequired,
}

export default Picker;