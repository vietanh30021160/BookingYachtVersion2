// import React, { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
// import { FaCirclePlus } from "react-icons/fa6";
// import { deleteRoomType, getAllRoomTypeCompany } from '../../services/ApiServices';
// import { toast } from 'react-toastify';
// import ModalCreateRoomType from './Modal/ModalRoomType';
// import ModalUpdateRoomType from './Modal/ModalUpdateRoomType';
// import { GoArrowDown } from "react-icons/go";
// import { GoArrowUp } from "react-icons/go";
// import ReactPaginate from 'react-paginate';

// const ManageRoomType = () => {
//     const [isShowModalCreateRoomType, setIsShowModalCreateRoomType] = useState(false);
//     const [isShowModalUpdateRoomType, setIsShowModalUpdateRoomType] = useState(false);
//     const [dataUpdate, setDataUpdate] = useState([]);

//     const [roomType, setRoomType] = useState('');

//     const [currentPage, setCurrentPage] = useState(0);
//     const itemsPerPage = 10;

//     useEffect(() => {
//         getRoomType();
//     }, [])


//     const getRoomType = async () => {
//         let res = await getAllRoomTypeCompany();
//         if (res && res.data.data.length > 0) {
//             setRoomType(res.data.data);
//         } else {
//             toast.info('Not Found Room Type');
//         }
//     }

//     const handleUpdateRoomType = (type) => {
//         setIsShowModalUpdateRoomType(true);
//         setDataUpdate(type);
//     }

//     const handleDeleteRoomType = async (type) => {
//         if (window.confirm(`You Want To Delete Room Type ${type.utilities}`)) {
//             let res = await deleteRoomType(type.idRoomType);
//             if (res && res.data.data === true) {
//                 toast.success('Delete Successfully');
//                 getRoomType();
//                 setCurrentPage(prevPage => {
//                     const maxPage = Math.ceil((roomType.length - 1) / itemsPerPage) - 1;
//                     return prevPage > maxPage ? maxPage : prevPage;
//                 });
//             } else {
//                 toast.error('Delete Fail');
//             }
//         }

//     }
//     const handleSortByPriceDown = () => {
//         const newList = [...roomType].sort((a, b) => a.price - b.price);
//         setRoomType(newList);
//     }


//     const handleSortByPriceUp = () => {
//         const newList = [...roomType].sort((a, b) => b.price - a.price);
//         setRoomType(newList);
//     }
//     const handlePageChange = (selectedItem) => {
//         setCurrentPage(selectedItem.selected);
//     }

//     const displayedRoomTypes = roomType.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);


//     return (
//         <div className='container'>
//             <div className='my-4'>
//                 <Button className='col-2 btn btn-success' onClick={() => setIsShowModalCreateRoomType(true)}><FaCirclePlus style={{ marginRight: 8, marginBottom: 5 }} />Add New Room Type</Button>

//             </div>
//             <table className="table table-hover">
//                 <thead>
//                     <tr>
//                         <th scope="col">
//                             Price
//                             <GoArrowDown onClick={handleSortByPriceDown} style={{ cursor: 'pointer' }} />
//                             <GoArrowUp onClick={handleSortByPriceUp} style={{ cursor: 'pointer' }} />
//                         </th>
//                         <th scope="col">Type</th>
//                         <th scope="col">Utilities</th>
//                         <th className='text-center' scope="col">Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         displayedRoomTypes && displayedRoomTypes.length > 0 && displayedRoomTypes.map((type) =>
//                             <tr key={type.idRoomType}>
//                                 <td>{type.price}</td>
//                                 <td>{type.type}</td>
//                                 <td>{type.utilities}</td>
//                                 <td>
//                                     <div className='d-flex' style={{ gap: 20, justifyContent: 'center' }}>
//                                         <Button onClick={() => handleUpdateRoomType(type)} className='btn btn-warning'>Update</Button>
//                                         <Button onClick={() => handleDeleteRoomType(type)} className='btn btn-danger'>Delete</Button>
//                                     </div>
//                                 </td>

//                             </tr>
//                         )
//                     }


//                 </tbody>
//             </table>
//             <div className='page'>
//                 <ReactPaginate
//                     nextLabel="Next >"
//                     onPageChange={handlePageChange}
//                     pageRangeDisplayed={3}
//                     marginPagesDisplayed={2}
//                     pageCount={Math.ceil(roomType.length / itemsPerPage)}
//                     previousLabel="< Prev"
//                     pageClassName="page-item"
//                     pageLinkClassName="page-link"
//                     previousClassName="page-item"
//                     previousLinkClassName="page-link"
//                     nextClassName="page-item"
//                     nextLinkClassName="page-link"
//                     breakLabel="..."
//                     breakClassName="page-item"
//                     breakLinkClassName="page-link"
//                     containerClassName="pagination"
//                     activeClassName="active"
//                     renderOnZeroPageCount={null}
//                 />
//             </div>
//             <ModalCreateRoomType
//                 show={isShowModalCreateRoomType}
//                 setIsShowModalCreateRoomType={setIsShowModalCreateRoomType}
//                 getRoomType={getRoomType}
//             />

//             <ModalUpdateRoomType
//                 show={isShowModalUpdateRoomType}
//                 setIsShowModalUpdateRoomType={setIsShowModalUpdateRoomType}
//                 dataUpdate={dataUpdate}
//                 getRoomType={getRoomType}

//             />
//         </div>
//     );
// };

// export default ManageRoomType;