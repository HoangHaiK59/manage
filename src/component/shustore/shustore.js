import React, { useEffect, useState } from 'react';
import { Descriptions } from 'antd';
import { useUpdateTitle, useVerify } from '../../utils';
import { Loading } from '../content/loading/loading';

import { Tabs, List } from 'antd';
import { connect } from 'react-redux';
const { TabPane } = Tabs;

const useFetch = (pageId, access_token) => {
    const [response, setResponse] = useState(null);
    useEffect(() => {
        window.FB.api(
            `/${pageId}`,
            'GET',
            {
                access_token: access_token,
                fields: ['about', 'attire', 'bio', 'location', 'parking', 'hours', 'emails', 'website']
            },
            function (response) {
                console.log(response);
                setResponse(response);
            }
        )
    }, [pageId, access_token])
    return response;
}

const useFetchRating = (pageId, access_token) => {
    const [response, setResponse] = useState(null);
    useEffect(() => {
        window.FB.api(
            `/${pageId}`,
            'GET',
            {
                fields: 'ratings{open_graph_story,recommendation_type,has_review}',
                access_token: access_token
            },
            function (response) {
                console.log(response);
                setResponse(response);
            }
        )
    }, [pageId, access_token])
    return response;
}

const Store = ({ title, handleVerify, ...props }) => {
    useUpdateTitle(title);
    useVerify(() => handleVerify(props.loginStatus.authResponse.accessToken));
    const response = useFetch('111876070200048', props.loginStatus.authResponse.accessToken);
    const rating = useFetchRating('111876070200048', props.loginStatus.authResponse.accessToken);
    console.log(rating)
    if (response && rating)
        return <div style={{ minWidth: 600, minHeight: 600, marginTop: 25 }}>
            <Tabs defaultActiveKey="info">
                <TabPane tab="Infomation" key="info">
                    <Descriptions title="Page Infomation" style={{ top: 20 }}>
                        <Descriptions.Item label="ID">{response.id}</Descriptions.Item>
                        <Descriptions.Item label="About">{response.about}</Descriptions.Item>
                        <Descriptions.Item label="Emails">{response.emails}</Descriptions.Item>
                        <Descriptions.Item label="Address">
                            {response.location.street + ',' + response.location.country}
                        </Descriptions.Item>
                    </Descriptions>
                </TabPane>
                <TabPane tab="Rating" key="rating">
                    <div>
                        <List>
                            <List.Item>1</List.Item>
                            <List.Item>2</List.Item>
                        </List>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    else {
        return <Loading />
    }
}

const mapState = state => ({
    loginStatus: state.facebook.loginStatus
});

const mapDispatch = dispatch => ({

})

export default connect(mapState, mapDispatch) (Store);