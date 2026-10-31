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

## GitHub Pages 自动发布

本项目已配置 `.github/workflows/deploy.yml`。每次推送到 `main`，GitHub Actions 会使用 Node.js 24 与 pnpm 11.23.0 安装锁定的依赖、构建文档，再将构建产物发布到 GitHub Pages。也可以在 Actions 页面使用 **Run workflow** 手动发布。

- 在线地址：[Astro 文档实验室](https://sincerely-hello-world.github.io/astro-starlight-docs/)
- 构建记录：[GitHub Actions](https://github.com/sincerely-hello-world/astro-starlight-docs/actions/workflows/deploy.yml)
- 首次设置：仓库 **Settings → Pages → Source** 选择 **GitHub Actions**。

GitHub Pages 工作流把 `configure-pages` 返回的站点域名和路径分别传入 `SITE_URL`、`BASE_PATH`。普通仓库、用户主页仓库和自定义域名均使用平台实际返回的路径。若构建失败，不会执行发布，已有站点会继续提供服务。

## Cloudflare 的根路径与可选子路径

默认入口为 [starlight.luckycyan.com](https://starlight.luckycyan.com/)，不需要申请账户功能。构建时可以设置：

| 构建环境变量 | 默认值 | 用途 |
| --- | --- | --- |
| `BASE_PATH` | `/` | 设为 `/docs` 可发布到 `/docs/` |
| `SITE_URL` | `https://starlight.luckycyan.com` | 换域名时设置成自己的站点地址 |

保持 Build command 为 `pnpm run build`、Deploy command 为 `npx wrangler@latest deploy`。构建脚本根据实际 `BASE_PATH` 生成 `dist-cloudflare/` 的目录结构，完全不使用 `assets.base_path`。使用子路径时，域名根路径会自动跳转到该子路径。

正文和 MDX 的站内 `href` 使用相对页面地址，例如从 `/examples/components/` 链接到 `/guides/adding-documents/`，写成 `../../guides/adding-documents/`。这种写法在根路径、`/docs/` 和 GitHub Pages 仓库路径下都有效。侧边栏的 `slug` 与自动生成的 `directory` 仍使用文档标识。

包名称、仓库名称、Worker 名称和 URL 前缀是不同设置。更改名称不会自动改变 Cloudflare 的访问路径。

## 官方参考

- [Frontmatter 完整参考](https://starlight.astro.build/reference/frontmatter/)
- [Starlight 配置参考](https://starlight.astro.build/reference/configuration/)
- [侧边栏导航](https://starlight.astro.build/guides/sidebar/)
- [语言与根目录配置](https://starlight.astro.build/guides/i18n/)
