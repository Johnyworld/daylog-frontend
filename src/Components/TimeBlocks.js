import React, { Component } from 'react';
import styled from 'styled-components';
import TimeBlock from './TimeBlock';

const Container = styled.ul`
    margin-left: 35px;
    padding-bottom: 50vh;
    display: none;
    &.appear {
        display: block;
    }
`;

class TimeBlocks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blocks : this.props.blocks,
            lang : this.props.lang
        }
    }

    today = null;

    componentDidMount() {
        this.today.classList.add('appear');
        window.scrollTo( 0, document.body.clientHeight );
    }

    render() {
        const { blocks, lang } = this.state;
        return (
            <Container ref={ ref => this.today = ref }>
                { blocks.map(block => {
                    return (
                        <TimeBlock
                            key={block.block}
                            id={block.id}
                            block={block.block}
                            doing={block.doing ? block.doing.name : null}
                            color={block.doing ? block.doing.color : null}
                            score={block.score}
                            blocks={block.blocks}
                            isLiked={block.isLiked}
                            likesCount={block.likesCount}
                            postsCount={block.postsCount}
                            lang={lang}
                        />
                    )
                })}
            </Container>
        )
    }
}

export default TimeBlocks;
