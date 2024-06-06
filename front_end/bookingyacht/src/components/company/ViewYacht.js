import React from 'react';
import { Button } from 'react-bootstrap'
import { FcPlus } from "react-icons/fc";
import ModalCreateYacht from './ModalCreateYacht';



const ViewYacht = () => {
    return (
        <div className='view-yacht-container'>
            <h2>List Yacht</h2>
            <Button className='my-3'><FcPlus className='mx-3' /> Add New Yacht</Button>

            <ModalCreateYacht />
            <div
                class="table-responsive container"
            >
                <table
                    className="table table-striped table-hover table-bordered table-primary align-middle"
                >

                    <thead className="table-light">

                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        <tr
                            className="table-primary"
                        >
                            <td scope="row">1</td>
                            <td>Cruise Ha Long</td>
                            <td>21.000.0000</td>
                        </tr>
                        <tr
                            className="table-primary"
                        >
                            <td scope="row">Item</td>
                            <td>Item</td>
                            <td>Item</td>
                        </tr>
                    </tbody>
                    <tfoot>

                    </tfoot>
                </table>
            </div>

        </div>
    );
};

export default ViewYacht;