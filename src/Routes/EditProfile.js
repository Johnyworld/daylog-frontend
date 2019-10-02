/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import styled from 'styled-components';
import TextRegular from '../Components/TextRegular';
import Words from '../Lang/Words.json'
import { getLang, langList, languages } from '../Util/Languages';
import Input from '../Components/Input';
import useInput from '../Hooks/useInput';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { ME } from '../Router';
import Loader from '../Components/Loader';
import Theme from '../Styles/Theme';
import Select from '../Components/Select';
import TextareaAutosize from 'react-autosize-textarea/lib';
import LargeButton from '../Components/LargeButton';
import { gql } from 'apollo-boost';
import TextLarge from '../Components/TextLarge';

const EDIT_USER = gql`
    mutation editUser( $id: String!, $username: String!, $fullname: String!, $bio: String, $lang: String! ) {
        editUser( id: $id, username: $username, fullname: $fullname, bio: $bio, lang: $lang )
    }
`;

const Container = styled.main`
    padding: 30px;
`;

const Row = styled.section`
    display: flex;
    margin-bottom: 15px;
    justify-content: space-between;
    input, > div {
        width: 70%;
    }
    .text-regular:first-child {
        margin-top: 10px;
    }
    .text-regular:last-child {
        display: block;
        width: 70%;
        padding: 10px 4px;
        ${({ theme })=> theme.inputUnderline };
    }
`;

const Textarea = styled(TextareaAutosize)`
    ${({ theme })=> theme.f_regular };
    ${({ theme })=> theme.inputUnderline };
    width: 70%;
    padding: 10px 3px;
`;

const Confirm = styled.div`
    margin-top: 50px;
    text-align: right;
`;

export default () => {
    const { data, loading } = useQuery(ME);

    if ( !loading && data && data.me ) {
        const [ editDone, setEditDone ] = useState(false);
        const lang = getLang(data.me.lang);

        const username = useInput(data.me.username);
        const fullname = useInput(data.me.fullname);
        const bio = useInput(data.me.bio);
        const language = useInput(data.me.lang);

        const regUsername = /^[a-z0-9_-]{3,16}$/;
        const regFullname = /^[^0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{2,18}$/;
        
        const checkUsername = () => regUsername.test( username.value );
        const checkFullname = () => regFullname.test( fullname.value );
        const checkReg = () => { if ( checkUsername() && checkFullname() ) return true; }

        const [ editUserMutation, { data: editData, loading: editLoading } ] = useMutation( EDIT_USER, { 
            variables: {
                id: data.me.id,
                username: username.value,
                fullname: fullname.value,
                bio: bio.value,
                lang: language.value
            }, refetchQueries: [{ query: ME }]
        });

        if ( editDone && editData && editData.editUser && !editLoading ) {
            window.location = `/#/log/${username.value}`            
            setEditDone(false);
        }

        const onSubmit = () => {
            editUserMutation();
            setEditDone(true);
        }
    
        const onChangeSelect = (e) => {
            language.setValue(e.target.value);
        }

        const placeholder = languages(Words.bio, lang);
        return (
            <Container>
                { loading && <Loader /> }
                { !loading && data && data.me &&
                    <>
                        <Row>
                            <TextRegular text={Words.inputUsername} lang={lang} weight='bold' />
                            <Input placeholder={Words.inputUsername} lang={lang} {...username} />
                        </Row> 
                        <Row>
                            <TextRegular text={Words.inputFullname} lang={lang} weight='bold' />
                            <Input placeholder={Words.inputFullname} lang={lang} {...fullname} />
                        </Row> 
                        <Row>
                            <TextRegular text={Words.inputEmail} lang={lang} weight='bold' />
                            <TextRegular string={data.me.email} color={Theme.c_gray} />
                        </Row> 
                        <Row>
                            <TextRegular text={Words.lang} lang={lang} weight='bold' />
                            <Select list={langList} value={language.value} onChange={onChangeSelect} />
                        </Row> 
                        <Row>
                            <TextRegular text={Words.bio} lang={lang} weight='bold' />
                            <Textarea placeholder={placeholder} value={bio.value} onChange={bio.onChange} />
                        </Row> 
                        <Confirm>
                            { !editDone 
                                ? <LargeButton text={Words.done} lang={lang} color={Theme.c_blue} onClick={onSubmit} className={ checkReg() ? "" : "disabled" } />
                                : <TextLarge string="수정 완료" lang={lang} />
                            }
                        </Confirm>
                    </>
                }
            </Container>
        )
    }
    else { return <Loader /> }
}