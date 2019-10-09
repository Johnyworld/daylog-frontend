import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../Components/Loader';
import { TODAY_QUERY, ME } from '../Router';
import { getLang } from '../Util/Languages';
import TimeBlocks from '../Components/TimeBlocks';
import { getNowBlock, getYyyymmdd } from '../Util/Convertors';
import WhatNow from '../Components/WhatNow';

const Container = styled.main`
    ${({ theme })=> theme.mainContainer };
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
    
    if ( !loading && data && data.seeTodayPosts && meData && meData.me && !meLoading ) {
        const now = getNowBlock();
        let foundation = blocksFoundation(now);
        let blocks = initBlocks(data.seeTodayPosts, foundation, now);

        const recent = blocks.slice().reverse().find(( post, index ) => post.blocks && index + focused >= 95 );
        const next = blocks.find(( post, index ) => post.blocks && index > focused );
        const lang = getLang( meData.me.lang );

        console.log( recent, next );

        return (
            <Container>
                <TimeBlocks
                    blocks={blocks}
                    lang={lang}
                    now={now}
                    focused={focused}
                    setFocused={setFocused} 
                />
                <WhatNow
                    doings={meData.me.doings}
                    lang={lang}
                    focused={focused}
                    recent={recent}
                    now={now}
                    next={next}
                    className={ blocks[focused].doing ? "disabled" : "" } 
                />
            </Container>
        )
    } else return <Loader />

};