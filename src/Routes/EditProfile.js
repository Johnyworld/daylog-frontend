/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import styled from 'styled-components';
import TextRegular from '../Components/TextRegular';
import Words from '../Lang/Words.json'
import { getLang, langList, languages } from '../Util/Languages';
import Input from '../Components/Input';
import useInput from '../Hooks/useInput';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { ME } from '../Components/TodayQueries';
import Loader from '../Components/Loader';
import Theme from '../Styles/Theme';
import Select from '../Components/Select';
import TextareaAutosize from 'react-autosize-textarea/lib';
import LargeButton from '../Components/LargeButton';
import { gql } from 'apollo-boost';
import TextLarge from '../Components/TextLarge';
import Avatar from '../Components/Avatar';
import axios from 'axios';
import TextMedium from '../Components/TextMedium';
import SmallButton from '../Components/SmallButton';
import PopupHeader from '../Components/PopupHeader';

const EDIT_USER = gql`
    mutation editUser( $id: String!, $username: String!, $fullname: String!, $bio: String, $lang: String! ) {
        editUser( id: $id, username: $username, fullname: $fullname, bio: $bio, lang: $lang )
    }
`;

const DELETE_AVATAR = gql`
    mutation deleteAvatar( $id: String! ) {
        deleteAvatar( id: $id )
    }
`;


const Container = styled.main`
    padding: 30px;
`;

const Profile = styled.section`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 40px;
    padding-right: 30px;
    .avatar {
        margin-right: 20px;
    }
    .text-medium { 
        display: block; 
        margin-bottom: 5px;
    }
`;

const Row = styled.section`
    display: grid;
    grid-template-columns: 2fr 5fr;
    grid-gap: 20px;
    margin-bottom: 15px;
    .text-regular:first-child {
        margin-top: 10px;
    }
    .text-regular:last-child {
        display: block;
        padding: 10px 4px;
        ${({ theme })=> theme.inputUnderline };
    }
`;

const Textarea = styled(TextareaAutosize)`
    ${({ theme })=> theme.f_regular };
    ${({ theme })=> theme.inputUnderline };
    padding: 10px 3px;
`;

const Confirm = styled.div`
    margin-top: 50px;
    text-align: right;
`;

const PopupContainer = styled.div`
    ${({ theme })=> theme.popupContainer };
`;

const Popup = styled.div`
    ${({ theme })=> theme.popup };
    input[type=file] {
        display: none;
    }
    button {
        margin-left: 20px;
    }
`;

export default () => {
    const { data, loading } = useQuery(ME);

    if ( !loading && data && data.me ) {
        const [ editDone, setEditDone ] = useState(false);
        const [ onPopup, setOnPopup ] = useState(false);
        const [ avatarState, setAvatarState ] = useState(data.me.avatar);

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

        const [ deleteAvatarMutation ] = useMutation( DELETE_AVATAR, {
            variables: {
                id: data.me.id,
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

        const onDeleteAvatar = () => {
            deleteAvatarMutation();
            setOnPopup(false);
        }

        const onChangeAvatar = (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append('avatar', e.target.files[0]);
            formData.append('userId', data.me.id);
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            };
            axios.post("http://localhost:4000/upload", formData, config )
                .then((response) => { 
                    setAvatarState(response.data.Location);
                    setOnPopup(false);
                })
                .catch(() => { alert(languages(Words.failToUpload, lang)); });
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
                        <Profile>
                            <Avatar avatar={avatarState} size="large" />
                            <div>
                                <TextMedium string={data.me.username} weight="bold" />
                                <SmallButton text={Words.editAvatar} lang={lang} onClick={()=>{ setOnPopup(true) }} color={Theme.c_blue} />
                            </div>
                        </Profile>
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
                                : <TextLarge text={Words.editDone} lang={lang} />
                            }
                        </Confirm>
                    </>
                }
                { onPopup &&
                    <PopupContainer>
                        <Popup>
                            <PopupHeader text={Words.editAvatar} lang={lang} closePopup={()=>{ setOnPopup(false) }} />
                            <label htmlFor="avatar">
                                <TextRegular text={Words.upload} lang={lang} color={Theme.c_blue} weight="bold" />
                            </label>
                            <Input placeholder={Words.upload} onChange={onChangeAvatar} lang={lang} type="file" accept="image/*" name="avatar" id="avatar" />
                            <SmallButton text={Words.deleteAvatar} lang={lang} onClick={onDeleteAvatar} color={Theme.c_red} />
                        </Popup>
                    </PopupContainer>
                }
            </Container>
        )
    }
    else { return <Loader /> }
}