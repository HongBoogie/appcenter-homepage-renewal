import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Modal from 'react-modal'; // react-modal 라이브러리 import
import { RMopen, RMclose } from '../../modules/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

export default function ManageRegis() {
    const [data, setData] = useState([]);

    // 상태관리 관련
    const dispatch = useDispatch();
    const regisModalOpen = useSelector((state) => state.product.regisModalOpen);

    // 새 멤버 추가 입력받을 상태 변수
    const [newMember, setNewMember] = useState({
        member_id: '',
        name: '',
        description: '',
        profileImage: '',
        blogLink: '',
        email: '',
        gitRepositoryLink: '',
    });

    const addData = async () => {
        try {
            const result = await axios.post(
                'https://server.inuappcenter.kr/members',
                newMember
            );
            console.log('Success:', result.data);

            // POST 요청 성공 시, 새로운 동아리원을 data 상태 변수에 추가합니다.
            setData([...data, result.data]);

            setNewMember({
                member_id: '',
                name: '',
                description: '',
                profileImage: '',
                blogLink: '',
                email: '',
                gitRepositoryLink: '',
            });
            dispatch(RMclose());
        } catch (error) {
            console.error('Error adding data:', error);
        }
    };

    // 모달을 닫아주고 스크롤을 풀어줌.
    const closeModal = () => {
        dispatch(RMclose());
        openScroll();
    };

    const openScroll = useCallback(() => {
        document.body.style.removeProperty('overflow');
    }, []);

    return (
        <>
            <ModalContainer
                isOpen={regisModalOpen}
                onRequestClose={closeModal}
                contentLabel='Edit Member Modal'
            >
                <ModalTitle>회원 등록</ModalTitle>
                <ModalLabel>이름</ModalLabel>
                <ModalInput
                    type='text'
                    placeholder='이름'
                    value={newMember.name}
                    onChange={(e) =>
                        setNewMember({ ...newMember, name: e.target.value })
                    }
                />
                <ModalLabel>이메일</ModalLabel>
                <ModalInput
                    type='text'
                    placeholder='이메일'
                    value={newMember.email}
                    onChange={(e) =>
                        setNewMember({ ...newMember, email: e.target.value })
                    }
                />
                <ModalLabel>블로그 URL</ModalLabel>
                <ModalInput
                    type='text'
                    placeholder='블로그 URL'
                    value={newMember.blogLink}
                    onChange={(e) =>
                        setNewMember({ ...newMember, blogLink: e.target.value })
                    }
                />
                <ModalLabel>Git URL</ModalLabel>
                <ModalInput
                    type='text'
                    placeholder='Git URL'
                    value={newMember.gitRepositoryLink}
                    onChange={(e) =>
                        setNewMember({
                            ...newMember,
                            gitRepositoryLink: e.target.value,
                        })
                    }
                />
                <ModalLabel>프로필 이미지</ModalLabel>
                <ModalInput
                    type='text'
                    placeholder='프로필 이미지'
                    value={newMember.profileImage}
                    onChange={(e) =>
                        setNewMember({
                            ...newMember,
                            profileImage: e.target.value,
                        })
                    }
                />
                <ModalLabel>설명</ModalLabel>
                <ModalInput
                    type='text'
                    placeholder='설명'
                    value={newMember.description}
                    onChange={(e) =>
                        setNewMember({
                            ...newMember,
                            description: e.target.value,
                        })
                    }
                />
                <ModalButtonWrapper>
                    <ModalButton onClick={addData}>등록</ModalButton>
                    <ModalButton onClick={closeModal}>취소</ModalButton>
                </ModalButtonWrapper>
            </ModalContainer>
            ;
        </>
    );
}

const ModalContainer = styled(Modal)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 8px;
    border: 2px solid grey;
    padding: 20px;
    width: 500px;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const ModalTitle = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 15px;
`;

const ModalLabel = styled.label`
    font-size: 1rem;
    margin-bottom: 5px;
`;

const ModalInput = styled.input`
    width: 70%;
    padding: 8px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    text-align: center;
`;

const ModalButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
`;

const ModalButton = styled.button`
    background-color: grey;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    & + & {
        margin: 0 10px;
    }

    &:hover {
        background-color: #8181f7;
    }
`;
