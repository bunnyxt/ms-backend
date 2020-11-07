<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> English | [简体中文](./README_zh-CN.md)
```
CAUTION: This program is related to VOCALOID CHINA, so the most of the documentations are written in Chinese. Sorry for inconvenience.
```

<h1 align="center">
<b>ms-backend</b>
</h1>

<div align="center">
Backend program of VOCALOID CHINA (VC) milestone (ms in short) project, using Express + GraphQL + MySQL.
</div>

## Introduction

VC Milestone Project is part of TianDian Daily Project. We are devoted to provide an open platform for recording the time when view count of BiliBili VC-related videos have reached special numbers (100K, 1M, 10M, etc.). Anyone can add, modify, and query video view records on this platform.

Until the update of this document (November 8, 2020), this project is still in the early stages of development. Platform requirements, interaction logic, interface design, and database design have not been finalized. Major changes may occur. Please follow this project on GitHub, or join the QQ group [537793686](https://jq.qq.com/?_wv=1027&k=588s7nw) to contact us. Feel free to contact us for discussions and suggestions!

## Environment

- `NodeJS` `v12.18.2`
- `MySQL` `v5.7.30`

## Getting Started

- Run `git clone https://github.com/bunnyxt/ms-backend.git` or click green button `Code -> Download ZIP` at the top right of the webpage to download program code
- Run `cd ms-backend` to enter program folder
- Edit `.env` file and fill in the configurations，take [.env配置项说明](doc/dotenv.md) as a reference
- Run `npm install` to install dependencies
- Run `npm run dev` for development or `npm run start` for production
