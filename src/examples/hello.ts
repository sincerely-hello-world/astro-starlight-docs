/** 供文档中的 Code 组件直接读取，保持展示内容与源文件一致。 */
export function greet(name: string): string {
  return `你好，${name}！欢迎编写 Astro 文档。`;
}

console.log(greet('Starlight'));
