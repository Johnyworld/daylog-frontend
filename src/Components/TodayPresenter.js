import React, { useState } from 'react';
import styled from 'styled-components';
import { getLang } from '../Util/Languages';
import { getToday, getYesterday, getNowBlock } from '../Util/Convertors';
import QuickAdd from './QuickAdd';
import { BreakPoint } from '../Styles/Theme';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import TextRegular from './TextRegular';
import TimeBlocks from './TimeBlocks';
import Icon from './Icon';
import Words from '../Lang/Words.json';
import DayComment from './DayComment';

const Container = styled.main`
    ${({ theme })=> theme.mainContainer };
`;

const QuickAddStyled = styled(QuickAdd)`
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
    border-top: 1px solid white;
    background-color: ${({ theme })=> theme.c_blueDarker1 };
    @media screen and ( ${BreakPoint} ) {
        border-radius: 10px 10px 0 0;
    }
`;

const ButtonItem = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    border-right: 1px solid ${({ theme })=> theme.c_blueDarker2 };
`;

const LinkItem = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
`;

const ButtonText = styled(TextRegular)`
    display: none;
    @media screen and ( ${BreakPoint} ) {
        display: inline-block;
        margin-left: 10px;
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

export default ({ data, meData, focused, setFocused }) => {
    const [ todayPosts, setTodayPosts ] = useState( data.seeTodayPosts );
    const [ popupDayComment, setPopupDayComment ] = useState(false);

    const now = getNowBlock();
    const lang = getLang( meData.me.lang );

    let foundation = blocksFoundation(now);
    let blocks = initBlocks(todayPosts, foundation, now, focused);

    const focusedBlock = blocks[focused];
    const recent = blocks.slice().reverse().find(( post, index ) => post.blocks && index + focused >= 95 );
    const next = blocks.find(( post, index ) => post.blocks && index > focused );

    const updateTodayPosts = ({ id, startAt, endAt, create, newId, location, deletePost, type }) => {
        const posts = todayPosts.slice();   

        if ( create ) {
            const newPost = {
                id: create.id,
                doing: { 
                    id: create.doingId,
                    name: create.name,
                    icon: create.icon,
                    color: create.color
                },
                location: create.location,
                startAt: create.startAt,
                endAt: create.endAt,
                blocks: 1,
                yyyymmdd: create.yyyymmdd,
                isCreating: true
            }
            setTodayPosts([ ...posts, newPost ]);
        } 

        else if ( deletePost ) {
            setTodayPosts( posts.filter( post => post.id !== id ));
        }

        else {
            const target = posts.find( post => post.id === id );
            if ( type === "stEnYymd_YesterToToday" ) {
                target.yyyymmdd = getToday();
                target.startAt = startAt;
                target.endAt = endAt;
                target.blocks = target.endAt - startAt;
                target.location = location && location;

            } else if ( type === "pullToYesterday" ) {
                target.yyyymmdd = getYesterday();
                target.startAt = startAt;
                target.endAt = endAt;
                target.blocks = target.endAt - startAt; 
                target.location = location && location;

            } else {
                if (startAt) { 
                    target.startAt = startAt;
                    target.blocks = target.endAt - startAt;
                };
                if (newId) { 
                    target.id = newId;
                    target.isCreating = false;
                };
                if (endAt) {
                    target.endAt = endAt;
                    target.blocks = endAt - target.startAt;
                };
                if (location) {
                    target.location = location;
                }; 
            }
            setTodayPosts(posts);
        }
        
    }

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
                updateTodayPosts={updateTodayPosts}
            />
            <Bottom>
                <QuickAddStyled
                    pins={meData.me.pins}
                    lang={lang}
                    focusedBlock={focusedBlock}
                    recent={recent}
                    now={now}
                    next={next}
                    updateTodayPosts={updateTodayPosts}
                    className={ focusedBlock.doing ? "disabled" : "" } 
                />
                <Buttons>
                    <ButtonItem onClick={onPopupDayComment} >
                        <Icon icon="bubble" size="medium" color="white" />
                        <ButtonText text={Words.dayComments} lang={lang} color="white" />
                    </ButtonItem>
                    <LinkItem to={`/doing`}>
                        <Icon icon="nut" size="medium" color="white" />
                        <ButtonText text={Words.doingList} lang={lang} color="white" />
                    </LinkItem>
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
}