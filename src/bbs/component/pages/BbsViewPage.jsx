import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../ui/Button";
import { useNavigate, useParams } from "react-router-dom";
//import axios from "axios";
import api from "../api/axios";
import TextInput from "../ui/TextInput";
import CommentList from "../list/CommentList";

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Container = styled.div`
    width: 100%;
    max-width: 720px;
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;
const PostContainer = styled.div`
    padding: 8px 16px;
    border: 1px solid grey;
    border-radius: 8px;
`;
const TitleText = styled.p`
    font-size: 28px;
    font-weight: 500;
`;
const ContentText = styled.p`
    font-size: 20px;
    line-height: 32px;
    white-space: pre-wrap;
`;
const CommentLabel = styled.p`
    font-size: 16px;
    font-weight: 500;
`;

function BbsViewPage(props) {

    const { id } = useParams();
    const navigate = useNavigate();
    const [ bbs, setBbs ] = useState({});
    const [ comment, setComment ] = useState('');
    const [ comments, setComments ] = useState([]);
    
    /* json-server 버전
    const getBbs = async() => {
        try {
            const response = await api.get(`bbs/${id}`);
            console.log("response data , " , response.data);
            setBbs(response.data);
        } catch (err) {
            console.log("get err , " , err);
        }
    };
    */
    // spring 버전
    const getBbs = async() => {
        try {
            const response = await api.get(`bbs/view/${id}`);
            console.log("response data , " , response.data);
            setBbs(response.data);
            console.log("response data comment, " , response.data.comment);
            setComments(response.data.comment);
        } catch (err) {
            console.log("get err , " , err);
        }
    };

    useEffect( () => {
        getBbs();
        //getComments();
    }, []);

    const commentHandler = (event) => {
        setComment(event.target.value);
    }
    /* json-server 버전
    const addComment = async() => {
        const data = {
            id : Date.now(),
            content : comment,
            bbsid : bbs.id
        };

        if(!comment.trim()){
            alert('내용을 입력해 주세요');
        } else {
            try {
                const response = await api.post(`comments`, data);
                setComment('');
                console.log("debug >>> post result , " , response.data);
                alert('정상처리 되었습니다.');
                //getComments();
            } catch (err) {
                console.log("debug >>> axious post err , " , err);
            }
        }
    }
    */
    // spring 버전
    const addComment = async() => {
        const data = {
            content : comment,
            bbsid : bbs.id
        };

        if(!comment.trim()){
            alert('내용을 입력해 주세요');
        } else {
            try {
                const response = await api.post(`bbs/comment/save`, data);
                
                console.log("debug >>> post result , " , response);
                if(response.status == 204){
                    alert('정상처리 되었습니다.');
                    setComment('');
                    getComments();
                } else {
                    alert('타임라인 등록시 오류발생함!!!!')
                }

            } catch (err) {
                console.log("debug >>> axious post err , " , err);
            }
        }
    }
    /* json-server 버전
    const getComments = async() => {
        try {
            //const response = await api.get(`comments`);
            const response = await api.get(`comments?bbsId=${id}`);
            console.log("response data comments, " , response.data);
            setComments(response.data);
        } catch (err) {
            console.log("get err , " , err);
        }
    };
    */

    // spring 버전
    const getComments = async() => {
        try {
            
            const response = await api.get(`bbs/comment/getComment/${id}`);
            console.log("response data comments, " , response.data);
            setComments(response.data);
        } catch (err) {
            console.log("get err , " , err);
        }
    };
    
    /* json-server 버전
    const deleteBbs = async() => {
        try {
            await api.delete(`bbs/${id}`);
            alert('삭제되었습니다.');
            navigate('/') ;
        } catch( err ) {
            console.log( err );
        }
    }
    */
    // spring 버전
    const deleteBbs = async() => {
        try {
            console.log("debug >>> comments length , " , comments.length);

            if(comments.length > 0) {
                alert('게시글을 삭제할 수 없습니다.');
            } else {
                await api.delete(`bbs/delete/${id}`);
                alert('게시글이 삭제되었습니다.')
                navigate('/');
            }

        } catch( err ) {
            console.log( err );
        }
    }

    return (
        <Wrapper>
            <Container>
                <Button title='뒤로가기' onClick={() => navigate('/')}></Button>
                <p />
                <PostContainer>
                    <TitleText>{bbs.title}</TitleText>
                    <ContentText>{bbs.content}</ContentText>
                    {/*
                    1. 버튼 클릭시 수정페이지(BbsUpdatePage.jsx)로 이동(Router = '/bbs-update' )
                    2. 페이지 화면 구성은 BbsWritePage 와 동일하게 구성하되 데이터 보여지는 상태
                    3. 데이터가 변경이 되었을 때만 수정완료 버튼 활성화 시켜서 수정기능 완료!!
                    3-1. 고민해 주세요!!
                    4. 수정완료 후에는 HomePage 로 이동
                    */}
                    <Button title='게시글 수정하기' onClick={() => navigate(`/bbs-update/${id}`)}/>
                    &nbsp;&nbsp;
                    <Button title='게시글 삭제하기' onClick={deleteBbs}/>
                </PostContainer>

                <CommentLabel>타임라인</CommentLabel>
                <TextInput height={20} value={comment} onChange={commentHandler}/>
                <p/>
                <Button title='타임라인 등록하기' onClick={addComment}/>
                <p/>
                
                <CommentList comments={comments} />
            </Container>
        </Wrapper>
    )
}

export default BbsViewPage;