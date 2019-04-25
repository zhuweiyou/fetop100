import { getRankList } from "../../common/api";

Page({
  data: {
    rankList: [],
    githubUrl: "https://github.com/zhuweiyou/fetop100"
  },
  onLoad() {
    this.getData();
  },
  onPullDownRefresh() {
    this.getData();
  },
  getData() {
    wx.showNavigationBarLoading();
    getRankList(rankList => {
      this.setData({ rankList });
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
    });
  },
  copyGithubUrl() {
    wx.setClipboardData({ data: this.data.githubUrl });
  },
  onShareAppMessage() {
    return {
      title: "TOP100的前端框架排名",
      path: "/page/index/index"
    };
  }
});
