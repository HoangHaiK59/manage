import React from 'react';
import {List} from 'antd';
import { useUpdateTitle } from '../../utils';

const useFetchPosts = (pageId, access_token) => {
    const [response, setResponse] = React.useState(null);
    React.useEffect(() => {
        window.FB.api(
            `/${pageId}/feed`,
            'GET',
            {
                access_token: access_token
            },
            function(response) {
                console.log(response);
                setResponse(response);
            }
        )
    },[pageId, access_token]);
    return response;
}

const Posts = ({title,loginStatus}) => {
    useUpdateTitle(title);
    const response = useFetchPosts('111876070200048',loginStatus.authResponse.accessToken);
    if(response)
    return <div style={{marginTop:10,maxHeight: 700,overflow: 'auto'}}>
    <List 
        itemLayout="horizontal"
        dataSource={response.data}
        renderItem={item => (
            <List.Item >
                <List.Item.Meta 
                title={item.id + '    ' + item.created_time}
                description={item.message}
                />

            </List.Item>
        )}
        >
        </List>
        </div>
    else return <div>Loading</div>
}

export default Posts;