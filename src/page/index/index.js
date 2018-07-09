import Rank from '../../service/rank'

Page({
  data: {
    rankList: [],
    githubUrl: 'https://github.com/zhuweiyou/fetop100',
  },
  onLoad() {
    this.getData()
  },
  onPullDownRefresh() {
    this.getData()
  },
  getData() {
    wx.showNavigationBarLoading()
    Rank.getList(rankList => {
      this.setData({ rankList })
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
    })
  },
  tapRankItem(event) {
    const index = event.currentTarget.dataset.index
    const rankList = this.data.rankList
    rankList[index].open = !rankList[index].open
    this.setData({ rankList })
  },
  copyGithubUrl() {
    wx.setClipboardData({ data: this.data.githubUrl })
  },
  onShareAppMessage() {
    return {
      title: 'TOP100的前端框架排名',
      path: '/page/index/index',
    }
  },
})
