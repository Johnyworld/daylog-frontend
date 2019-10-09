import { gql } from 'apollo-boost';

export const ME = gql`
    {
        me {
            id
            username
            avatar
            fullname
            email
            bio
            lang
            followersCount
            followingCount
            likesTotal
            doings {
                id
                name
                color
                icon
            }
        }
    }
`;

export const TODAY_QUERY = gql`
{
   seeTodayPosts {
        id
        doing {
            id
            name
            icon
            color
        }
        location
        likesCount
        commentsCount
        isLiked
        blocks
        score
        startAt
        endAt
        yyyymmdd
    }
} 
`;
