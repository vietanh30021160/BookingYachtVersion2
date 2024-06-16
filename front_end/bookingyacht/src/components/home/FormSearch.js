import React from 'react';
import './Home.scss';

const FormSearch = () => {
    return (
        <div className='homepage-content container '>
            <form className='mb-3 serach-yacht p-3'>
                <div className='text-center'>
                    <h2 style={{ fontWeight: 'bold' }}>Bạn lựa chọn du thuyền Hạ Long nào?</h2>
                    <p>Có rất nhiều du thuyền dành cho bạn</p>
                </div>
                <div className='form-search d-flex flex-row align-items-center'>
                    <input type='text' placeholder='Nhập tên du thuyền' className='form-control flex-grow-1 me-2' style={{ paddingLeft: '20px' }} />
                    <button style={{ paddingLeft: '30px', paddingRight: '30px' }} size='lg'>Search</button>
                </div>
            </form>
        </div>

    );
};

export default FormSearch;