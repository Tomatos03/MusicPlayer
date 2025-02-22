import { request } from "@/network/request";
import { getTimeStamp } from "@/utils/utils";

// const apiUrl = 'http://localhost:3000';

export const getAccountById = async (id) => {
    const res = await request("/user/detail", {
        uid: id,
    });
    return res.data;
};

export const getSongById = async (_id) => {
    const res = await request("/song/detail", {
        ids: _id,
    });
    // console.log(res);
    return res.data.songs[0];
};

export const getBanners = async () => {
    const res = await request("/banner");
    return res.data.banners;
};

// type, 默认值为1
// 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音
export const getSearchResultByWord = async (searchContent, _type) => {
    const res = await request("/search", {
        keywords: searchContent,
        type: _type,
    });
    return res.data.result;
};

export const getHotSearchList = async () => {
    const res = await request("/search/hot/detail");
    return res.data.data;
};
export const getCurrentAccount = async () => {
    const res = await request("/user/account", {
        timestamp: getTimeStamp(),
    });
    return res.data;
};

export const getPlayListInfo = async (_id) => {
    const res = await request("/playlist/detail", {
        id: _id,
    });
    return res.data.playlist;
};

export const getPlayListSongInfo = async (_id) => {
    const res = await request("/playlist/track/all", {
        id: _id,
    });
    return res.data.songs;
};

export const getSongUrlById = async (_id) => {
    // const res = await request("/song/url", { id: _id });
    // return res;
};

export const getUserPlayListById = async (id) => {
    const res = await request("/user/playlist", {
        uid: id,
    });
    return res.data.playlist;
};

export const getRecommendPlayList = async (_limit) => {
    const res = await request("/personalized", { limit: _limit });
    return res.data.result;
};
