import { createRouter, createWebHistory } from "vue-router";

const Index = () => import("../views/Index.vue");

const Video = () => import("../views/Video/Video.vue");
const DiscoverMusic = () => import("../views/DiscoverMusic/DiscoverMusic.vue");
const Collect = () => import("../views/Collect/Collect.vue");
const DailyRecommend = () =>
    import("../views/DailyRecommend/DailyRecommend.vue");

const PersonalityRecommend = () =>
    import(
        "../views/DiscoverMusic/PersonalityRecommend/PersonalityRecommend.vue"
    );
const PlayList = () => import("../views/DiscoverMusic/PlayList/PlayList.vue");
const MusicRank = () =>
    import("../views/DiscoverMusic/MusicRank/MusicRank.vue");
const Singer = () => import("../views/DiscoverMusic/Singer/Singer.vue");

const MusicListDetail = () =>
    import("../views/MusicListDetail/MusicListDetail.vue");
const SearchResultDetail = () =>
    import("../views/SearchResultDetail/SearchResultDetail.vue");
const AccountDetail = () => import("@/views/AccountDetail/AccountDetail.vue");
const EditAccount = () => import("@/views/EditAccount/EditAccount.vue");
const LoveMusic = () => import("@/views/LoveMusic/LoveMusic.vue");

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: "/index",
        },
        {
            path: "/index",
            redirect: "/discoverMusic",
            component: Index,
            children: [
                {
                    path: "/discoverMusic",
                    redirect: "/discoverMusic/personalityRecommend",
                    component: DiscoverMusic,
                    children: [
                        {
                            path: "/discoverMusic/personalityRecommend",
                            component: PersonalityRecommend,
                        },
                        {
                            path: "/discoverMusic/playList",
                            component: PlayList,
                        },
                        {
                            path: "/discoverMusic/musicRank",
                            component: MusicRank,
                        },
                        {
                            path: "/discoverMusic/singer",
                            component: Singer,
                        },
                    ],
                },
                {
                    path: "/musicListDetail/:id",
                    name: "musicListDetail",
                    component: MusicListDetail,
                },
                {
                    path: "/video",
                    component: Video,
                },
                {
                    path: "/loveMusic",
                    redirect: "musicListDetail",
                    // component: LoveMusic,
                },
                {
                    path: "/collect",
                    component: Collect,
                },
                {
                    path: "/dailyRecommend",
                    component: DailyRecommend,
                },
                {
                    path: "/searchResult/:content",
                    name: "searchResult",
                    component: SearchResultDetail,
                },
                {
                    path: "/accountDetail/:uid",
                    name: "accountDetail",
                    component: AccountDetail,
                },
                {
                    path: "/editAccount/:uid",
                    name: "editAccount",
                    component: EditAccount,
                },
            ],
        },
    ],
});

export default router;
