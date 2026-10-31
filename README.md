# Astro 文档实验室

一个中文 Astro + Starlight 示例文档站，涵盖新建文档、Markdown 元素和内置 MDX 组件。所有示例均有可查看或复制的源码。

## 开始使用

使用支持项目当前 Astro 版本的 Node.js（本地验证版本为 Node.js 24），以及 pnpm。

```sh
pnpm install
pnpm astro dev --background
pnpm astro dev status
```

根据终端输出打开本地地址，默认是 `http://localhost:4321/`。

```sh
pnpm astro dev logs
pnpm astro dev stop
pnpm build
pnpm preview
```

构建产物位于 `dist/`；同一次构建还会生成用于 Cloudflare Workers 的 `dist-cloudflare/`。生产搜索在构建后的预览中验证。

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

站点标题、中文界面和导航分组在 `astro.config.mjs` 配置。本地开发与 Cloudflare 默认从域名根路径 `/` 访问。URL 前缀由 `BASE_PATH` 控制，与项目、包、仓库及 Worker 名称分开。

## 自动发布到 GitHub Pages

在线文档：<https://sincerely-hello-world.github.io/astro-starlight-docs/>

部署流程位于 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)：

1. 每次推送到 `main`，自动使用 Node.js 24 和 pnpm 11.23.0 安装依赖并构建。
2. 构建成功后上传 `dist/` 并发布到 GitHub Pages；构建失败时不会覆盖已发布的站点。
3. 也可以在 [Actions](https://github.com/sincerely-hello-world/astro-starlight-docs/actions/workflows/deploy.yml) 页面选择 **Run workflow** 手动运行。

首次启用时，在仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。流程使用 GitHub 自动提供的令牌，不需要上传 SSH 私钥或配置额外密钥。

工作流通过 `actions/configure-pages` 读取当前 Pages 的域名和路径，再分别传入 `SITE_URL` 与 `BASE_PATH`。换仓库名、用户主页仓库或使用自定义域名时，发布路径由平台提供。正文与首页链接使用页面之间的相对地址，不写入仓库名称；Starlight 侧边栏的 `slug` 保持使用文档标识。

## 发布到 Cloudflare Workers

连接同一个 GitHub 仓库，生产分支选择 `main`，使用 Node.js 24，并填写：

| 配置 | 命令 |
| --- | --- |
| Build command | `pnpm run build` |
| Deploy command | `npx wrangler@latest deploy` |
| Preview command | `npx wrangler@latest preview` |

默认在线入口：<https://starlight.luckycyan.com/>。域名根路径无需开通任何账户功能。

`wrangler.jsonc` 发布 `dist-cloudflare/`。默认构建将网站放在该目录的根部，直接从子域名首页访问。若需要 `/docs/`，在 Cloudflare 的构建变量中设置 `BASE_PATH=/docs`；重新构建后会使用实际的 `docs/` 目录承载页面与资源，并自动把域名根路径跳转到 `/docs/`。

| 构建变量 | 默认值 | 使用场景 |
| --- | --- | --- |
| `BASE_PATH` | `/` | 可设为 `/docs` 或其他子路径，前后斜杠会自动归一化 |
| `SITE_URL` | `https://starlight.luckycyan.com` | 修改站点域名、规范链接和站点地图地址 |

例如在终端验证 `/docs/` 部署：

```sh
BASE_PATH=/docs pnpm build
BASE_PATH=/docs pnpm preview
```

预览时使用与构建相同的 `BASE_PATH`。Cloudflare 的构建、部署和预览命令保持上表写法。

`wrangler.jsonc` 的 `name` 是 Worker 标识，不是 URL 前缀。Workers Builds 提供的 `WRANGLER_CI_OVERRIDE_NAME` 会让新版 Wrangler 使用面板中连接的 Worker 名称；本地发布到其他 Worker 时可通过 `--name` 指定。`package.json` 的名称不参与站点路径计算。

此方式不使用需要账户开通的非根路径 `assets.base_path`。遇到错误 `100343` 时，确认构建使用的是包含此修复的最新提交。GitHub Pages 仍发布 `dist/`，使用工作流自动传入的 Pages 路径。

## 官方资料

- [Astro 文档](https://docs.astro.build/zh-cn/)
- [Starlight 文档](https://starlight.astro.build/zh-cn/)
- [正文组件参考](https://starlight.astro.build/components/using-components/)
- [Cloudflare Workers 静态资源](https://developers.cloudflare.com/workers/static-assets/)
- [Cloudflare 静态资源重定向](https://developers.cloudflare.com/workers/static-assets/redirects/)
