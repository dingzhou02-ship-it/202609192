// 提供给各组的 fetch 示例使用：写入请求需携带此 CSRF 令牌。
// 使用方式：headers: { 'X-CSRFToken': window.getCsrfToken() }
window.getCsrfToken = function () {
  return document.querySelector('meta[name="csrf-token"]')?.content || '';
};
