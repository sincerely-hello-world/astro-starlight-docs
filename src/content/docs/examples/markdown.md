---
title: Markdown 元素示例
description: 可复制的代码块、提示框、警告、表格、文件树、图片和折叠内容写法。
sidebar:
  order: 1
---

这是一篇纯 `.md` 文档，不需要导入组件。每个示例先展示效果，再提供写法；打开本文件也可以直接复制完整源码。

## 标题、文字与链接

用 **加粗** 强调重点，用 *斜体* 补充语气，用 `pnpm build` 表示命令。阅读[添加文档教程](../../guides/adding-documents/)，或者跳转到本页的[表格](#表格)。

```md
## 二级标题
### 三级标题

用 **加粗** 强调重点，用 *斜体* 补充语气，用 `pnpm build` 表示命令。
[添加文档教程](../../guides/adding-documents/)
```

页面主标题由 frontmatter 的 `title` 生成，正文通常从 `##` 开始。

## 提示与警告

:::note[说明]
新建 `.md` 页面就可以使用这些提示框，不需要额外导入。
:::

:::tip[实用技巧]
代码块标明语言与文件名，读者会更容易理解应该修改哪里。
:::

:::caution[警告 / Warning]
修改页面文件名后，旧链接可能失效，请同步更新引用。
:::

:::danger[危险操作]
删除文档源文件会使下一次构建不再生成对应页面。操作前请确认有版本记录。
:::

```md
:::note[说明]
补充背景信息。
:::

:::tip[实用技巧]
提供更高效的操作方法。
:::

:::caution[警告 / Warning]
提醒读者注意潜在问题。
:::

:::danger[危险操作]
说明可能造成数据丢失的操作。
:::
```

Starlight 的提示类型为 `note`、`tip`、`caution`、`danger`。常说的 tips 对应 `tip`，warn 对应 `caution`，不要写成 `:::tips` 或 `:::warn`。

## 代码块

### 命令与文件标题

```sh title="在项目根目录运行"
pnpm install
pnpm build
```

````md
```sh title="在项目根目录运行"
pnpm install
pnpm build
```
````

### 行高亮与增删标记

Starlight 默认使用 Expressive Code 渲染代码块。下面分别演示行高亮和增删行：

```js title="站点名称" {2}
const config = {
  title: '我的中文文档',
};
```

```js title="修改前后" del={1} ins={2}
const title = 'My Docs';
const title = 'Astro 文档实验室';
```

````md
```js title="站点名称" {2}
const config = {
  title: '我的中文文档',
};
```

```js title="修改前后" del={1} ins={2}
const title = 'My Docs';
const title = 'Astro 文档实验室';
```
````

若需要在代码块里展示三反引号，外层可以使用四个反引号，就像本页展示代码块源码时的写法。

## 表格

| 需求 | 推荐格式 | 是否导入组件 |
| :--- | :---: | ---: |
| 正文、列表、表格 | `.md` | 否 |
| 提示与警告 | `.md` 或 `.mdx` | 指令语法无需导入 |
| 标签页、卡片、文件树组件 | `.mdx` | 是 |

```md
| 需求 | 推荐格式 | 是否导入组件 |
| :--- | :---: | ---: |
| 正文、列表、表格 | `.md` | 否 |
| 提示与警告 | `.md` 或 `.mdx` | 指令语法无需导入 |
| 标签页、卡片、文件树组件 | `.mdx` | 是 |
```

表头下方的冒号控制左对齐、居中和右对齐。单元格里如果需要显示竖线，写成 `\|`。

## 列表与引用

1. 先说明目标。
2. 再给出操作步骤。
3. 最后描述预期结果。

- 必要条件：可以使用嵌套列表。
  - 安装依赖。
  - 创建文档文件。

> 好的说明应当告诉读者：做什么、在哪里做、完成后能看到什么。

```md
1. 先说明目标。
2. 再给出操作步骤。

- 必要条件
  - 安装依赖。

> 这是一段引用。
```

## 纯文本文件树

纯 Markdown 可以用 `text` 代码块展示目录：

```text title="文档目录"
src/
├── content/
│   └── docs/
│       ├── index.mdx
│       ├── guides/
│       ├── examples/
│       └── reference/
└── content.config.ts
```

需要文件图标、注释和目录折叠时，使用 [MDX 的 FileTree 组件](../components/#文件树-filetree)。

## 图片

下面复用了项目已有图片；图片路径相对于本 Markdown 文件：

![Astro 宇航员 Houston，漂浮在深色背景中。](../../../assets/houston.webp)

```md
![Astro 宇航员 Houston，漂浮在深色背景中。](../../../assets/houston.webp)
```

本项目的站内链接使用页面之间的相对地址，以适配根路径与子路径部署。组件中引用 `public/` 资源时，可以用 `import.meta.env.BASE_URL` 拼接资源名，使其包含当前部署前缀。请为有信息含义的图片填写有意义的替代文字。

## 折叠内容

<details>
<summary>为什么新页面没有出现在侧边栏？</summary>

先检查文件是否位于 `src/content/docs/`。再检查导航是否使用自动生成，以及 frontmatter 是否设置了 `sidebar.hidden: true`。

</details>

```html
<details>
<summary>点击展开</summary>

这里写补充说明，前后保留空行。

</details>
```

## 继续阅读

- [Starlight Markdown 官方指南](https://starlight.astro.build/guides/authoring-content/)
- [MDX 内置组件示例](../components/)
