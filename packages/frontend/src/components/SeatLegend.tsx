import React from 'react';

export const SeatLegend: React.FC = () => {
    return (
        <div className="d-flex gap-2 justify-content-end">
            <div className="d-flex align-items-center">
                <div className="bg-success rounded me-1" style={{width: '20px', height: '20px'}}></div>
                <small>Available</small>
            </div>
            <div className="d-flex align-items-center">
                <div className="bg-danger rounded me-1" style={{width: '20px', height: '20px'}}></div>
                <small>Unavailable</small>
            </div>
            <div className="d-flex align-items-center">
                <div className="bg-info rounded me-1" style={{width: '20px', height: '20px'}}></div>
                <small>Selected</small>
            </div>
        </div>
    );
};
