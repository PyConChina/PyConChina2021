# PyCon China 2021 官方网站


## 说明

本项目基于 Next.js 开发

## 系统需求

- Node.js 12.0 或以上
- 支持 MacOS、Windows (包括 WSL)以及 Linux

## 开发

```bash
# 安装依赖
yarn install
# 启动本地开发服务器
yarn dev
```

使用浏览器访问 http://localhost:3000

**注意：推送提交至 GitHub 将会触发持续集成，部署至远程服务器。**

## 数据说明

`data/` 目录下包含一些数据文件方便修改：

- `index.yaml` 首页数据
- `schedule.yaml` 时间表
- `contents/` 对应页面的 Markdown 文档
- `meetups/` Meetup 页面的 Markdown 文档
- `locales/` 翻译文件
