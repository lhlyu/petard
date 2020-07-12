# 字典

## 用户字典

| 目标字段        | Key          | Value  |  备注 |
| :-------------:|:-------------:|:-----:|:-----:|
| user:identity  | 1           |  普通 | 用户身份 |
| user:identity  | 2           |  好友 | 用户身份 |
| user:identity  | 3           |  管理员 | 用户身份 |
| user:state     | 1           |  正常 | 用户状态 |
| user:state     | 2           |  黑名单 | 用户状态 |


## 文章字典

| 目标字段        | Key          | Value  |  备注 |
| :-------------:|:-------------:|:-----:|:-----:|
| article:kind                 | 1           |  普通 | 文章类型 |
| article:kind                 | 2           |  灵感 | 文章类型 |
| article:kind                 | 3           |  关于 | 文章类型 |
| article:store_mode           | 1           |  文件模式 | 存储方式 |
| article:store_mode           | 2           |  text模式 | 存储方式 |
| article:state                 | 1           |  草稿 | 文章状态 |
| article:state                 | 2           |  待审核 | 文章状态 |
| article:state                 | 3           |  已发布 | 文章状态 |
| article:state                 | 4           |  废弃 | 文章状态 |
| article:comment_state         | 1           |  开放 | 评论状态 |
| article:comment_state         | 2           |  关闭 | 评论状态 |

## 评论字典

| 目标字段        | Key          | Value  |  备注 |
| :-------------:|:-------------:|:-----:|:-----:|
| comment:state     | 1           |  待审核 | 评论状态 |
| comment:state     | 2           |  正常 | 评论状态 |
| comment:state     | 3           |  禁用 | 评论状态 |
| comment:ext     | a           |  头像 | 用户扩展信息 |
| comment:ext     | n           |  昵称 | 用户扩展信息 |
| comment:ext     | u           |  个人地址 | 用户扩展信息 |
| comment:ext     | t           |  文章title | 用户扩展信息 |
| comment:ext     | c           |  At用户的评论内容 | 用户扩展信息 |


## 分类字典

| 目标字段        | Key          | Value  |  备注 |
| :-------------:|:-------------:|:-----:|:-----:|
| category:state     | 1           |  正常 | 分类状态 |
| category:state     | 2           |  禁用 | 分类状态 |

## 配置字典

| 目标字段        | Key          | Value  |  备注 |
| :-------------:|:------------:|:-----:|:-----:|
| quanta:state   | 1            |  正常 | 配置状态 |
| quanta:state   | 2            |  禁用 | 配置状态 |
