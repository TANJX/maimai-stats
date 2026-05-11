import type { Dict } from "./types";

export const zh: Dict = {
  hero: {
    eyebrow: "MAIMAI · 街机价格",
    updated: (date) => `更新于 ${date}`,
    headlineLead: "maimai 出勤哪家",
    headlineEm: "最香",
    headlineTrail: "？",
    subhead:
      "纽约市和新泽西北部的街机厅,按一局的实际花费排名。所有价格以美元计;开卡费不计入每局价格。",
  },
  howto: {
    section: "怎么看这份榜单",
    practical: {
      term: "实用每局价",
      body: "最接近 $50 充值档的每局价格——一次普通走访的真实价位。",
      bodyEm: "$50 充值",
    },
    bestcase: {
      term: "最低每局价",
      body: "如果你愿意一次买顶档套餐,理论上能拿到的最低每局价格。",
    },
    vip: {
      term: "VIP 每局价",
      bodyLead: "并不是每家的 “VIP” 都一样。",
      bodyMid:
        " 价格差异很大——从每年小额年费,到一次性升级卡,再到 $20+/月 的订阅。VIP 每局价是 ",
      bodyEm: "已付费",
      bodyTrail: " 之后的实际单价;会员费不计入其中。每张卡片的备注里有具体的回本计算。",
    },
  },
  leaderboard: {
    section: "排行榜",
    rankBy: "排序方式",
    practical: "实用价",
    best: "最低价",
    vip: "VIP 优先",
    filterBy: "服务器",
    all: "全部",
    international: "国际服",
    mythos: "Mythos",
  },
  card: {
    rankNum: (rank) => `#${rank}`,
    perRound: (units, unit) => `每局 ${units} ${unit}`,
    regular: "普通",
    vipTab: "VIP",
    practicalLabel: "实用价",
    bestLabel: "最低价",
    pack: (spend) => `$${spend} 套餐`,
    vipPack: (spend) => `$${spend} VIP 套餐`,
    pricingCurve: "价格曲线",
    legendBest: "最划算",
    legendPopular: "最受欢迎",
    legendTrap: "陷阱档",
    showAll: "展开全部档位与备注",
    hideAll: "收起全部档位与备注",
  },
  tiers: {
    spend: "充值",
    perUnit: (unit) => `每${unit}单价`,
    perRound: "每局价",
    perRoundVip: "每局价 VIP",
    flagBest: "最佳",
    flagPopular: "热门",
    flagTrap: "陷阱",
    cardFee: (fee) => `开卡费 $${fee}(不计入每局价格)。`,
    cardFeeVip: (fee, vipFee) =>
      `开卡费:普通 $${fee} · VIP $${vipFee}(不计入每局价格)。`,
  },
  compare: {
    section: "横向对比",
    arcade: "街机厅",
    area: "地区",
    perRound: "每局消耗",
    practical: "实用价",
    best: "最低价",
    vipPractical: "VIP 实用价",
    vipBest: "VIP 最低价",
  },
  footer: {
    sig: "maimai 价格日志 · 个人长期记录",
    lastWalkedLead: "最近一次到访:",
    caveatPre:
      "数据来自现场充值机标价。仅限柜台办理的会员、计时游玩、限时促销均未计入。每次到访都会核对;欢迎在 ",
    caveatPost: " 上提交修正。",
  },
};
