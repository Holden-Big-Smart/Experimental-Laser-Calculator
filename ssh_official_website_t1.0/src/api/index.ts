import { addAnswerParam, addQuesParam, getAnswerListParam, getQuesListParam } from "./types"
import { BaseEntity } from "../types/api-types"
import { AxiosRequestConfig } from "axios"
import request from "@/utils/request"

/** 发表回复*/
export function addAnswer(params?: addAnswerParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/addAnswer",
    method: "post",
    params,
    ...config
  })
}

/** 发表留言*/
export function addQues(params?: addQuesParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/addQues",
    method: "post",
    params,
    ...config
  })
}

/** 回答列表*/
export function getAnswerList(params?: getAnswerListParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/getAnswerList",
    method: "get",
    params,
    ...config
  })
}

/** 留言列表*/
export function getQuesList(params?: getQuesListParam, config?: AxiosRequestConfig) {
  return request<BaseEntity>({
    url: "/api/getQuesList",
    method: "get",
    params,
    ...config
  })
}
