import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
//import axios from "axios";
import api from "../api/axios";

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

function BbsWritePage() {

    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const contentHandler = (event) => {
        setContent(event.target.value);
    }

    const titleHandler = (event) => {
        setTitle(event.target.value);
    }
    // json-server 버전
    /*
    const createBbs = async() => {
        const data = {
            id : Date.now(),
            title : title,
            content : content,
        }

        try{
            const response = await api.post(`bbs`, data);
            setTitle('');
            setContent('');
            console.log("debug >>> post result , " , response.data);
            alert("글 작성이 완료되었습니다.");
            navigate('/');
        } catch (err){
            console.log("debug >>> axious post err , " , err);
        }
    }
    */

    const createBbs = async() => {
        const data = {
            title : title,
            content : content,
        }

        try{
            const response = await api.post(`bbs/save`, data);
            setTitle('');
            setContent('');
            console.log("debug >>> post result , " , response);
            
            if( response.status === 204) {
                alert("제목과 내용을 입력해주세요.");
            } else {
                alert(response.data.info);
                navigate('/');
            }
            
        } catch (err){
            console.log("debug >>> axious post err , " , err);
        }
    }

    return(
        <Wrapper>
            <Container>
                <label>
                    제목 : 
                <TextInput height={20} value={title} onChange={titleHandler}/>
                </label>
                <label>
                    내용 : 
                <TextInput height={480} value={content} onChange={contentHandler}/>
                </label>
                <Button title='글 작성하기' onClick={createBbs}/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button title='글 작성취소' onClick={() => {
                    alert("글 작성을 취소합니다.");
                    navigate('/');
                }}/>
            </Container>
        </Wrapper>
    );
}

export default BbsWritePage;