import React from 'react';
import { Form } from 'react-bootstrap';

const ServiceSelection = ({ service, roomId, selectedServices, handleServiceChange }) => {
    return (
        <div className="service-selection">
            <Form.Check
                style={{ fontSize: '14px' }}
                key={service.idService}
                type="checkbox"
                label={`${service.service} (+${service.price.toLocaleString()} đ)`}
                checked={selectedServices.includes(service.idService)}
                onChange={() => handleServiceChange(roomId, service.idService)}
            />
        </div>
    );
};

export default ServiceSelection;