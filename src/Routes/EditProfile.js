/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import styled from 'styled-components';
import TextRegular from '../Components/TextRegular';
import Words from '../Lang/Words.json'
import { getLang, langList, languages } from '../Util/Languages';
import Input from '../Components/Input';
import useInput from '../Hooks/useInput';
import { useMutation } from 'react-apollo-hooks';
import { ME } from '../Components/TodayQueries';
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
import InputLabel from '../Components/InputLabel';
import InputDisabled from '../Components/InputDisabed';

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
    max-width: 768px;
    margin: auto;
    padding: 30px;
`;

const Profile = styled.section`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 40px;
    padding-right: 30px;
    @media screen and ( min-width: 768px ) {
        justify-content: flex-start;
    }
`;

const InputField = styled.section``;

const AvatarStyled = styled(Avatar)`
    margin-right: 20px;
`;

const Username = styled(TextMedium)`
    display: block; 
    margin-bottom: 5px;
`;

const GAP = `
    margin-bottom: 15px;
    @media screen and ( min-width: 768px ) {
        margin-bottom: 25px;
    }
`;

const Row = styled.section`
    display: grid;
    grid-template-columns: 2fr 5fr;
    grid-gap: 20px;
    ${ GAP };
`;

const InputLabelStyled = styled(InputLabel)`
    ${ GAP };
`;

const InputDisabledStyled = styled(InputDisabled)`
    ${ GAP };
`;

const Label = styled(TextRegular)`
    margin-top: 10px;
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

export default ({ me }) => {
    const [ editDone, setEditDone ] = useState(false);
    const [ onPopup, setOnPopup ] = useState(false);
    const [ avatarState, setAvatarState ] = useState(me.avatar);

    const lang = getLang(me.lang);

    const username = useInput(me.username);
    const fullname = useInput(me.fullname);
    const bio = useInput(me.bio);
    const language = useInput(me.lang);

    const regUsername = /^[a-z0-9_-]{3,16}$/;
    const regFullname = /^[^0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{2,18}$/;
    
    const checkUsername = () => regUsername.test( username.value );
    const checkFullname = () => regFullname.test( fullname.value );
    const checkReg = () => { if ( checkUsername() && checkFullname() ) return true; }

    const [ editUserMutation, { data: editData, loading: editLoading } ] = useMutation( EDIT_USER, { 
        variables: {
            id: me.id,
            username: username.value,
            fullname: fullname.value,
            bio: bio.value,
            lang: language.value
        }, refetchQueries: [{ query: ME }]
    });

    const [ deleteAvatarMutation ] = useMutation( DELETE_AVATAR, {
        variables: {
            id: me.id,
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
        formData.append('userId', me.id);
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        };
        const url = process.env.REACT_APP_BACKEND_URL + "/upload"
        axios.post(url, formData, config )
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
            <>
                <Profile>
                    <AvatarStyled avatar={avatarState} size="large" />
                    <div>
                        <Username string={me.username} weight="bold" />
                        <SmallButton text={Words.editAvatar} lang={lang} onClick={()=>{ setOnPopup(true) }} color={Theme.c_blue} />
                    </div>
                </Profile>
                <InputField>
                    <InputLabelStyled label={Words.inputUsername} placeholder={Words.inputUsername} lang={lang} {...username} />
                    <InputLabelStyled label={Words.inputFullname} placeholder={Words.inputFullname} lang={lang} {...fullname} />
                    <InputDisabledStyled label={Words.inputEmail} field={me.email} lang={lang} />
                    <Row>
                        <Label text={Words.lang} lang={lang} weight='bold' />
                        <Select list={langList} value={language.value} onChange={onChangeSelect} />
                    </Row> 
                    <Row>
                        <Label text={Words.bio} lang={lang} weight='bold' />
                        <Textarea placeholder={placeholder} value={bio.value} onChange={bio.onChange} />
                    </Row> 
                </InputField>
                <Confirm>
                    { !editDone 
                        ? <LargeButton text={Words.done} lang={lang} color={Theme.c_blue} onClick={onSubmit} className={ checkReg() ? "" : "disabled" } />
                        : <TextLarge text={Words.editDone} lang={lang} />
                    }
                </Confirm>
            </>
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