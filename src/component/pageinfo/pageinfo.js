import React, { useEffect, useState } from 'react';
import {Descriptions} from 'antd';

const useFetch = (pageId) => {
    const [response,setResponse] = useState(null);
    useEffect(() => {
        window.FB.api(
            `/${pageId}`,
            'GET',
             {
                 access_token: 'accessToken',
                 fields: ['about','attire','bio','location','parking','hours','emails','website']
             },
             function(response) {
                 console.log(response);
                 setResponse(response);
             }
        )
    },[pageId])
    return response;
}

const PageInfo = () => {
    const response = useFetch('111876070200048');
    if(response)
    return <Descriptions title="Page Infomation">
        <Descriptions.Item label="ID">{response.id}</Descriptions.Item>
        <Descriptions.Item label="About">{response.about}</Descriptions.Item>
        <Descriptions.Item label="Emails">{response.emails}</Descriptions.Item>
        <Descriptions.Item label="Address">
        {response.location.street + ',' + response.location.country}
        </Descriptions.Item>
    </Descriptions>
    else {
        return <div>Loading</div>
    }
}

export default PageInfo;