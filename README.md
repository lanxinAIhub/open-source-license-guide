# 🔍 Open Source License Guide

> AI驱动的开源许可证交互式选择指南

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-green.svg)](https://www.gnu.org/licenses/gpl-3.0)

## 📖 项目简介

本项目提供交互式引导，帮助开发者和开源项目维护者选择最适合的开源许可证。

## 🎯 支持的许可证

| 许可证 | 特点 | 适用场景 |
|--------|------|----------|
| MIT | 宽松简单 | 绝大多数开源项目 |
| Apache 2.0 | 专利授权保护 | 需要专利保护的项目 |
| GPL v3 | 传染性强 | 希望代码必须开源的项目 |
| BSD | 宽松无专利条款 | 简单BSD系列项目 |
| AGPL | 网络使用也开源 | SaaS服务项目 |
| CC0 | 公有领域 | 放弃所有权利 |

## 🚀 快速开始

### Web 界面

```bash
cd docs
# 直接用浏览器打开 index.html
```

### 许可证判断流程

```
你的代码是否需要强制开源？
├── 否 → MIT / BSD / Apache 2.0
└── 是
    ├── 是否允许修改后闭源？
    │   ├── 否 → GPL v3 / AGPL v3
    │   └── 是 → MPL 2.0 / LGPL
    └── 是否涉及网络使用？
        └── 是 → AGPL v3
```

## 📁 项目结构

```
open-source-license-guide/
├── docs/
│   ├── index.html     # 交互式Web界面
│   ├── app.js         # 应用逻辑
│   ├── licenses.js    # 许可证数据
│   ├── style.css      # 样式
│   └── readme.md      # 文档
└── README.md          # 本文件
```

## 🤝 贡献

欢迎提交 Issue 或 Pull Request 来完善许可证数据。

## 📄 License

本项目采用 MIT License，详见 [LICENSE](./LICENSE) 文件。
