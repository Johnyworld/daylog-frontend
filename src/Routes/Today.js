import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../Components/Loader';
import { TODAY_QUERY, ME } from '../Components/TodayQueries';
import { getLang } from '../Util/Languages';
import TimeBlocks from '../Components/TimeBlocks';
import { getNowBlock, getYyyymmdd } from '../Util/Convertors';
import WhatNow from '../Components/WhatNow';
import Icon from '../Components/Icon';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import DayComment from '../Components/DayComment';

const Container = styled.main`
    ${({ theme })=> theme.mainContainer };
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    height: 64px;
    width: 100%;
    border-top: 1px solid ${({ theme })=> theme.c_lightGray };
    background-color: white;
    z-index: 150;
    > * {
        width: 50%;
        &:not(:last-child) {
            border-right: 1px solid ${({ theme })=> theme.c_lightGray };
        }
    }
    a {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const blocksFoundation = ( now ) => {
    let blocks = [];
    for ( let i=0; i<96; i++ ) {
        let block = now-i;
        let isYesterday = false;
        if ( block < 0 ) {
            block += 96;
            isYesterday = true;
        } 
        blocks = [ { block, isYesterday }, ...blocks ];
    }
    return blocks;
}

const initBlocks = ( todayPosts, foundation, now ) => {
    const yesterday = new Date();
    yesterday.setDate( yesterday.getDate() -1 );
    const yyyymmddYesterday = getYyyymmdd( yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate() );

    todayPosts.forEach( post => {
        let startAt = post.startAt;
        if ( post.yyyymmdd === yyyymmddYesterday ) startAt -= 96;

        const num = 95 - ( now - startAt );
        foundation[num] = { ...foundation[num], ...post };

        if ( post.yyyymmdd === yyyymmddYesterday ) {
            foundation[num].postYesterday = true;
        } else {
            foundation[num].postYesterday = false;
        }

        for ( let i=1; i<post.blocks; i++ ) {
            if ( foundation[num+i] ) {
                foundation[num+i].id = foundation[num].id;
                foundation[num+i].doing = { color : post.doing.color };
            }
        }
    })
    return foundation;
}

export default () => {
    const { data, loading } = useQuery( TODAY_QUERY );
    const { data: meData, loading: meLoading } = useQuery(ME);
    const [ focused, setFocused ] = useState( 95 );
    const [ popupDayComment, setPopupDayComment ] = useState(false);
    
    if ( !loading && data && data.seeTodayPosts && meData && meData.me && !meLoading ) {
        const now = getNowBlock();
        const lang = getLang( meData.me.lang );

        let foundation = blocksFoundation(now);
        let blocks = initBlocks(data.seeTodayPosts, foundation, now);

        const focusedBlock = blocks[focused];
        const recent = blocks.slice().reverse().find(( post, index ) => post.blocks && index + focused >= 95 );
        const next = blocks.find(( post, index ) => post.blocks && index > focused );

        const onPopupDayComment = () => {
            setPopupDayComment(true);
        }

        const closePopup = () => {
            setPopupDayComment(false);
        }

        return (
            <Container>
                <TimeBlocks
                    blocks={blocks}
                    lang={lang}
                    focusedBlock={focusedBlock}
                    recent={recent}
                    setFocused={setFocused} 
                />
                <WhatNow
                    doings={meData.me.doings}
                    lang={lang}
                    focusedBlock={focusedBlock}
                    recent={recent}
                    now={now}
                    next={next}
                    className={ blocks[focused].doing ? "disabled" : "" } 
                />
                { popupDayComment && 
                    <DayComment
                        lang={lang}
                        closePopup={closePopup}
                        me={meData.me}
                    /> 
                }
                <Bottom>
                    <button onClick={onPopupDayComment} >
                        <Icon icon="bubble" size="medium" />
                    </button>
                    <Link to={`/doing`}>
                        <Icon icon="nut" size="medium" />
                    </Link>
                </Bottom>
            </Container>
        )
    } else return <Loader />

};