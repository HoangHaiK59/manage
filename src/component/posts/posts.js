import React from 'react';
import { List, Row, Col, Button } from 'antd';
import { useUpdateTitle, useVerify } from '../../utils';
import { Loading } from '../content/loading/loading';

const useFetchPosts = (pageId, access_token, query) => {
    const [response, setResponse] = React.useState(null);
    React.useEffect(() => {
        if(query === null)
        window.FB.api(
            `/${pageId}/feed`,
            'GET',
            {
                access_token: access_token
            },
            function (response) {
                console.log(response);
                setResponse(response);
            }
        )
        else {
            let paging = query.after ? {after: query.after} : {before: query.before};
            window.FB.api(
                `/${pageId}/feed`,
                'GET',
                {
                    access_token: access_token,
                    ...paging
                },
                function (response) {
                    console.log(response);
                    setResponse(response);
                }
            )
        }
    }, [pageId, access_token, query]);
    return response;
}

const Posts = ({ title, loginStatus, handleVerify }) => {
    const [query, setQuery] = React.useState(null);
    useUpdateTitle(title);
    useVerify(() => handleVerify(loginStatus.authResponse.accessToken));
    const response = useFetchPosts('111876070200048', loginStatus.authResponse.accessToken, query);
    const handlePaging = (query) => {
        setQuery(query);
    }
    if (response) {
        const {paging} = response;
        return <Row style={{marginTop: 10}}>
        <Row style={{ marginTop: 10, maxHeight: 700, overflow: 'auto' }}>
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
        </Row>
        <Row>
            <Col span={12} style={{textAlign:'end'}}>
                <Button style={{marginRight: 10}} onClick={() => handlePaging({before: paging.cursors.before})}>Prev</Button>
            </Col>
            <Col span={12}>
                <Button onClick={() => handlePaging({after: paging.cursors.after})}>Next</Button>
            </Col>
        </Row>
    </Row>
    }
    else return <Loading />
}

export default Posts;