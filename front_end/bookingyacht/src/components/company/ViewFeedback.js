import React from 'react';
import logo from '../../assets/sidebar.jpg'
import ReactPaginate from 'react-paginate';
import image from '../../assets/no53ab0y526yl825.webp';

const ViewFeedback = () => {
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
                            <th>Star</th>
                            <th>Date</th>
                            <th>Describe</th>
                            <th>Name Customer</th>

                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        <tr
                            className="table-primary"
                        >
                            <td>
                                3 Sao
                            </td>
                            <td>
                                13/08/2003
                            </td>
                            <td>
                                Đẳng cấp
                            </td>
                            <td>
                                Vượng
                            </td>
                        </tr>

                    </tbody>
                    <tfoot>

                    </tfoot>
                </table>
            </div>
        </>


    );
};

export default ViewFeedback;