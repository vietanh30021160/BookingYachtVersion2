import React, { useEffect, useState } from 'react';
import { Button, FormControl, FormGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { RiShipLine } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import './ViewYacht.scss'
import ReactPaginate from 'react-paginate';
import './Company.scss'
import { FaCirclePlus } from "react-icons/fa6";
import ModalCreateYacht from './Modal/ModalCreateYacht';
import { deleteYacht, getAllYachtCompany } from '../../services/ApiServices';
import _ from 'lodash';
import Form from 'react-bootstrap/Form';
const ViewYacht = () => {
    const navigate = useNavigate();
    const [isShowModal, setIsShowModal] = useState(false);

    const [yacht, setYacht] = useState([]);
    const [idCompany, setIdCompany] = useState('');

    const [searchYacht, setSearchYacht] = useState('');
    const [filteredYachts, setFilteredYachts] = useState([]);
    //pagging
    // const [isChange, setIsChange] = useState(true);
    // const [paggingProuct, setPaggingProduct] = useState([]);
    // const [pagging, setPagging] = useState([]);

    useEffect(() => {
        listYacht()
    }, [])


    const listYacht = async () => {
        let res = await getAllYachtCompany();
        console.log(res)
        if (res && res.data.success === true) {
            setYacht(res.data.data);
            setFilteredYachts(res.data.data)
        }
    }

    const handleDeleteYacht = async (id, name) => {
        if (window.confirm(`Delete Yacht With Name: ${name}`)) {
            let res = await deleteYacht(id);
            console.log(res);
        }
    }
    const handleCreateYacht = () => {
        setIsShowModal(true);
        // console.log(yacht)
        // let company = _.chain(yacht)
        //     // Group the elements of Array based on `color` property
        //     .groupBy("company")
        //     // `key` is group's name (color), `value` is the array of objects
        //     .map((value, key) => ({ company: key, yachtt: value }))
        //     .value()
        console.log("check yacht modal", yacht[0].company)
        setIdCompany(yacht[0].company.idCompany)
    }

    const handleSearchYacht = () => {
        if (searchYacht) {
            const newYacht = yacht.filter((yacht) => yacht.name.toLowerCase().includes(searchYacht.toLocaleLowerCase().trim()))
            if (newYacht && newYacht.length > 0) {
                setYacht(newYacht);
                setSearchYacht('');
            }
        } else {
            setYacht(filteredYachts)
        }

    }
    return (
        <div className='view-yacht-container'>
            <div className='row my-4'>
                <h2 className='col-2'>List Yacht</h2>


                <Button className='col-2 btn btn-success' onClick={() => handleCreateYacht()}><FaCirclePlus style={{ marginRight: 8, marginBottom: 5 }} />Add New Yacht</Button>

                <FormGroup className='col-2'>

                    <Form.Select >

                        <option>ok</option>
                    </Form.Select>

                </FormGroup>

                <FormGroup className='col-2'>
                    <Form.Select >
                        <option>Default select</option>
                    </Form.Select>
                </FormGroup>


                <FormGroup className='col-4 d-flex'>
                    <FormControl
                        placeholder='Search'
                        type='text'
                        value={searchYacht}
                        onChange={(event) => setSearchYacht(event.target.value)}
                    />
                    <Button onClick={handleSearchYacht} className='btn btn-primary mx-3'>Search</Button>
                </FormGroup>


            </div>

            <div className='row container'>
                <div className="col-xl-12">
                    {
                        yacht && yacht.length > 0 && yacht.map((yacht, index) => {

                            return (
                                <div key={yacht.idYacht} className="card mb-4 order-list">
                                    <div className="gold-members p-4">

                                        <div className="media">

                                            <img className="mr-4" src={`http://localhost:8080/api/customer/file/${yacht.image}`} alt="Generic placeholder image" />

                                            <div className="media-body">
                                                <div className='card-content'>
                                                    <div className='location'><FaLocationDot />{yacht.location.name}</div>
                                                    <div className='name'>{yacht.name}</div>
                                                    <div> <RiShipLine /> Hạ Thủy {yacht.launch} - Tàu Vỏ {yacht.hullBody}  </div>

                                                </div>
                                                <div className='action d-flex'>
                                                    <p className="mb-0 text-dark text-dark pt-2"><span className="text-dark font-weight-bold"></span>
                                                    </p>
                                                    <div className="float-right">
                                                        <Button className="btn btn-sm btn-success" onClick={() => navigate(`/manage-yacht/${yacht.idYacht}`)}><i className="feather-check-circle" />Manage Yacht</Button>
                                                        <Button className="btn btn-sm btn-warning" onClick={() => navigate('/manage-room')}><i className="feather-trash" /> Manage Room </Button>
                                                        <Button className="btn btn-sm btn-danger" onClick={() => handleDeleteYacht(yacht.idYacht, yacht.name)}><i className="feather-trash" /> Delete Yacht </Button>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })

                    }

                </div>

            </div>

            <div className='page'>
                <ReactPaginate
                    nextLabel="Next >"
                    // onPageChange=
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={3}
                    previousLabel="< Prev"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </div>
            <ModalCreateYacht
                show={isShowModal}
                setShow={setIsShowModal}
                idCompany={idCompany}
                listYacht={listYacht}
            />

        </div>
    );
};

export default ViewYacht;