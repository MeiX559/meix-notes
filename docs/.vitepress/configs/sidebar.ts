import type { DefaultTheme } from 'vitepress'
import { fe } from './fe'
import { pit } from './pit'
import { daily } from './daily'
import { tools } from './tools'
import { sourceCode } from './sourceCode'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/fe/': fe, //JavaScript基础知识
  '/pit/': pit, //踩坑记录
  '/daily/': daily, //日常记录
  '/tools/': tools, //常用工具/方法
  '/sourceCode': sourceCode //源码
}
