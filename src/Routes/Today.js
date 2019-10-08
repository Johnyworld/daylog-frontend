import React from 'react';
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
    overflow-y: scroll;
`;

export default () => {
    const { data, loading } = useQuery( TODAY_QUERY );
    const { data: meData, loading: meLoading } = useQuery(ME);

    if ( !loading && data && data.seeTodayPosts && meData && meData.me && !meLoading ) {
        const now = getNowBlock();

        const yesterday = new Date();
        yesterday.setDate( yesterday.getDate() -1 );
        const yyyymmddYesterday = getYyyymmdd( yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate() );
        
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

        data.seeTodayPosts.forEach( post => {
            let startAt = post.startAt;
            if ( post.yyyymmdd === yyyymmddYesterday ) startAt -= 96;

            const num = 95 - ( now - startAt );
            blocks[num] = { ...blocks[num], ...post };
            for ( let i=1; i<post.blocks; i++ ) {
                if ( blocks[num+i] ) {
                    blocks[num+i].doing = { color : post.doing.color }; 
                }
            }
        })

        const lang = getLang( meData.me.lang );

        return (
            <Container>
                <TimeBlocks blocks={blocks} lang={lang} />
                <WhatNow doings={meData.me.doings} lang={lang} recent={recent} />
            </Container>
        )
    } else return <Loader />

};