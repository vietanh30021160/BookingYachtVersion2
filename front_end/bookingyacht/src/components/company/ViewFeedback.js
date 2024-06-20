import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getFeedbackCompany } from '../../services/ApiServices';
import { GoArrowDown } from "react-icons/go";
import { GoArrowUp } from "react-icons/go";
const ViewFeedback = () => {
    const idCompany = useSelector(state => state.account.account.idCompany);
    const [listFeedback, setListFeedback] = useState([]);

    useEffect(() => {
        getFeedback();
    }, [])

    const getFeedback = async () => {
        console.log(idCompany)
        let res = await getFeedbackCompany(idCompany);
        if (res && res.data.data) {
            setListFeedback(res.data.data);
        }
    }

    const handleSortByStarDown = () => {
        const newListFeed = [...listFeedback].sort((a, b) => a.starRating - b.starRating);
        setListFeedback(newListFeed);
    }

    const handleSortByNameDown = () => {
        const newListFeed = [...listFeedback].sort((sA, sB) => {
            let a = sA.customer.fullName.split(/\s+/).at(-1) + sA.name;
            //a = a[a.length - 1] + a;
            let b = sB.customer.fullName.split(/\s+/).at(-1) + sB.name;
            //b = b[b.length - 1] + b;
            return a.toLowerCase().localeCompare(b.toLowerCase());
            //ten la tieng anh
            //return sA.name.toLowerCase().localeCompare(sB.name.toLowerCase());
        })
        setListFeedback(newListFeed)
    }

    const handleSortByStarUp = () => {
        const newListFeed = [...listFeedback].sort((a, b) => b.starRating - a.starRating);
        setListFeedback(newListFeed);
    }

    const handleSortByNameUp = () => {
        const newListFeed = [...listFeedback].sort((sA, sB) => {
            let a = sA.customer.fullName.split(/\s+/).at(-1) + sA.name;
            //a = a[a.length - 1] + a;
            let b = sB.customer.fullName.split(/\s+/).at(-1) + sB.name;
            //b = b[b.length - 1] + b;
            return b.toLowerCase().localeCompare(a.toLowerCase());
            //ten la tieng anh
            //return sA.name.toLowerCase().localeCompare(sB.name.toLowerCase());
        })
        setListFeedback(newListFeed)
    }

    return (
        <>
            <div
                className="table-responsive "
            >
                <div className='my-3'></div>
                <table
                    className="table table-striped table-hover table-borderless table-primary align-middle"
                >
                    <thead className="table-light">
                        <tr>
                            <th>Star
                                <GoArrowDown onClick={handleSortByStarDown} style={{ cursor: 'pointer' }} />
                                <GoArrowUp onClick={handleSortByStarUp} style={{ cursor: 'pointer' }} /></th>
                            <th>Name Customer
                                <GoArrowDown onClick={handleSortByNameDown} style={{ cursor: 'pointer' }} />
                                <GoArrowUp onClick={handleSortByNameUp} style={{ cursor: 'pointer' }} /></th>
                            <th>Describe</th>
                            <th>Phone</th>

                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {
                            listFeedback && listFeedback.map((feddback) =>

                                <tr
                                    key={feddback.idFeedback}
                                    className="table-primary"
                                >
                                    <td>
                                        {feddback.starRating}
                                    </td>
                                    <td>
                                        {feddback.customer.fullName}
                                    </td>
                                    <td>
                                        {feddback.description}
                                    </td>
                                    <td>
                                        {feddback.customer.phoneNumber}
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                    <tfoot>

                    </tfoot>
                </table>
            </div>
        </>


    );
};

export default ViewFeedback;