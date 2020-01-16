import React from 'react';
import { Button } from 'antd';

const Analystic = () => {
    const appEvent = () => {
        window.FB.AppEvents.logPageView();
    }
    return <div>
        <Button onClick={appEvent}>
            App Events
        </Button>
    </div>
};

export default Analystic;