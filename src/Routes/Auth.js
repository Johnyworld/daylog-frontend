import React, { useState } from 'react';
import styled from 'styled-components';
import useInput from '../Hooks/useInput';
import Input from '../Components/Input';
import Message from '../Components/Message';
import LargeButton from '../Components/LargeButton';
import TextMessages from '../Lang/Login.json';
import TextButtons from '../Lang/Buttons.json';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import { getLang } from '../Lang/Languages';

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
    mutation createAccount( $email: String!, $username: String!, $fullname: String!, $bio: String ) {
        createAccount( email:$email, username: $username, fullname: $fullname, bio: $bio )
    }
`;

const Wrapper = styled.div`

`

const FirstSection = styled.div`
    height: 100vh;
    background-color: ${props=> props.theme.c_blue};
    padding: 30px;
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
    * {
        margin-top: 20px;
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

let canClick = true;

export default () => {
    const [ action, setAction ] = useState('logIn');
    const [ print, setPrint ] = useState(false);
    const lang = getLang();

    const email = useInput('');
    const username = useInput('');
    const fullname = useInput('');
    const secret = useInput('');

    const [ requestSecretMutation ] = useMutation( LOG_IN, { variables: { email: email.value }});
    const [ confirmSecretMutation ] = useMutation( CONFIRM_SECRET, { variables: { email: email.value, secret: secret.value }});
    const [ localLogInMutation ] = useMutation( LOCAL_LOG_IN );
    const [ createAccountMutation ] = useMutation( CREATE_ACCOUNT, { variables: { username: username.value, email: email.value, fullname: fullname.value } } )

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
                console.log(e);
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
        <Wrapper>
            <FirstSection>
                { action === "logIn" && (
                    <>
                        <Logo>Daylog</Logo>
                        <form onSubmit={onSubmit}>
                            <InputContainer>
                                <Input placeholder={TextMessages.inputEmail} type="email" color="white" lang={lang} {...email} />
                            </InputContainer>
                            <MessageContainer>
                                { email.value === "" && <Message text={TextMessages.account} lang={lang} /> }
                                { print === "noAccount" && <Message text={TextMessages.noAccount} lang={lang} /> }
                            </MessageContainer>                        
                            <ButtonContainer>
                                { print !== "noAccount" ?
                                    email.value === "" 
                                    ? <LargeButton text={TextButtons.signIn} lang={lang} color="white" onClick={onClickSignUp} />
                                    : <LargeButton text={TextButtons.logIn} lang={lang} color="white" />
                                : null }
                            </ButtonContainer>
                        </form>
                    </>
                )}

                { action === "signUp" && (
                    <form onSubmit={onSubmit}>
                        <InputContainer>
                            <Input placeholder={TextMessages.inputUsername} type="text" color="white" lang={lang} {...username} />
                            <Input placeholder={TextMessages.inputFullname} type="text" color="white" lang={lang} {...fullname} />
                            <Input placeholder={TextMessages.inputEmail} type="email" color="white" lang={lang} {...email} />
                        </InputContainer>
                        <MessageContainer>
                            { print === "fieldsRequired" && <Message text={TextMessages.fieldsRequired} lang={lang} /> }
                            { print === "alreadyTaken" && <Message text={TextMessages.alreadyTaken} lang={lang} /> }
                            { print === "createdAccount" && <Message text={TextMessages.createdAccount} lang={lang} /> }
                        </MessageContainer>  
                        <ButtonContainer> 
                            { print !== "alreadyTaken" && ( <>
                                <LargeButton text={TextButtons.signIn} lang={lang} color="white" />
                                <LargeButton text={TextButtons.back} lang={lang} color="white" onClick={onClickLogIn} />
                            </> )}
                        </ButtonContainer>
                    </form>
                )}

                { action === "confirm" && (
                    <>
                        <Logo>Daylog</Logo> 
                        <form onSubmit={onSubmit}>
                            <InputContainer>
                                <Input placeholder={TextMessages.inputSecret} type="text" color="white" lang={lang} {...secret} />
                            </InputContainer>
                            <MessageContainer>
                                { print !== "cantConfirm" 
                                    ? <Message text={TextMessages.secret} lang={lang} />
                                    : <Message text={TextMessages.cantConfirm} lang={lang} /> 
                                }
                            </MessageContainer>                        
                            <ButtonContainer>
                                <LargeButton text={TextButtons.okay} lang={lang} color="white" />
                            </ButtonContainer>
                        </form>
                    </>
                )}
            </FirstSection>
        </Wrapper>
    )
}