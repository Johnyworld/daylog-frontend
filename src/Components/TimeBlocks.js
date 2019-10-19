import React, { useEffect } from 'react';
import styled from 'styled-components';
import TimeBlock from './TimeBlock';
import { TODAY_QUERY } from './TodayQueries';
import { EDIT_POST } from './SetScore';
import { useMutation } from 'react-apollo-hooks';
import { getCutTopStartAt, getCutTopEndAt, getCutTopType, getCutBottomEndAt } from '../Util/Util';

const Container = styled.ul`
    margin-left: 35px;
    padding-bottom: 40vh;
    opacity: 0;
    transition: .3s;
    &.appear {
        opacity: 1;
    }
    @media screen and ( min-width: 768px ) {
        ${({ theme })=> theme.wrapper };
        margin-bottom: 30px;
        padding-left: 50px;
        padding-right: 50px;
    }
`;

const TimeBlocks = ({ blocks, lang, focusedBlock, recent, setFocused }) => {
    let timeblocks = React.createRef();

    const cutTopStartAt = getCutTopStartAt( focusedBlock, recent );
    const cutTopEndAt = getCutTopEndAt( focusedBlock, recent );
    const cutTopType = getCutTopType( focusedBlock, recent )
    const cutBottomEndAt = getCutBottomEndAt( focusedBlock, recent );

    const [ deletePostMutation ] = useMutation( EDIT_POST, { 
        refetchQueries: [{ query: TODAY_QUERY }]
    })

    const [ cutTopMutation ] = useMutation( EDIT_POST, { 
        refetchQueries: [{ query: TODAY_QUERY }]
    })

    const [ cutBottomMutation ] = useMutation( EDIT_POST, { 
        refetchQueries: [{ query: TODAY_QUERY }]
    })

    const deletePost = (id) => {
        deletePostMutation({ variables : { 
            id,
            type: "delete"
        }});
    }

    const onClickCutTop = (id) => {
        cutTopMutation({ variables : { 
            id,
            startAt: cutTopStartAt,
            endAt: cutTopEndAt,
            type: cutTopType
        }});
    }

    const onClickCutBottom = (id) => {
        cutBottomMutation({ variables : { 
            id,
            endAt: cutBottomEndAt,
            type: "endAt"
        }});
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
                        doing={block.doing ? block.doing.name : null}
                        color={block.doing ? block.doing.color : null}
                        score={block.score}
                        location={block.location}
                        blocks={block.blocks}
                        likesCount={block.likesCount}
                        commentsCount={block.commentsCount}
                        lang={lang}
                        setFocused={setFocused}
                        className={index === blocks.length-1 ? "selected first last" : ""}
                        selection={block.selection}
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
