export function getRankList(callback) {
  const retry = () => setTimeout(() => getRankList(callback), 3000);
  wx.request({
    url: "https://www.awesomes.cn/rank?sort=trend",
    header: {
      "accept-language": "zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4",
      "content-type": "text/html; charset=utf-8"
    },
    success: ({ data }) => {
      try {
        const list = data.match(
          /<div class="list-item">([\s\S]*?)<\/span>[\s\S]*?<\/div>[\s\S]*?<\/div>/g
        );
        if (!list || !list.length) {
          return retry();
        }
        callback(
          list.reduce((array, item) => {
            const [all, icon, name, detail] = item.match(
              /<img src="([\s\S]*?)"[\s\S]*?<h4>([\s\S]*?)<\/h4>[\s\S]*?<span class="sdesc">([\s\S]*?)<\/span>/
            );
            return [...array, { icon, name, detail }];
          }, [])
        );
      } catch (e) {
        retry();
      }
    },
    fail: retry
  });
}
