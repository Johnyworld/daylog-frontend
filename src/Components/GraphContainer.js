import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Graph from './Graph';
import GraphList from './GraphList';
import TextRegular from './TextRegular';
import Words from '../Lang/Words.json';
import Theme from '../Styles/Theme';
import { getLangArray } from '../Util/Languages';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const GraphWrap = styled.div`
    position: relative;
    width: 35%;
`;

const Lists = styled.ul`
    min-width: 60%;
`;

const GraphContainer = ({ data, colors, lang }) => {
    const [ unit, setUnit ] = useState('percent');
    
    useEffect(()=> {
        if ( unit === 'percent' ) {
            const showTheTime = setTimeout(()=> { setUnit( 'time' ); }, 5000);
            return () => { clearTimeout(showTheTime); }

        } else if ( unit === 'time' ) {
            const showPercent = setTimeout(()=> { setUnit( 'percent' ); }, 5000);
            return () => { clearTimeout(showPercent); }
        }
    });

    const toggleUnit = () => {
        if ( unit === 'percent' ) {
            setUnit( 'time' );
        } else if ( unit === 'time' ) {
            setUnit( 'percent' );
        }
    }

    return (
        <Container>
            { !data[0] && <TextRegular text={Words.noData} color={Theme.c_gray} lang={lang} /> }
            { data[0] && 
                <>
                    <GraphWrap>
                        <Graph data={data} colors={colors} />
                    </GraphWrap>
                    <Lists onClick={toggleUnit}>
                        { data.map((doing, key) => (
                            <GraphList
                                key={`${key}_${doing.name}`}
                                index={key}
                                name={doing.name}
                                blocks={doing.blocks}
                                percent={doing.percent}
                                postsCount={doing.postsCount}
                                colors={colors}
                                unit={unit}
                                lang={lang}
                            />
                        ))}
                    </Lists>
                </>
            }
        </Container>
    )   
}

GraphContainer.propTypes = {
    data: PropTypes.array.isRequired,
    colors: PropTypes.array.isRequired,
    lang: PropTypes.oneOf(getLangArray())
}

export default GraphContainer;