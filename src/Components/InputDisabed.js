import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'
import TextRegular from './TextRegular';
import Theme from '../Styles/Theme';

const Container = styled.div`
    display: grid;
    grid-template-columns: 2fr 5fr;
    grid-gap: 20px;
    align-items: center;
`;

const Label = styled(TextRegular)``;
const Field = styled(TextRegular)`
    display: block;
    padding: 10px 4px;
    ${({ theme })=> theme.inputUnderline };
`;

const InputDisabled = ({ className, label, field, lang }) => {
    const isFieldObject = typeof field === "object";
    return (
        <Container className={className}>
            <Label text={label} lang={lang} weight="bold" />
            { isFieldObject
                ? <Field text={field} lang={lang} color={Theme.c_gray} />
                : <Field string={field} lang={lang} color={Theme.c_gray} />
            }
        </Container>
    )
}

InputDisabled.propTypes = {
    className : PropTypes.string,
    label : PropTypes.object.isRequired,
    field : PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
    lang : PropTypes.string.isRequired,
}

export default InputDisabled;