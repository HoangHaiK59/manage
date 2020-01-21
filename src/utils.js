import React from 'react';
import {Icon} from 'antd';

export const useUpdateTitle = title => {
    React.useEffect(() => {
        document.title = title;
    },[title])
};

export const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

export const useVerify = (fn) => {
    const ref = React.useRef();
    React.useEffect(() => {
        ref.current = fn
    });

    React.useEffect(() => {
        ref.current()
    })
}
