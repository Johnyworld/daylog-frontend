import React, { useEffect } from 'react';
import styled from 'styled-components';
import TimeBlock from './TimeBlock';
import { TODAY_QUERY } from '../Routes/Today';
import { EDIT_POST } from './SetScore';
import { useMutation } from 'react-apollo-hooks';
import { getCutTopStartAt, getCutTopEndAt, getCutTopType, getCutBottomEndAt } from '../Util/Util';
import { BreakPoint } from '../Styles/Theme';

const Container = styled.ul`
    margin-left: 35px;
    padding-bottom: 50vh;
    opacity: 0;
    transition: .3s;
    &.appear {
        opacity: 1;
    }
    @media screen and ( ${BreakPoint} ) {
        ${({ theme })=> theme.wrapper };
        margin-bottom: 30px;
        padding: 0 50px 40vh;
    }
`;

const TimeBlocks = ({ blocks, lang, focusedBlock, recent, setFocused, updateTodayPosts, yyyymmdd }) => {
    let timeblocks = React.createRef();

    const cutTopStartAt = getCutTopStartAt( focusedBlock, recent );
    const cutTopEndAt = getCutTopEndAt( focusedBlock, recent );
    const cutTopType = getCutTopType( focusedBlock, recent )
    const cutBottomEndAt = getCutBottomEndAt( focusedBlock, recent );

    const [ editLocationMutation ] = useMutation( EDIT_POST, {
        refetchQueries: [{ query: TODAY_QUERY, variables: { yyyymmdd }}]
    });

    const [ deletePostMutation ] = useMutation( EDIT_POST, { 
        refetchQueries: [{ query: TODAY_QUERY, variables: { yyyymmdd }}]
    })

    const [ cutTopMutation ] = useMutation( EDIT_POST, {
        variables: { yyyymmdd },
        refetchQueries: [{ query: TODAY_QUERY, variables: { yyyymmdd }}]
    })

    const [ cutBottomMutation ] = useMutation( EDIT_POST, { 
        refetchQueries: [{ query: TODAY_QUERY, variables: { yyyymmdd }}]
    })

    const editLocation = (id, location) => {
        editLocationMutation({
            variables: { 
                id,
                location,
                type: "location"
            },
        });
        updateTodayPosts({
            id,
            location
        });
    }

    const deletePost = (id) => {
        deletePostMutation({ variables : { 
            id,
            type: "delete"
        }});
        updateTodayPosts({
            id,
            deletePost: true
        });
    }

    const onClickCutTop = (id) => {
        cutTopMutation({ variables : { 
            id,
            startAt: cutTopStartAt,
            endAt: cutTopEndAt,
            type: cutTopType
        }});
        updateTodayPosts({
            id,
            startAt: cutTopStartAt,
            endAt: cutTopEndAt,
            type: cutTopType
        });
    }

    const onClickCutBottom = (id) => {
        cutBottomMutation({ variables : { 
            id,
            endAt: cutBottomEndAt,
            type: "endAt"
        }});
        updateTodayPosts({
            id,
            endAt: cutBottomEndAt
        });
    }

    useEffect(()=> {
        window.scrollTo( 0, document.body.clientHeight );
        timeblocks.current.classList.add('appear');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <Container ref={timeblocks}>
            { blocks.map((block, index) => {
                return (
                    <TimeBlock
                        key={block.block}
                        id={block.id}
                        index={index}
                        block={block.block}
                        doing={block.doing && block.doing.name}
                        color={block.doing && block.doing.color}
                        icon={block.doing && block.doing.icon}
                        score={block.score}
                        location={block.location}
                        blocks={block.blocks}
                        isCreating={block.isCreating}
                        likesCount={block.likesCount}
                        commentsCount={block.commentsCount}
                        lang={lang}
                        setFocused={setFocused}
                        className={index === blocks.length-1 ? "selected first last" : ""}
                        selection={block.selection}
                        editLocation={editLocation}
                        deletePost={deletePost}
                        onClickCutTop={onClickCutTop}
                        onClickCutBottom={onClickCutBottom}
                    />
                )
            })}
        </Container>
    )
}

export default TimeBlocks;
