import { useState, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Modal from 'react-modal'; // react-modal 라이브러리 import
import { MemberModalclose } from '../../modules/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setMemberId, setMemberName } from '../../modules/idSlice';

export default function FindMemId() {
    const dispatch = useDispatch();
    const memberModalOpen = useSelector(
        (state) => state.product.memberModalOpen
    );
    const [data, setData] = useState([]);

    const [newMember, setNewMember] = useState('');

    // 모달을 닫아주고 스크롤을 풀어줌.
    const closeModal = () => {
        dispatch(MemberModalclose());
        setData([]);
        openScroll();
    };

    const openScroll = useCallback(() => {
        document.body.style.removeProperty('overflow');
    }, []);

    const findData = async (e) => {
        e.preventDefault();
        try {
            const newMemberEncode = encodeURIComponent(newMember);
            const result = await axios.get(
                `https://server.inuappcenter.kr/members/id/${newMemberEncode}`
            );
            console.log('Success:', result.data);

            // POST 요청 성공 시, 새로운 동아리원을 data 상태 변수에 추가합니다.
            setData(result.data);

            setNewMember('');
        } catch (error) {
            console.error('Error adding data:', error);
        }
    };

    const setId = (id, name) => {
        console.log(id);
        dispatch(setMemberId(id));
        dispatch(setMemberName(name));
        closeModal();
    };

    return (
        <>
            <ModalContainer
                isOpen={memberModalOpen}
                onRequestClose={closeModal}
                contentLabel='Edit Member Modal'
            >
                <MemberForm onSubmit={findData}>
                    <ModalTitle>이름으로 동아리원 찾기</ModalTitle>
                    <ModalName>이름</ModalName>
                    <ModalInput
                        type='text'
                        placeholder='이름을 입력해주세요'
                        value={newMember}
                        onChange={(e) => setNewMember(e.target.value)}
                    />
                    <ModalButton type='submit'>검색</ModalButton>
                </MemberForm>
                <ModalTemplate>
                    <ModalHeader type='name'>번호</ModalHeader>
                    <ModalHeader>이름</ModalHeader>
                    <ModalHeader type='email'>이메일</ModalHeader>
                </ModalTemplate>
                <>
                    {data.map((member, index) => (
                        <LabelWrapper
                            onClick={() => setId(member.member_id, member.name)}
                        >
                            <ModalLabel type='name'>
                                {member.member_id}
                            </ModalLabel>
                            <ModalLabel>{member.name}</ModalLabel>
                            <ModalLabel type='email'>{member.email}</ModalLabel>
                        </LabelWrapper>
                    ))}
                </>
            </ModalContainer>
            ;
        </>
    );
}

const MemberForm = styled.form`
    width: 100%;
`;

const ModalName = styled.div`
    margin-bottom: 5px;
    margin-right: auto;
    margin-left: 0.5rem;
`;

const ModalHeader = styled.div`
    position: absolute;

    ${(props) =>
        props.type === 'name'
            ? 'left: 5.3rem;'
            : props.type === 'email'
            ? 'left: 15rem;'
            : 'left: 10rem;'}
`;

const LabelWrapper = styled.div`
    display: flex;
    margin-top: 1rem;
    width: 70%;
    height: 18px;
    &:hover {
        background-color: #f2f2f2;
        transition: 0.5s ease-in-out;
    }
`;

const ModalTemplate = styled.div`
    display: flex;
    margin-right: auto;
    margin-left: 3rem;
    width: 70%;
    height: 40px;
    background-color: white;
    align-items: center;
    border-radius: 10px;
`;
const ModalContainer = styled(Modal)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f7f7f8;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    width: 400px;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const ModalTitle = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 15px;
    margin-right: auto;
    margin-top: 0;
    font-weight: 400;
`;

const ModalLabel = styled.label`
    font-size: 1rem;
    position: absolute;

    ${(props) =>
        props.type === 'name'
            ? 'left: 5.8rem;'
            : props.type === 'email'
            ? 'left: 14.7rem;'
            : 'left: 9.7rem;'}
`;

const ModalInput = styled.input`
    width: 70%;
    padding: 8px;
    margin-bottom: 15px;
    border: 1px solid black;
    border-radius: 4px;
    font-size: 1rem;
    margin-right: auto;
`;

const ModalButton = styled.button`
    background-color: #1e88e5;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    position: absolute;
    left: 20.3rem;
    top: 5.4rem;

    box-sizing: border-box;
    width: 110px;
    height: 38px;

    &:hover {
        background-color: #8181f7;
    }
`;
