import React from "react";
import styled from "styled-components";
import CommentItem from "./CommentItem";
import { useParams } from "react-router-dom";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

const NoWrapper = styled.div`
    width: calc(100% - 32px);
    padding: 8px 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border: 1px solid grey;
    border-radius: 8px;
    cursor: pointer;
    background: white;
    :hover {
        background: lightgrey;
    }
`;

const ContentText = styled.p`
    font-size: 16px;
    white-space: pre-wrap;
`;

function CommentList(props) {
    const { id } = useParams();
    const filterComments = props.comments.filter(comment => comment.bbsId == id);
    return (
        <Wrapper>
            {filterComments.length > 0 ? (
                filterComments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                ))
            ) : (
                <NoWrapper>
                    <ContentText>등록된 타임라인이 없습니다.</ContentText>
                </NoWrapper>
            )}
        </Wrapper>
    );
}

export default CommentList;