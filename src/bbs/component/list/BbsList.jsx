import styled from "styled-components";
import BbsItem from "./BbsItem";

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

function BbsList(props) {

    return (
        <Wrapper>
            {props.bbs.map( (bbs) => {
                return (
                    <BbsItem data={bbs} key={bbs.id}/>
                )
            })}
            
        </Wrapper>
    );
}

export default BbsList;