import Rank from '../../service/rank'

Page({
  data: {
    rankList: [],
  },
  onLoad() {
    this.getData()
  },
  getData() {
    Rank.getList(rankList => {
      this.setData({ rankList })
      wx.stopPullDownRefresh()
    })
  },
  onPullDownRefresh() {
    this.getData()
  },
  tapRankItem(event) {
    const index = event.currentTarget.dataset.index
    const rankList = this.data.rankList
    rankList[index].open = !rankList[index].open
    this.setData({ rankList })
  },
  onShareAppMessage() {
    return {
      title: 'TOP100的前端框架排名',
      path: '/page/index/index',
    }
  },
})
