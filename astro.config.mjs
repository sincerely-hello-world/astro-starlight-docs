// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://sincerely-hello-world.github.io',
	base: '/astro-starlight-docs',
	// FileTree uses satteri's native binding; keep it in Node during prerendering.
	vite: { ssr: { external: ['satteri'] } },
	integrations: [
		starlight({
			title: 'Astro 文档实验室',
			locales: { root: { label: '简体中文', lang: 'zh-CN' } },
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/sincerely-hello-world/astro-starlight-docs' }],
			sidebar: [
				{ label: '文档首页', slug: '' },
				{
					label: '写作指南',
					items: [{ autogenerate: { directory: 'guides' } }],
				},
				{
					label: '元素与组件示例',
					items: [{ autogenerate: { directory: 'examples' } }],
				},
				{
					label: '参考手册',
					items: [{ autogenerate: { directory: 'reference' } }],
				},
			],
		}),
	],
});
