import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../Components/Loader';
import { TODAY_QUERY, ME } from '../Components/TodayQueries';
import { getLang } from '../Util/Languages';
import TimeBlocks from '../Components/TimeBlocks';
import { getNowBlock, getYesterday, getToday } from '../Util/Convertors';
import WhatNow from '../Components/WhatNow';
import Icon from '../Components/Icon';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import DayComment from '../Components/DayComment';
import { BreakPoint } from '../Styles/Theme';

const Container = styled.main`
    ${({ theme })=> theme.mainContainer };
`;

const QuickAdd = styled(WhatNow)`
    @media screen and ( ${BreakPoint} ) {
        margin-bottom: 10px;
        border-radius: 10px;
        border: 1px solid ${({ theme })=> theme.c_lightGray };
    }
`

const Bottom = styled.div`
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 1000;
`;

const Buttons = styled.div`
    ${({ theme })=> theme.wrapper };
    display: flex;
    justify-content: space-between;
    position: relative;
    height: 64px;
    background-color: ${({ theme })=> theme.c_blueDarker1 };
    > * {
        width: 50%;
        &:not(:last-child) {
            border-right: 1px solid ${({ theme })=> theme.c_blueDarker2 };
        }
    }
    a {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    @media screen and ( ${BreakPoint} ) {
        border-radius: 10px 10px 0 0;
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
        blocks = [ { block, isYesterday, selection:[] }, ...blocks ];
    }
    return blocks;
}

const getIsYesterday = ( yymd, yesterday ) => {
    if ( yymd === yesterday ) {
        return true;
    } else {
        return false;
    }
}

const initPostsToBlocks = ({ todayPosts, yesterday, now, foundation }) => {
    todayPosts.forEach(post => {
        let startAt = post.startAt;
        if ( post.yyyymmdd === yesterday ) startAt -= 96;
        const num = 95 - ( now - startAt );

        foundation[num] = { ...foundation[num], ...post };
        foundation[num].postYesterday = getIsYesterday( post.yyyymmdd, yesterday );
        
        for ( let i=1; i<post.blocks; i++ ) {
            if ( foundation[num+i] ) {
                foundation[num+i].id = foundation[num].id;
                foundation[num+i].doing = { color : post.doing.color };
            }
        }
    })
}

const initSelection = ({ foundation, focused }) => {
    foundation[focused].selection = [ ...foundation[focused].selection, "focused" ]

    if ( foundation[focused].id ) {
        let first = true;
        let last = null;

        foundation.forEach((item, index) => {
            if ( item.id === foundation[focused].id ) {
                if ( first ) {
                    item.selection = [ ...item.selection, "first" ];
                    first = false;
                }
                item.selection = [ ...item.selection, "selected" ];
                last = index;
            }
        });
        if ( last ) foundation[last].selection = [ ...foundation[last].selection, "last" ];
    } else {
        foundation[focused].selection = [ "focused", "selected", "first", "last" ];
    }
}

const initBlocks = ( todayPosts, foundation, now, focused ) => {
    const today = getToday();
    const yesterday = getYesterday( today );

    initPostsToBlocks({ todayPosts, yesterday, now, foundation }) 
    initSelection({ foundation, focused });
    
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
        let blocks = initBlocks(data.seeTodayPosts, foundation, now, focused);

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
                <Bottom>
                    <QuickAdd
                        pins={meData.me.pins}
                        lang={lang}
                        focusedBlock={focusedBlock}
                        recent={recent}
                        now={now}
                        next={next}
                        className={ blocks[focused].doing ? "disabled" : "" } 
                    />
                    <Buttons>
                        <button onClick={onPopupDayComment} >
                            <Icon icon="bubble" size="medium" color="white" />
                        </button>
                        <Link to={`/doing`}>
                            <Icon icon="nut" size="medium" color="white" />
                        </Link>
                    </Buttons>
                </Bottom>
                { popupDayComment && 
                    <DayComment
                        lang={lang}
                        closePopup={closePopup}
                        me={meData.me}
                    /> 
                }
            </Container>
        )
    } else return <Loader />

};