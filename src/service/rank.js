export default {
  getList (cb) {
    const retry = () => setTimeout(() => this.getList(cb), 3000)
    wx.request({
      url: 'https://www.awesomes.cn/rank?sort=trend',
      header: {
        'accept-language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4',
        'content-type': 'text/html; charset=utf-8'
      },
      success: ({data}) => {
        try {
          data = JSON.parse(data.match(/"data":\[\{"repos":(.*?),"sort":"trend"/).pop()).map(item => ({
            id: item.id,
            icon: `https://awesomes.oss-cn-beijing.aliyuncs.com/repo/${item.cover}?x-oss-process=style/subject_repo`,
            name: item.name,
            detail: item.description_cn
          }))
          cb(data)
        } catch (e) {
          retry()
        }
      },
      fail: retry
    })
  }
}
