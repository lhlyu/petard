# 表设计

## 用户表

| 字段            | 类型          | 描述  |
| :-------------:|:-------------:|:-----:|
| id             | int           | 主键  |
| account        | varchar(20)   | 账号  |
| nick_name      | varchar(20)   | 昵称  |
| password       | varchar(32)   | 密码  |
| source         | varchar(20)   | 来源  |
| avatar         | varchar(200)  | 头像  |
| bio            | varchar(200)  | Bio  |
| url            | varchar(200)  | 个人地址  |
| ip             | varchar(39)   | IPv4/IPv6  |
| identity       | tinyint       | 身份  |
| state          | tinyint       | 用户状态  |
| last_at        | bigint        | 最近登陆  |
| created_at     | bigint        | 创建时间戳 |
| updated_at     | bigint        | 更新时间戳 |

## 文章表

| 字段            | 类型          | 描述  |
| :-------------:|:-------------:|:-----:|
| id             | int           | 主键  |
| title          | varchar(100)  | 标题  |
| summary        | varchar(200)  | 摘要  |
| cover          | varchar(200)  | 封面  |
| top            | int           | 置顶值，越大越靠前  |
| category_id    | int           | 分类ID  |
| tags           | varchar(100)  | 标签，英文逗号隔开  |
| password       | varchar(32)  | 浏览密码  |
| content        | text          | 文章内容，取决于存储方式  |
| view_count     | int           | 浏览次数 |
| comment_count  | int           | 评论数量 |
| kind           | tinyint       | 文章类型 |
| store_mode     | tinyint       | 存储方式 |
| state          | tinyint       | 文章状态 |
| comment_state  | tinyint       | 评论状态 |
| created_at     | bigint        | 创建时间戳 |
| updated_at     | bigint        | 更新时间戳 |

## 评论表

| 字段            | 类型          | 描述  |
| :-------------:|:-------------:|:-----:|
| id             | int           | 主键  |
| article_id     | int           | 文章ID |
| content        | text          | 内容   |
| user_id        | int           | 评论人   |
| user_ext       | varchar(300)  | 评论人扩展信息，可以存头像/昵称等信息   |
| at_id          | int           | 艾特人主键ID   |
| at_user_id     | int           | 艾特人   |
| at_user_ext    | varchar(300)  | 艾特人扩展信息，可以存头像/昵称等信息   |
| state          | tinyint       | 评论状态 |
| created_at     | bigint        | 创建时间戳 |
| updated_at     | bigint        | 更新时间戳 |

## 分类表

| 字段            | 类型          | 描述  |
| :-------------:|:-------------:|:-----:|
| id             | int           | 主键  |
| name          | varchar(20)    | 分类名   |
| color         | varchar(50)    | 颜色   |
| count         | int            | 关联文章数量  |
| state          | tinyint       | 分类状态 |
| created_at     | bigint        | 创建时间戳 |
| updated_at     | bigint        | 更新时间戳 |

## 配置表

| 字段            | 类型          | 描述  |
| :-------------:|:-------------:|:-----:|
| id             | int           | 主键  |
| key            | varchar(20)   | Key   |
| value          | varchar(20)   | Value |
| state          | tinyint       | 状态  |
| created_at     | bigint        | 创建时间戳 |
| updated_at     | bigint        | 更新时间戳 |

## 字典表

| 字段            | 类型          | 描述  |
| :-------------:|:-------------:|:-----:|
| id             | int           | 主键  |
| target         | varchar(30)   | 目标字段(表名:字段名)  |
| key            | varchar(20)   | Key   |
| value          | varchar(20)   | Value |
