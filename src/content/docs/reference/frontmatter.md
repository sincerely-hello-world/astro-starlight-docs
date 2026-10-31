---
title: 页面配置速查
description: 当前项目中常用的 frontmatter、导航配置和发布检查。
sidebar:
  order: 1
---

## 一份可复制的页面头部

每个文档以两行 `---` 包围的 YAML 配置开头。下面的字段可以用于 `.md` 和 `.mdx`：

```yaml title="文档 frontmatter"
---
title: 安装指南
description: 介绍安装条件、步骤和验证方法。
sidebar:
  label: 安装
  order: 2
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 3
draft: false
---
```

| 字段 | 用途 | 使用建议 |
| --- | --- | --- |
| `title` | 页面标题，必填 | 正文通常从二级标题开始 |
| `description` | 页面元信息摘要 | 用一句话说明读者能获得什么 |
| `sidebar.label` | 自动导航中使用的名称 | 标题太长时使用短名称 |
| `sidebar.order` | 自动导航中的排序 | 数字越小越靠前 |
| `sidebar.hidden` | 从自动导航中隐藏 | 页面仍可能通过地址访问 |
| `tableOfContents` | 页内目录层级，或设为 `false` | 按正文结构选择层级 |
| `draft` | 草稿状态 | `true` 时不进入生产构建 |
| `slug` | 自定义页面路径 | 修改后检查所有引用链接 |
| `template` | `doc` 或 `splash` 页面模板 | `splash` 适合不显示侧边栏的首页 |

:::caution[隐藏导航与草稿不同]
`sidebar.hidden: true` 仅控制自动侧边栏，不会阻止页面发布。尚未准备好的内容应使用 `draft: true`；草稿仍可在开发模式查看。不要将秘密信息写进将要公开的仓库。
:::

## 给页面加导航徽章

用于自动生成的导航项：

```yaml
sidebar:
  order: 3
  badge:
    text: 新增
    variant: tip
```

## 站点配置与页面配置

- `astro.config.mjs`：站点标题、语言、侧边栏分组和社交链接。
- `src/content.config.ts`：文档内容集合和 frontmatter 校验规则。
- 文档文件顶部：当前页面的标题、描述和排序。

本项目使用根语言 `zh-CN`，页面直接位于 `src/content/docs/`，不需要再套一层 `zh-cn/` 文件夹：

```js title="astro.config.mjs · starlight 配置片段"
locales: {
  root: { label: '简体中文', lang: 'zh-CN' },
},
```

## 提交前检查

1. 执行 `pnpm build`，确认没有 frontmatter、MDX 或组件错误。
2. 执行 `pnpm preview`，检查新页面、导航、页内目录和搜索。
3. 检查代码块是否标注了语言，内部链接是否指向存在的页面。
4. 确认公开仓库中没有访问密钥或未准备公开的内容。

GitHub 公开仓库用于托管源码，**不会自动把文档站部署到 GitHub Pages**。部署时还要根据实际域名和路径配置 `site` / `base`，并设置部署流程。

## 官方参考

- [Frontmatter 完整参考](https://starlight.astro.build/reference/frontmatter/)
- [Starlight 配置参考](https://starlight.astro.build/reference/configuration/)
- [侧边栏导航](https://starlight.astro.build/guides/sidebar/)
- [语言与根目录配置](https://starlight.astro.build/guides/i18n/)
