import React from 'react'
import notFound from '../../assets/OIG1.jpg'

export default function NotFound() {
    return (
        <div className='justify-content-center text-center'>
            <img style={{ width: '50%' }} src={notFound} alt="not found" />
            <h2 className='fw-bold'>Không tìm thấy kết quả !</h2>
        </div>
    )
}
