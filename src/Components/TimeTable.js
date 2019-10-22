import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Clock from './Clock';
import { getYesterday, timePresenter } from '../Util/Convertors';
import TextRegular from './TextRegular';
import Theme, { BreakPoint } from '../Styles/Theme';
import Words from '../Lang/Words.json'
import TextSmall from './TextSmall';
import { getLangArray } from '../Util/Languages';

const Container = styled.section`
    margin-top: 20px;
`;

const Content = styled.div`
    ${({ theme })=> theme.miniFeedBox };
    padding-bottom: 30px;
`;

const Title = styled(TextRegular)`
    ${({ theme })=> theme.miniFeedTitle }
`;

const TimeGraphic = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Column = styled.div`
    width: 45%;
    @media screen and ( ${BreakPoint} ) {
        padding: 30px; 
    }
`;

const Remark = styled(TextRegular)`
    display: block;
    text-align: center;
    margin-bottom: 10px;
`

const TimeList = styled.ul`
    margin-top: 30px;
`;

const ListItem = styled.li`
    display: flex;
    margin-top: 10px;
    align-items: center;
`;

const Color = styled.div`
    width: 4px;
    height: 16px;
    margin: 0 10px;
    background-color: ${({ color })=> color };
`;

const getAm = ( posts, yyyymmdd ) => {
    const yesterday = getYesterday(yyyymmdd);
    return posts.filter( post => {
        if ( post.yyyymmdd !== yesterday && post.startAt < 48 ) return true;
        if ( post.yyyymmdd === yesterday && post.endAt > 96 ) return true;
        else return false;
    })
    .map( post => {
        if ( post.yyyymmdd === yesterday && post.endAt > 96 ) {
            return {
                name: post.doing.name,
                color: post.doing.color,
                startAt: 0,
                endAt: post.endAt - 96
            }; 
        }

        if ( post.yyyymmdd !== yesterday && post.startAt < 48 ) {
            let endAt = post.endAt;
            if ( endAt > 48 ) endAt = 48;
            return {
                name: post.doing.name,
                color: post.doing.color,
                startAt: post.startAt < 0 ? 0 : post.startAt,
                endAt: endAt
            };
        } else return null;
    })
}

const getPm = ( posts, yyyymmdd ) => {
    const yesterday = getYesterday(yyyymmdd);
    return posts
        .filter( post => post.yyyymmdd !== yesterday && post.endAt > 48 )
        .map( post => {
        if ( post.startAt < 48 && post.endAt > 48 ) {
            return {
                name: post.doing.name,
                color: post.doing.color,
                startAt: 0,
                endAt: post.endAt - 48
            }; 
        }

        else if ( post.startAt >= 48 ) {
            let endAt = post.endAt;
            if ( endAt > 96 ) endAt = 96;
            return {
                name: post.doing.name,
                color: post.doing.color,
                startAt: post.startAt - 48,
                endAt: endAt - 48
            };
        }
        else return null;
    });
}

const TimeTable = ({ posts, yyyymmdd, lang }) => {
    const AM = getAm( posts, yyyymmdd );
    const PM = getPm( posts, yyyymmdd );

    return (
        <Container>
            <Title text={Words.timeTable} lang={lang} color={Theme.c_gray} />
            <Content>
                <TimeGraphic>
                    <Column>
                        <Remark string="AM" />
                        <Clock data={AM} type='am' />
                    </Column>
                    <Column>
                        <Remark string="PM" />
                        <Clock data={PM} type='pm' />
                    </Column>
                </TimeGraphic>
                <TimeList>
                    { posts.map( item => {
                        const isToday = item.yyyymmdd === yyyymmdd;
                        const isOverFromYesterday = item.yyyymmdd !== yyyymmdd && item.endAt > 96;
                        return (
                            isToday || isOverFromYesterday ?
                            <ListItem key={item.id} >
                                <TextSmall string={ timePresenter( item.startAt, item.endAt ) }/>
                                <Color color={item.doing.color} />
                                <TextRegular string={item.doing.name} />
                            </ListItem> : null
                        )
                    })}
                </TimeList>
            </Content>
        </Container>
    )
}

TimeTable.propTypes = {
    posts: PropTypes.array.isRequired,
    yyyymmdd: PropTypes.string.isRequired,
    lang: PropTypes.oneOf( getLangArray() ).isRequired
}

export default TimeTable;