// 共享的 DOM 工具：三个 UI 模块此前各自复制了一份，统一收敛到这里。
/** 创建元素；html 走 innerHTML，调用方需自行保证内容可信。 */
export const el = (tag, cls, html) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  return e;
};

/** 转义 & < >，用于把外部文本插入 innerHTML。 */
export const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
