import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [originTitle, setOriginTitle] = useState('');
    const [originContent, setOriginContent] = useState('');
    

    const contentHandler = (event) => {
        setContent(event.target.value);
    }

    const titleHandler = (event) => {
        setTitle(event.target.value);
    }

    useEffect( () => {
        const patchBbs = async() => {
            try{
                const response = await axios.get(`http://localhost:8000/bbs/${id}`);
                setTitle(response.data.title);
                setContent(response.data.content);

                setOriginTitle(response.data.title);
                setOriginContent(response.data.content);
            } catch (err) {
                console.log(err);
            }
        }
        patchBbs();
    }, [])

    const updateBbs = async() => {
        try {
            await axios.patch(`http://localhost:8000/bbs/${id}`, {
                title : title,
                content : content
            });
            alert('수정이 완료되었습니다.');
            navigate('/');
        } catch (err){
            console.log(err); 
        }
    }

    const Changed = title !== originTitle || content !== originContent;

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
                <Button title='글 수정하기' onClick={updateBbs} changed={!Changed}/>
                &nbsp;&nbsp;
                <Button title='글 수정취소' onClick={() => {
                    alert("글 수정을 취소합니다.");
                    navigate('/');
                }}/>
            </Container>
        </Wrapper>
    );
}

export default BbsWritePage;