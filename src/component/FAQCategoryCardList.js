import styled from "styled-components";
import {viewHeightCalc, viewWidthCalc} from "../lib/viewportCalculate";
import {Link} from "react-router-dom";

const FAQCategoryCardList = ({list}) =>{
    return(
        <>
            <CardWrap>
                {
                    list.map((item)=>
                        <Card to={item.url} key={item.id}>
                            <p className="title">{item.partName}</p>
                            <p></p>
                            <p className="question">{item.question}</p>
                            <p></p>
                            <button>더보기</button>
                        </Card>
                    )
                }
            </CardWrap>
        </>
    );
}

const CardWrap = styled.div`
  color: ${props => props.theme.color.black};
  margin: ${viewWidthCalc(40)} ${viewWidthCalc(100)} ${viewWidthCalc(40)} ${viewWidthCalc(100)};
  display: grid;
  grid-auto-flow: dense;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
  column-gap: ${viewWidthCalc(70)};
  row-gap: ${viewHeightCalc(30)};
`;

const Card = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: ${props => props.theme.color.primaryLight};
  border-radius: 50px;
  animation: fadeBottom 1s;
  @keyframes fadeBottom{
    from{
      opacity:0;
      transform: translate3d(0, 30%, 0);
    }
    to{
      opacity:1;
      transform: translateZ(0);
    }
  }
  .title {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    padding: 8px 16px 8px 16px;
    width:100px;
    color: ${props => props.theme.color.primary};
    font-weight: 700;
    font-size: 20px;
    border-radius: 27px;
    background: ${props => props.theme.color.white};
  }
  .question {
    grid-column: 1 / 3;
    color: ${props => props.theme.color.black};
    font-weight: 600;
    margin-left: 20px;
  }
  button {
    justify-self: end;
    margin: 0 30px 20px 0;
    width:70px;
    height: 30px;
    color: ${props => props.theme.color.primary};
    font-weight: 700;
    font-size: 16px;
    border-radius: 27px;
    border: none;
    background: ${props => props.theme.color.white};
  }
`

export default FAQCategoryCardList