
import { useEffect, useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { RiShipLine } from "react-icons/ri";
import './FindYacht.scss';
// import { img_yacht } from '../../assets/no53ab0y526yl825.webp';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getYachtListApi } from '../../redux/action/YachtListAction';
import { getYachtByIdCompany } from '../../services/ApiServices';
const YachtList = (companyId) => {

    const [pagging, setPagging] = useState([]); // page 1, 2, 3, ...
    const [paggingYacht, setPaggingYacht] = useState([]); // yachts in a page
    const [currentPage, setCurrentPage] = useState(1);

    const dispatch = useDispatch();
    const { yachtList } = useSelector((state) => state.YachtListReducer);
    const getYachtList = () => {
        dispatch(getYachtListApi())
    }
    useEffect(() => {
        getYachtList();
    }, [dispatch])

    useEffect(() =>{
        getYachtByIdCompany(companyId)
        .then(res =>{
            setPaggingYacht(res.data.data)
        })
        .catch(error =>{
            console.log(error)
        })
    }, [companyId]);

    useEffect(() => {
        if (yachtList.length) {
            const startIndex = (currentPage - 1) * 5;
            const endIndex = startIndex + 5;
            setPaggingYacht(yachtList.slice(startIndex, endIndex));

            const pages = [];
            const num = Math.ceil(yachtList.length / 5);
            for (let i = 1; i <= num; i++) {
                pages.push(i);
            }
            setPagging(pages);
        }
    }, [yachtList, currentPage]);

    const avatarYachtApi = 'http://localhost:8080/api/customer/file/'

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

    const navigate = useNavigate()

    const hanldeSelectedYacht = (idYacht) => {
        navigate(`/mainpage/${idYacht}`);
    }

    return (
        <div className="infor-body">
            {
                paggingYacht.map((yacht) => {
                    return (
                        <div className="card row" key={yacht.idYacht} onClick={() => { hanldeSelectedYacht(yacht.idYacht) }} style={{ cursor: 'pointer' }}>
                            <div className="col-md-5">
                                <img style={{ height: '250px', width: '100%' }} className="card-img-top object-fit-cover" src={`${avatarYachtApi}${yacht.image}`} alt="Card image cap" />
                            </div>
                            <div className="card-body col-md-7">
                                <div className='card-content'>
                                    <div style={{ padding: '10px', color: '#475467', width: '80px' }} className='location'><FaLocationDot />{yacht.location.name}</div>
                                    <h4 className='name' style={{ marginBottom: 0, fontWeight: 'bold' }}>{yacht.name}</h4>
                                    <p style={{ margin: '0px' }}>Hạ thủy: {yacht.launch} - Vỏ Tàu {yacht.hullBody}</p>
                                    <div style={{ fontWeight: 'bold' }}> <RiShipLine /> {yacht.itinerary} </div>
                                    <div className='price d-flex' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
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

        </div>
    );
};

export default YachtList;
