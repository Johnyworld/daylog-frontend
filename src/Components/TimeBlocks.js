import React, { Component } from 'react';
import styled from 'styled-components';
import TimeBlock from './TimeBlock';

const Container = styled.ul`
    margin-left: 35px;
    padding-bottom: 40vh;
    display: none;
    &.appear {
        display: block;
    }
`;

class TimeBlocks extends Component {
    today = null;

    componentDidMount() {
        this.today.classList.add('appear');
        window.scrollTo( 0, document.body.clientHeight );
    }

    render() {
        const { blocks, lang, now, focused, setFocused } = this.props;
        return (
            <Container ref={ ref => this.today = ref }>
                { blocks.map((block, index) => {
                    return (
                        <TimeBlock
                            key={block.block}
                            id={block.id}
                            index={index}
                            block={block.block}
                            doing={block.doing ? block.doing.name : null}
                            color={block.doing ? block.doing.color : null}
                            score={block.score}
                            blocks={block.blocks}
                            likesCount={block.likesCount}
                            commentsCount={block.commentsCount}
                            lang={lang}
                            now={now}
                            focused={focused}
                            setFocused={setFocused}
                            className={index === blocks.length-1 ? "selected first last" : ""}
                        />
                    )
                })}
            </Container>
        )
    }
}

export default TimeBlocks;
