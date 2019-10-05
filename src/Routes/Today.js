import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../Components/Loader';
import { TODAY_QUERY, ME } from '../Router';
import { getLang } from '../Util/Languages';
import TimeBlock from '../Components/TimeBlock';
import { getNowBlock, getYyyymmdd } from '../Util/Convertors';

const Container = styled.main`
    ${({ theme })=> theme.mainContainer };
    overflow-y: scroll;
`;

const TimeBlocks = styled.ul`
    margin-left: 35px;
    padding-top: 20vh;
`;

export default () => {
    const { data, loading } = useQuery( TODAY_QUERY );
    const { data: meData, loading: meLoading } = useQuery(ME);

    if ( !loading && data && data.seeTodayPosts && meData && meData.me && !meLoading ) {
        const now = getNowBlock();

        const yesterday = new Date();
        yesterday.setDate( yesterday.getDate() -1 );
        const yyyymmddYesterday = getYyyymmdd( yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate() );
        
        let blocks = []
        for ( let i=0; i<96; i++ ) {
            let block = now-i;
            let isYesterday = false;
            if ( block < 0 ) {
                block += 96;
                isYesterday = true;
            } 
            blocks = [ ...blocks, { block, isYesterday } ];
        }

        data.seeTodayPosts.forEach( post => {
            let endAt = post.endAt;
            if ( post.yyyymmdd === yyyymmddYesterday ) endAt -= 96;

            const num = 0 + ( now - endAt );
            blocks[num] = { ...blocks[num], ...post };
            for ( let i=1; i<post.blocks; i++ ) {
                blocks[num+i].doing = { color : post.doing.color }; 
            }
        })

        // data.seeTodayPosts.forEach( post => {
        //     let startAt = post.startAt;
        //     if ( post.yyyymmdd === yyyymmddYesterday ) startAt -= 96;

        //     const num = 95 - ( now - startAt );
        //     blocks[num] = { ...blocks[num], ...post };
        //     for ( let i=1; i<post.blocks; i++ ) {
        //         blocks[num+i].doing = { color : post.doing.color }; 
        //     }
        // })

        const lang = getLang( meData.me.lang );
        console.log(blocks);
        // window.scrollTo( 0, document.body.clientHeight );
        
        return (
            <Container>
                <TimeBlocks>
                    { blocks.map((block, key) => {
                        return (
                            <TimeBlock 
                                key={block.block} 
                                block={block.block}
                                doing={block.doing ? block.doing.name : null}
                                color={block.doing ? block.doing.color : null}
                                score={block.score}
                                blocks={block.blocks}
                                isLiked={block.isLiked}
                                likesCount={block.likesCount}
                                postsCount={block.postsCount}
                                lang={lang}
                            />
                        )
                    })}
                </TimeBlocks>
            </Container>
        ) 
    } else return <Loader />

};