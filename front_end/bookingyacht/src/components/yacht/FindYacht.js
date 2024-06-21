import FormSearch from "../home/FormSearch";
import './FindYacht.scss';
import i_content from '../../assets/image_1.webp';
import Form from 'react-bootstrap/Form';
import YachtList from "./YachtList";
import { useState, useEffect } from "react";
import { getYachtService } from "../../services/ApiServices";
import { useDispatch, useSelector } from "react-redux";
import { getAllServiceApi } from "../../redux/action/YachtServiceAction";

const FindYacht = () => {
    const { services } = useSelector(state => state.YachtServiceReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllServiceApi())
    }, [dispatch])

    //The useEffect will run once when the component mounts because:
    // The dispatch function does not change between renders.
    // The empty dependency array [dispatch] behaves similarly to [], meaning the effect runs once after the initial render.

    const renderService = () => {
        return services.map((service) => {
            return (
                <Form.Check key={service.idService} label={service.service} />
            )
        })
    }

    return (
        <div className="find-yacht-body">
            <div className="find-yacht-content container">
                <div className="search-yacht">
                    <FormSearch />
                </div>
                <div className='feedback-header my-5 row'>
                    <div className='yacht-title col-md mx-4'>
                        <h2 style={{ fontWeight: 'bold' }}>Tìm Thấy Kết Quả</h2>
                        <div>
                            <img src={i_content} alt="" />
                        </div>
                    </div>
                </div>
                <div className="result-search row">
                    <div className="col-3 filter-body">
                        <div className="filter-body-header d-flex">
                            <div className="filter-body-content">
                                Lọc Kết Quả
                            </div>
                            <div>
                                <button>
                                    Đặt Lại
                                </button>
                            </div>
                        </div>

                        <hr />

                        <div className="filter-star d-flex">
                            <div className="star-body-content">
                                Xếp hạng sao
                            </div>

                            <Form.Check id="3sao" label='3 Sao' />
                            <Form.Check id="4sao" label='4 Sao' />
                            <Form.Check id="5sao" label='5 Sao' />
                        </div>
                        <div className="filter-extention d-flex">
                            <div className="extention-body-content">
                                Tiện ích
                            </div>
                            {renderService()}
                        </div>
                    </div>

                    <div className="col-1"></div>

                    <div className="col-8 infor">
                        <YachtList />
                    </div>
                </div>
            </div>
        </div>

    )
}
export default FindYacht;