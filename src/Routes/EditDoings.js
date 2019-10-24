import React from 'react';
import { ME } from '../Routes/Today';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../Components/Loader';
import { getLang } from '../Util/Languages';
import { gql } from 'apollo-boost';
import EditDoingsPresenter from '../Components/EditDoingsPresenter';

export const SEE_MY_DOINGS = gql`
    {
        seeFollowedDoings {
            id
            name
            color
            icon
            author {
                id
                username
            }
            category {
                id
                name
                lang {
                    id
                    kr
                    en
                }
            }
            pinsCount
            postsCount
            blocksCount
        }
    }
`;

const SEE_CATEGORY_LIST = gql`
    {
        seeCategoryList {
            id
            name
            lang {
                id
                kr
                en
            }
        }
    }
`;

export default () => {
    const { data, loading } = useQuery(SEE_MY_DOINGS);
    const { data: categoryData, loading: categoryLoading } = useQuery(SEE_CATEGORY_LIST);
    const { data: meData, loading: meLoading } = useQuery(ME);

    if ( !loading && data && data.seeFollowedDoings && 
        !meLoading && meData && meData.me &&  
        !categoryLoading && categoryData && categoryData.seeCategoryList ) 
    {
        const lang = getLang( meData.me.lang );
        return (
            <EditDoingsPresenter 
                data={data.seeFollowedDoings}
                me={meData.me}
                categories={categoryData.seeCategoryList}
                lang={lang}
            />
        )
    } else return <Loader />
}