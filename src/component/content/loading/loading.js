import React from 'react';
import { Spin } from 'antd';

export const Loading = () => {
    return <div className="container" style={{position: 'relative'}}>
        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
            <Spin tip="Loading...."/>
        </div>
    </div>
}

 