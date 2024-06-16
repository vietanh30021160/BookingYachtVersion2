
import './FindYacht.scss';
import { RiShipLine } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { getAllYachtHome } from '../../services/ApiServices';

// import ReactPaginate from 'react-paginate';
const ShowYacht = () => {
    const [yacht, setYacht] = useState([]);
    const [pagging, setPagging] = useState([]); // page 1, 2, 3, ...
    const [paggingYacht, setPaggingYacht] = useState([]); // products in a page
    const [currentPage, setCurrentPage] = useState(1);

    const getAllYacht = async () => {
        let res = await getAllYachtHome()
        if (res.data.data.length >= 5) {
            setPaggingYacht(res.data.data.slice(0, 5));
        } else {
            setPaggingYacht(res.data.data.slice(0, res.data.data.length));
        }
        let pages = [];
        let num = Math.ceil(res.data.data.length / 5);
        for (let i = 1; i <= num; i++) {
            pages = [...pages, i]
        }
        setPagging(pages)
        setYacht(res.data.data)
    }

    const avatarYachtApi = 'http://localhost:8080/api/customer/file/'

    useEffect(() => {
        getAllYacht()
    }, [])

    useEffect(() => {
        const startIndex = (currentPage - 1) * 5;
        const endIndex = (startIndex + 5);
        setPaggingYacht(yacht.slice(startIndex, endIndex));
    }, [currentPage, yacht])

    const handelChangePage = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const renderPages = () => {
        return pagging.map((page) => {
            return (
                <button key={page}
                    onClick={() => { handelChangePage(page) }}
                    className={page === currentPage ? 'btn btn-dark' : 'btn btn-light'}
                    style={{ margin: '0px 5px 20px 5px' }}
                >{page}
                </button>
            )
        })
    }

    return (
        <div className="infor-body">
            {
                paggingYacht.map((yacht) => {
                    return (
                        <div className="card row" key={yacht.idYacht} >
                            <div className="col-md-5">
                                <img style={{ height: '220px', width: '100%' }} class="card-img-top" src={`${avatarYachtApi}${yacht.image}`} alt="Card image cap" />
                            </div>
                            <div className="card-body col-md-7">
                                <div className='card-content'>
                                    <div style={{ padding: '0px', color: '#475467' }} className='location'><FaLocationDot />{yacht.location.name}</div>
                                    <h1 className='name' style={{ marginBottom: 0 }}>{yacht.name}</h1>
                                    <p style={{ margin: '0px' }}>Hạ thủy: {yacht.launch} - Vỏ Tàu {yacht.hullBody}</p>
                                    <div style={{ fontWeight: 'bold' }}> <RiShipLine /> {yacht.itinerary} </div>
                                    <div className='price'>
                                        <p style={{ color: '#475467', fontWeight: '700' }}>Price: 3.3350.000đ</p>
                                        <button style={{ borderRadius: 25 }} className='btn btn-warning'>Đặt ngay</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <div className='d-flex justify-content-center'>
                {renderPages()}
            </div>

            {/* <div class="card row" >
                <div className="col-md-5">
                    <img class="card-img-top" src={img_yacht} alt="Card image cap" />
                </div>
                <div class="card-body col-md-7">
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>

            <div class="card row" >
                <div className="col-md-5">
                    <img class="card-img-top" src={img_yacht} alt="Card image cap" />
                </div>
                <div class="card-body col-md-7">
                    <div>Dia Diem</div>
                    <div>Ten Du thuyen</div>
                    <div><RiShipLine />1 Ha Thuy</div>
                    <div>Tien</div>
                </div>
            </div> */}

            {/* <ReactPaginate
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
            /> */}

        </div >
    );
};

export default ShowYacht;