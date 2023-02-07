import { baseUrl } from 'config';
export const typeMap = {
    1: {
        icon: 'canyin'
    },
    2: {
        icon: 'fushi'
    },
    3: {
        icon: 'jiaotong'
    },
    4: {
        icon: 'riyong'
    },
    5: {
        icon: 'gouwu'
    },
    6: {
        icon: 'xuexi'
    },
    7: {
        icon: 'yiliao'
    },
    8: {
        icon: 'lvxing'
    },
    9: {
        icon: 'renqing'
    },
    10: {
        icon: 'qita'
    },
    11: {
        icon: 'gongzi'
    },
    12: {
        icon: 'jiangjin'
    },
    13: {
        icon: 'zhuanzhang'
    },
    14: {
        icon: 'licai'
    },
    15: {
        icon: 'tuikuang'
    },
    16: {
        icon: 'qita'
    }
};
export const REFRESH_STATE = {
    normal: 0,
    pull: 1,
    drop: 2,
    loading: 3,
    success: 4,
    failure: 5, // 加载失败
};
export const LOAD_STATE = {
    normal: 0,
    abort: 1,
    loading: 2,
    success: 3,
    failure: 4,
    complete: 5, // 加载完成（无新数据）
};
const MODE = import.meta.env.MODE;
export const imgUrlTrans = (url) => {
    if (url && url.startsWith('http')) {
        return url;
    }
    else {
        url = `${MODE == 'development' ? 'http://127.0.0.1:7001' : baseUrl}${url}`;
        return url;
    }
};
//# sourceMappingURL=index.js.map