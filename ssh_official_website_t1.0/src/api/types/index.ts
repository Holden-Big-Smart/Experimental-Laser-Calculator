/** 发表回复*/
export interface addAnswerParam {
  /** 留言内容*/
  content?: string
  /** 留言id*/
  qid?: number
}
/** 发表留言*/
export interface addQuesParam {
  /** 留言内容*/
  content?: string
  /** 联系方式*/
  tel?: string
  /** 邮箱*/
  email?: string
  /** 地址*/
  address?: string
  /** 序号*/
  other1?: string
  /** 其他*/
  other1?: string
}
/** 回答列表*/
export interface getAnswerListParam {
  /** 起始页码从1开始*/
  page?: number
  /** 每页10个数量*/
  pageSize?: number
  /** 留言id*/
  qid?: number
}
/** 留言列表*/
export interface getQuesListParam {
  /** 起始页码从1开始*/
  page?: number
  /** 每页10个数量*/
  pageSize?: number
  /** 关键字*/
  key?: string
}
