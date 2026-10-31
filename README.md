# Astro 文档实验室

一个中文 Astro + Starlight 示例文档站，涵盖新建文档、Markdown 元素和内置 MDX 组件。所有示例均有可查看或复制的源码。

## 开始使用

使用支持项目当前 Astro 版本的 Node.js（本地验证版本为 Node.js 24），以及 pnpm。

```sh
pnpm install
pnpm astro dev --background
pnpm astro dev status
```

根据终端输出打开本地地址，默认是 `http://localhost:4321`。

```sh
pnpm astro dev logs
pnpm astro dev stop
pnpm build
pnpm preview
```

构建产物位于 `dist/`。生产搜索在构建后的预览中验证。

## 示例内容

| 页面 | 源码 | 地址 |
| --- | --- | --- |
| 文档首页 | `src/content/docs/index.mdx` | `/` |
| 如何添加一篇文档 | `src/content/docs/guides/adding-documents.mdx` | `/guides/adding-documents/` |
| Markdown 元素示例 | `src/content/docs/examples/markdown.md` | `/examples/markdown/` |
| 内置 MDX 组件 | `src/content/docs/examples/components.mdx` | `/examples/components/` |
| 页面配置速查 | `src/content/docs/reference/frontmatter.md` | `/reference/frontmatter/` |

Markdown 示例包含标题、链接、代码高亮、增删行、四种提示框、表格、列表、引用、图片、文本文件树和折叠内容。

MDX 示例覆盖当前 Starlight 导出的全部 12 个正文组件：`Aside`、`Badge`、`Card`、`CardGrid`、`Code`、`FileTree`、`Icon`、`LinkButton`、`LinkCard`、`Steps`、`Tabs`、`TabItem`。`Code` 直接读取 `src/examples/hello.ts` 展示真实源码。

## 添加自己的文档

1. 在 `src/content/docs/guides/` 下新建 `.md` 或 `.mdx`。
2. 在文件顶部添加 frontmatter，例如 `title` 和 `description`。
3. 编写正文；需要组件时使用 `.mdx` 并导入组件。
4. 本项目自动生成分组导航，用 `sidebar.order` 设置顺序。
5. 执行 `pnpm build` 并预览检查。

为确保当前版本的 `FileTree` 在生产构建中可用，项目显式声明了 `satteri` 开发依赖，并在 Vite 配置中将其保留为外部模块，以正确加载原生解析组件。

站点标题、中文界面和导航分组在 `astro.config.mjs` 配置。页面路径示例以根目录部署为前提。源码公开到 GitHub 不等于自动部署站点；GitHub Pages 部署还需配置站点地址、子路径和部署流程。

## 官方资料

- [Astro 文档](https://docs.astro.build/zh-cn/)
- [Starlight 文档](https://starlight.astro.build/zh-cn/)
- [正文组件参考](https://starlight.astro.build/components/using-components/)
