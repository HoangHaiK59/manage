

export const getAppToken = () => {
    window.FB.api(
        `/oauth/access_token`,
        'GET',
        {
            client_id: '510765909792429',
            client_secret: 'bc9576b974be7435f3df39bc2152473b',
            grant_type: 'client_credentials'
        },
        function(response) {
            console.log(response);
            if(response) {
                localStorage.setItem('appAccessToken', JSON.stringify(response))
            }
        }
    )
};

export const verifyToken = (token) => {
    window.FB.api(
        `/debug_token`,
        'GET',
        {
            input_token: token,
            access_token: '510765909792429|bc9576b974be7435f3df39bc2152473b'
        },
        function(response) {
            console.log(response)
        }
    )
};