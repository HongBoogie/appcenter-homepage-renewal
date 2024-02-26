import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal'; // react-modal 라이브러리 import
import Pagination from '../component/manage/Pagenation';
import InOut from '../component/common/InOut';
import IntroBox from '../component/admin/IntroBox';
import { introInfo } from '../resource/data/adminInfo';
import { RMopen } from '../modules/ProductSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import RoleRegis from '../container/product/RoleRegis';

export default function ManageRolePage() {
    const [data, setData] = useState([]);

    const regisModalOpen = useSelector((state) => state.product.regisModalOpen);
    // prettier-ignore
    const dispatch = useDispatch();

    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({
        x: 0,
        y: 0,
    });
    const [selectedRoleId, setSelectedRoleId] = useState(null);
    const contextMenuRef = useRef(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    //* 수정 기능을 이용할 때 값을 저장하기 위해 사용합니다. */
    const [editedRoleName, setEditedRoleName] = useState('');
    const [editedDesc, setEditedDesc] = useState('');

    // 페이지네이션을 구현할때 사용합니다.
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // 페이지당 데이터를 분할하는 함수입니다.
    const paginateData = (data, currentPage, itemsPerPage) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    };

    const getCurrentPageData = () => {
        return paginateData(data, currentPage, itemsPerPage);
    };

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const openEditModal = (selectedRoleId) => {
        // 수정할 때 해당 memberId의 데이터를 가져와서 모달에 미리 채워넣을 수 있습니다.
        setContextMenuVisible(false);
        setEditModalOpen(true);
    };

    useEffect(() => {
        const RoleToEdit = data.find((item) => item.roleId === selectedRoleId);
        if (RoleToEdit) {
            setEditedRoleName(RoleToEdit.roleName);
            setEditedDesc(RoleToEdit.description);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRoleId]);

    const closeEditModal = () => {
        setEditModalOpen(false);
    };

    const addData = () => {
        dispatch(RMopen());
        scrollLock();
    };

    const scrollLock = useCallback(() => {
        document.body.style.overflow = 'hidden';
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const viewData = await axios //eslint-disable-line no-unused-vars
                .get('https://server.inuappcenter.kr/roles/all-roles')
                .then((res) => {
                    setData(res.data);
                });
        };
        fetchData();
    }, [data.length, isEditModalOpen, regisModalOpen]);

    useEffect(() => {
        const handleContextMenuClick = (e) => {
            if (
                contextMenuRef.current &&
                !contextMenuRef.current.contains(e.target)
            ) {
                // 컨텍스트 메뉴 외의 영역을 클릭하면 메뉴를 닫습니다.
                setContextMenuVisible(false);
            }
        };

        window.addEventListener('click', handleContextMenuClick);

        return () => {
            // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
            window.removeEventListener('click', handleContextMenuClick);
        };
    }, []);

    const handleEdit = async () => {
        if (selectedRoleId === null) {
            return; // 선택된 항목이 없으면 무시
        }

        // 수정할 데이터를 가져옵니다.
        const updatedData = {
            roleName: editedRoleName,
            description: editedDesc,
        };

        try {
            // member_id를 사용하여 수정 요청을 보냅니다.
            const response = await axios.patch(
                `https://server.inuappcenter.kr/roles?id=${selectedRoleId}`,
                updatedData
            );
            console.log('Member with ID', selectedRoleId, 'has been updated.');
            console.log(response);
            // 업데이트된 데이터를 data 상태에서 업데이트합니다.
            setData((prevData) =>
                prevData.map((item) =>
                    item.member_id === selectedRoleId
                        ? { ...item, ...updatedData }
                        : item
                )
            );
        } catch (error) {
            console.error('Error updating member:', error);
        }
        setEditModalOpen(false);
        setContextMenuVisible(false); // 컨텍스트 메뉴 닫기
    };

    const handleDelete = async () => {
        if (selectedRoleId === null) {
            return; // 선택된 항목이 없으면 무시
        }

        try {
            // member_id를 사용하여 삭제 요청을 보냅니다.
            await axios
                .delete(
                    `https://server.inuappcenter.kr/roles/${selectedRoleId} `
                )
                .then((res) => {
                    alert(res.data.msg);
                    console.log(res.data.msg);
                    // 삭제한 데이터를 data 상태에서 제거합니다.
                    setData((prevData) =>
                        prevData.filter(
                            (item) => item.roleId !== selectedRoleId
                        )
                    );
                });
        } catch (error) {
            console.error('Error deleting member:', error);
            alert(error);
        }

        setContextMenuVisible(false); // 컨텍스트 메뉴 닫기
    };

    return (
        <>
            <InOut />
            <IntroBox introInfo={introInfo[2]} />
            <MemberList>역할 목록</MemberList>
            <MemberTable>
                <MemberBar>
                    <Cartegories type='first'>역할 ID</Cartegories>
                    <Cartegories type='second'>역할 이름</Cartegories>
                </MemberBar>
                <tbody>
                    {getCurrentPageData().map((content) => (
                        <tr
                            key={content.roleId}
                            onContextMenu={(e) => {
                                e.preventDefault();
                                setSelectedRoleId(content.roleId);
                                setContextMenuPosition({
                                    x: e.clientX,
                                    y: e.clientY,
                                });
                                setContextMenuVisible(true);
                                console.log(content.roleId);
                            }}
                        >
                            <td>{content.roleId}</td>
                            <td>{content.roleName}</td>
                        </tr>
                    ))}
                </tbody>
            </MemberTable>
            <PaginationContainer>
                {/* 페이지네이션 컨텐츠 */}
                <Pagination
                    currentPage={currentPage}
                    totalItems={data.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />
                <Regisbutton
                    onClick={() => {
                        addData();
                    }}
                >
                    등록
                </Regisbutton>
            </PaginationContainer>
            {regisModalOpen && <RoleRegis regisModalOpen={regisModalOpen} />}
            {/* 컨텍스트 메뉴 */}
            {contextMenuVisible && (
                <ContextMenu
                    ref={contextMenuRef}
                    style={{
                        top: contextMenuPosition.y,
                        left: contextMenuPosition.x,
                    }}
                >
                    <MenuItem onClick={openEditModal}>수정</MenuItem>
                    <MenuItem onClick={handleDelete}>삭제</MenuItem>
                </ContextMenu>
            )}

            {/* 수정 팝업 모달 */}
            <ModalContainer
                isOpen={isEditModalOpen}
                onRequestClose={closeEditModal}
                contentLabel='Edit Member Modal'
            >
                <ModalTitle>역할 수정</ModalTitle>
                <ModalLabel>역할</ModalLabel>
                <ModalInput
                    type='text'
                    value={editedRoleName}
                    onChange={(e) => setEditedRoleName(e.target.value)}
                />
                <ModalLabel>설명</ModalLabel>
                <ModalInput
                    type='text'
                    value={editedDesc}
                    onChange={(e) => setEditedDesc(e.target.value)}
                />
                <ModalButtonWrapper>
                    <ModalButton onClick={closeEditModal}>취소</ModalButton>
                    <ModalButton onClick={handleEdit}>수정 완료</ModalButton>
                </ModalButtonWrapper>
            </ModalContainer>
        </>
    );
}
const MemberBar = styled.div`
    display: flex;

    justify-content: center;
    align-items: center;
    height: 40px;
    transform: translate(-8rem);
`;

const Cartegories = styled.div`
    width: 80px;
    height: 20px;
    border-radius: 8px;
    text-align: center;
    padding: 10px 0;
    background-color: #f2f2f2;
    position: absolute;
    ${(props) =>
        props.type === 'first'
            ? 'left: 8rem; width: 180px;'
            : props.type === 'second'
            ? 'left:18rem; width: 440px;'
            : 'left: 39rem; width: 170px;'}
`;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px; /* 조정 가능한 마진 값 */
`;

const ModalContainer = styled(Modal)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
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
`;

const ModalButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
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

    & + & {
        margin: 0 10px;
    }

    &:hover {
        background-color: #8181f7;
    }
`;

const MenuItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50%;
    border-bottom: 1px solid #ccc;
    padding: 5px 10px;
    cursor: pointer;
    user-select: none;
    &:hover {
        background-color: #f2f2f2;
    }
`;

const ContextMenu = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100px;
    height: 100px;
    background-color: white;
    border-radius: 8px;
    border: 1px solid #ccc;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    color: grey;
`;

const Regisbutton = styled.button`
    position: absolute;
    border: none;
    background-color: #1e88e5;
    border-radius: 5px;
    color: white;
    width: 5rem;
    height: 2rem;
    margin-left: 37rem;
    margin-top: 0.6rem;

    &:hover {
        transition: 0.1s ease-in;
        background-color: #8181f7;
    }
`;

const MemberTable = styled.table`
    width: 600px;
    margin: 20px auto 20px auto;

    td {
        padding: 6px;
        text-align: center;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        overflow: hidden;
        white-space: nowrap;

    th {
        font-weight: 700;
        padding: 5px;
        text-align: center;
    }

    a {
        color: #0078d4;
        text-decoration: none;
    }

    tr {
        border-radius: 20%;
    }

    tr:hover {
        background-color: #f2f2f2;
    }
`;

const MemberList = styled.div`
    position: absolute;
    display: flex;
    position: relative;
    height: 25px;
    width: 730px;
    margin: 0 auto 0 auto;
    font-size: 1.6rem;

    .menu {
        margin-left: auto;
    }
`;