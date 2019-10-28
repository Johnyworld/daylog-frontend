import React, { useState } from 'react';
import styled from 'styled-components';
import PopupHeader from './PopupHeader';
import Words from '../Lang/Words.json'
import Icon from './Icon';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import DoingButton from './DoingButton';
import useInput from '../Hooks/useInput';
import LargeButton from './LargeButton';
import Theme from '../Styles/Theme';
import InputLabel from './InputLabel';

const Container = styled.div`
    ${({ theme })=> theme.popupContainer };
`;

const Popup = styled.div`
    ${({ theme })=> theme.popup };
`;

const PopupContent = styled.section`
   ${({ theme })=> theme.popupContent };
   max-height: 50vh;
   margin: 0 -30px 30px;
   padding: 0 30px;
`;

const DoingGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 8px;
    padding-top: 15px;
    button {
        margin-right: 0;
    }

    @media screen and ( max-width: 374px ) {
        grid-template-columns: repeat(3, 1fr); 
    }

    @media screen and ( min-width: 500px ) {
        grid-template-columns: repeat(5, 1fr); 
    }
`;

const LocationInput = styled(InputLabel)``;

const DoneButton = styled(LargeButton)`
    display: block;
    margin-top: 30px;
    margin-left: auto;
`;

export default ({ 
    pins, recent, closePopup, next, lang, recentDoingId, nextDoingId,
    onClickPull, onClickStill, onClickUpload }) => {
        
    const [ selectedDoing, setSelectedDoing ] = useState(null);
    const [ isStill, setIsStill ] = useState(false);
    const [ isPull, setIsPull ] = useState(false);
    
    const location = useInput('');

    const onClickButton = ({id, name, color, icon}, e) => {
        const childNodes = e.currentTarget.parentNode.childNodes;
        setSelectedDoing({id, name, color, icon});
        
        // Selected 클래스 네임 부여
        childNodes.forEach( node => { node.classList.remove('selected'); });
        e.currentTarget.classList.add('selected');

        // recent (또는 next) 타임라인의 location 값으로 현재 location input 값 설정
        if ( e.currentTarget.classList.contains('recent') ) {
            location.setValue(recent.location);
            setIsStill(true);

        } else if ( e.currentTarget.classList.contains('next') ) {
            location.setValue(next.location);
            setIsPull(true); 

        } else {
            location.setValue("");
            setIsStill(false); 
            setIsPull(false);
        }
    }

    const onClickSubmit = () => {
        if ( recent && recent.doing.id === selectedDoing.id && isStill ) {
            onClickStill({ location: location.value });
            closePopup();

        } else if ( next && next.doing.id === selectedDoing.id && isPull ) {
            onClickPull({ location: location.value });
            closePopup();

        } else {
            onClickUpload({
                id: selectedDoing.id,
                location: location.value,
                name: selectedDoing.name,
                icon: selectedDoing.icon,
                color: selectedDoing.color
            });
            closePopup();
        }
    }

    return (
        <Container>
            <Popup>
                <PopupHeader text={Words.whatNow} remark={Words.whatNowRemark} lang={lang} closePopup={closePopup} />
                <PopupContent>
                    <DoingGrid>
                        { /* "이어서" 버튼 (현재 커서 위치 기준, 이전 기록이 있을 경우) */
                        recent && recent.doing &&
                            <DoingButton
                                key={recent.doing.id}
                                id={recent.doing.id}
                                name={recent.doing.name}
                                icon={recent.doing.icon}
                                color={recent.doing.color}
                                isFavorite={pins.some( pin => pin.doing.id === recent.doing.id && pin.isFavorite )}
                                isCreating={recent.isCreating}
                                onClick={onClickButton}
                                lang={lang}
                                className="recent"
                            /> 
                        }
                        { /* "당기기" 버튼 (현재 커서 위치 기준, 다음 기록이 있을 경우) */
                        next && next.doing &&
                            <DoingButton
                                key={next.doing.id}
                                id={next.doing.id}
                                name={next.doing.name}
                                icon={next.doing.icon}
                                color={next.doing.color}
                                lang={lang}
                                isFavorite={pins.some( pin => pin.doing.id === next.doing.id && pin.isFavorite )}
                                isCreating={next.isCreating}
                                onClick={onClickButton}
                                className="next"
                            /> 
                        }
                        { /* 나머지 버튼들 배열 */
                        pins[0] && pins.sort(a=>a.isFavorite?-1:0).map( pin => {
                            const { doing } = pin;
                            return (
                                doing.id !== recentDoingId && doing.id !== nextDoingId &&
                                <DoingButton
                                    key={doing.id}
                                    id={doing.id}
                                    name={doing.name}
                                    icon={doing.icon}
                                    color={doing.color}
                                    isFavorite={pin.isFavorite}
                                    onClick={onClickButton}
                                    lang={lang} 
                                />
                            )
                        })}
                    </DoingGrid>
                </PopupContent>
                <LocationInput label={Words.location} placeholder={Words.location} {...location} lang={lang} />
                <DoneButton text={Words.done} lang={lang} onClick={onClickSubmit} color={Theme.c_blue} className={ !selectedDoing && "disabled" } />
            </Popup>
        </Container>
    )
}