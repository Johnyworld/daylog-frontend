/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import styled from 'styled-components';
import useInput from '../Hooks/useInput';
import Input from '../Components/Input';
import Message from '../Components/Message';
import LargeButton from '../Components/LargeButton';
import Words from '../Lang/Words.json';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import { getLang, languages } from '../Util/Languages';
import Icon from '../Components/Icon';
import Version from '../Components/Version';
import Theme from '../Styles/Theme';
import TextLarge from '../Components/TextLarge';

const LOG_IN = gql`
    mutation requestSecret( $email: String! ) {
        requestSecret( email: $email )
    }
`;

const CONFIRM_SECRET = gql`
    mutation confirmSecret( $email: String!, $secret: String! ) {
        confirmSecret( email: $email, secret: $secret )
    }
`;

const LOCAL_LOG_IN = gql`
    mutation logUserIn( $token: String! ) {
        logUserIn( token: $token ) @client
    }
`;

const CREATE_ACCOUNT = gql`
    mutation createAccount( $email: String!, $username: String!, $fullname: String!, $bio: String, $lang: String! ) {
        createAccount( email:$email, username: $username, fullname: $fullname, bio: $bio, lang: $lang )
    }
`;

const Container = styled.main`
    overflow: auto;
    scroll-snap-type: y mandatory;
    height: 100vh;
`

const Section = styled.section`
    scroll-snap-align: start;
    position: relative;
    height: 100vh;
    background-color: ${props=> props.theme.c_blue};
    padding: 30px;
`;

const Wrapper = styled.div`
    ${({ theme })=> theme.wrapper }
`;

const Logo = styled.p`
    position: absolute;
    top: 25vh;
    left: 0;
    right: 0;
    font-family: 'Lobster', cursive;
    text-align: center;
    font-size: 46px;
    color: white;
`;

const InputContainer = styled.div`
    height: 50vh;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 60px;
    flex-direction: column;
    > * {
        margin-top: 20px;
    }
`;

const InputItem = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    svg {
        position: absolute;
        right: 10px;
    }
    &::after {
        font-size: 11px;
        content: ${({ text, lang })=> text && `"${languages( text, lang )}"` };
        display: block;
        color: white;
        opacity: 0;
        position: absolute;
        top: -.8em;
        right: 0;
        transition: opacity .5s;
    }
    &:hover::after {
        opacity: .4;
    }
`;

const MessageContainer = styled.div`
    margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
    * {
        display: block;
        margin-left: auto;
        margin-bottom: 20px;
    }
`;

const VersionStyled = styled(Version)`
    position: absolute;
    left: 10px;
    bottom: 10px;
`;

let canClick = true;

export default () => {
    const [ action, setAction ] = useState('logIn');
    const [ print, setPrint ] = useState(false);

    const lang = getLang();

    const email = useInput('');
    const username = useInput('');
    const fullname = useInput('');
    const secret = useInput('');

    const regUsername = /^[a-z0-9_-]{3,16}$/;
    const regFullname = /^[^0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{2,18}$/;
    const regEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    
    const checkUsername = () => regUsername.test( username.value );
    const checkFullname = () => regFullname.test( fullname.value );
    const checkEmail = () => regEmail.test( email.value );
    const checkSignUp = () => { if ( checkUsername() && checkFullname() && checkEmail() ) return true; }

    const [ requestSecretMutation ] = useMutation( LOG_IN, { variables: { email: email.value }});
    const [ confirmSecretMutation ] = useMutation( CONFIRM_SECRET, { variables: { email: email.value, secret: secret.value }});
    const [ localLogInMutation ] = useMutation( LOCAL_LOG_IN );
    const [ createAccountMutation ] = useMutation( CREATE_ACCOUNT, { variables: { username: username.value, email: email.value, fullname: fullname.value, lang } } )
    
    const onClickSignUp = () => {
        setAction('signUp');
    }

    const onClickLogIn = () => {
        setAction('logIn');
        setPrint(false);
    }

    const onSubmit = async(e) => {
        e.preventDefault();

        if ( action === 'logIn' && canClick ) {
            canClick = false;
            try {
                const { data: { requestSecret }} = await requestSecretMutation();
                if ( !requestSecret ) {
                    setPrint( 'noAccount' );
                    setTimeout(()=>{ canClick = true }, 1000);
                    setTimeout(()=>{ setAction( 'signUp' )}, 2000);
                } else {
                    setAction( 'confirm' ); 
                    setTimeout(()=>{ canClick = true }, 1000);
                }
            } catch(e) {
                setTimeout(()=>{ canClick = true }, 1000);
            }
        } 
        
        else if ( action === 'signUp' && canClick ) {
            canClick = false;
            try {
                const { data: { createAccount }} = await createAccountMutation();
                if ( !createAccount ) {
                    setPrint( 'alreadyTaken' );
                    setTimeout(()=>{ canClick = true }, 1000);
                    setTimeout(()=>{ setPrint(false) }, 2000);
                } else {
                    setPrint( 'createdAccount' );
                    setTimeout(()=>{ setAction( 'logIn' ); setPrint(false); }, 2000);
                    setTimeout(()=>{ canClick = true }, 1000);
                }
            } catch(e) {
                setPrint( 'alreadyTaken' );;
                setTimeout(()=>{ canClick = true }, 1000);
                setTimeout(()=>{ setPrint(false) }, 2000);
            }
        } 
        
        else if ( action === 'confirm' && canClick ) {
            canClick = false;
            if ( secret.value !== '' ) {
                try {
                    const { data: { confirmSecret: token }} = await confirmSecretMutation();
                    if ( token !== "" && token !== undefined ) {
                        localLogInMutation({ variables: {token} });
                    } else {
                        setTimeout(()=>{ canClick = true }, 1000); 
                        throw Error();
                    }                    
                } catch {
                    setPrint('cantConfirm');
                    setTimeout(()=>{ canClick = true }, 1000); 
                }
            }
        }
    }
    
    return (
        <Container>
            <Section>
                <Wrapper>
                    { action === "logIn" && (
                        <>
                            <Logo>Daylog</Logo>
                            <form onSubmit={onSubmit}>
                                <InputContainer>
                                    <Input placeholder={Words.inputEmail} className="large" type="email" color="white" lang={lang} {...email} />
                                </InputContainer>
                                <MessageContainer>
                                    { email.value === "" && <Message text={Words.account} lang={lang} /> }
                                    { print === "noAccount" && <Message text={Words.noAccount} lang={lang} /> }
                                </MessageContainer>                        
                                <ButtonContainer>
                                    { print !== "noAccount" ?
                                        email.value === "" 
                                        ? <LargeButton text={Words.signUp} lang={lang} color="white" onClick={onClickSignUp} />
                                        : <LargeButton text={Words.logIn} lang={lang} color="white" />
                                    : null }
                                </ButtonContainer>
                            </form>
                        </>
                    )}

                    { action === "signUp" && (
                        <form onSubmit={onSubmit}>
                            <InputContainer>
                                <InputItem text={Words.checkUsername} lang={lang} >
                                    <Input placeholder={Words.inputUsername} className="large" type="text" color="white" lang={lang} {...username} />
                                    { checkUsername() && <Icon icon="check" size="medium" color={'white'} /> }
                                </InputItem>
                                <InputItem text={Words.checkFullname} lang={lang} >
                                    <Input placeholder={Words.inputFullname} className="large" type="text" color="white" lang={lang} {...fullname} />
                                    { checkFullname() && <Icon icon="check" size="medium" color={'white'} /> }
                                </InputItem>
                                <InputItem>
                                    <Input placeholder={Words.inputEmail} className="large" type="email" color="white" lang={lang} {...email} />
                                    { checkEmail() && <Icon icon="check" size="medium" color={'white'} /> }
                                </InputItem>
                            </InputContainer>
                            <MessageContainer>
                                { print === "fieldsRequired" && <Message text={Words.fieldsRequired} lang={lang} /> }
                                { print === "alreadyTaken" && <Message text={Words.alreadyTaken} lang={lang} /> }
                                { print === "createdAccount" && <Message text={Words.createdAccount} lang={lang} /> }
                            </MessageContainer>  
                            <ButtonContainer> 
                                { print !== "alreadyTaken" && ( <>
                                    <LargeButton text={Words.signUp} lang={lang} color={ "white" } className={ checkSignUp() ? "" : "disabled" } /> 
                                    <LargeButton text={Words.back} lang={lang} color="white" onClick={onClickLogIn} />
                                </> )}
                            </ButtonContainer>
                        </form>
                    )}

                    { action === "confirm" && (
                        <>
                            <Logo>Daylog</Logo> 
                            <form onSubmit={onSubmit}>
                                <InputContainer>
                                    <Input placeholder={Words.inputSecret} type="text" className="large" color="white" lang={lang} {...secret} />
                                </InputContainer>
                                <MessageContainer>
                                    { print !== "cantConfirm" 
                                        ? <Message text={Words.secret} lang={lang} />
                                        : <Message text={Words.cantConfirm} lang={lang} /> 
                                    }
                                </MessageContainer>                        
                                <ButtonContainer>
                                    <LargeButton text={Words.okay} lang={lang} color="white" />
                                </ButtonContainer>
                            </form>
                        </>
                    )}
                    <VersionStyled />
                </Wrapper>
            </Section>
            <SectionTutorial
                text={Words.tutorial00}
                lang={lang}
                color={Theme.c_blue}
                background="white"
            />
            <SectionTutorial
                text={Words.tutorial01}
                lang={lang}
                color="white"
                background={Theme.c_blue}
                screen="https://daylog.s3.ap-northeast-2.amazonaws.com/tutorials/tutToday.png"
            />
            <SectionTutorial
                text={Words.tutorial02}
                lang={lang}
                color="white"
                background="#085fb9"
                screen="https://daylog.s3.ap-northeast-2.amazonaws.com/tutorials/tutLog1.png"
            />
            <SectionTutorial
                text={Words.tutorial03}
                lang={lang}
                color="white"
                background="#198f88"
                screen="https://daylog.s3.ap-northeast-2.amazonaws.com/tutorials/tutFeed.png"
            />
            <SectionTutorial
                text={Words.tutorial04}
                lang={lang}
                color="white"
                background="#a55af8"
                screen="https://daylog.s3.ap-northeast-2.amazonaws.com/tutorials/tutAddDoing.png"
            />
        </Container>
    )
}

const SectionTut = styled(Section)`
    background-color: ${({ background })=> background };
    display: flex;
    justify-content: center;
    align-items: center;
`;

const TextStyled = styled(TextLarge)`
    ${({ center })=> !center && `
        position: absolute;
        top: 12vh;
    `}
    white-space: pre;
    line-height: 1.4;
    width: 250px;
`;

const Screen = styled.img`
    position: absolute;
    bottom: 0;
    width: 270px;
`;

const SectionTutorial = ({ text, lang, color, background, screen }) => {
    return (
        <SectionTut color={color} background={background}>
            { screen && <Screen src={screen} /> }
            <TextStyled text={text} lang={lang} color={color} center={!screen} />
        </SectionTut>
    )
}