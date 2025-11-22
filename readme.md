# 二次元博客网站 ✨

一个充满二次元风格、视觉效果丰富的静态博客网站,专为GitHub Pages部署设计。

## 🌟 特性

- **二次元主题设计** - 粉紫色渐变配色,充满动漫氛围
- **丰富的视觉特效**:
  - 粒子背景动画
  - 樱花飘落效果
  - 3D卡片悬浮效果
  - Glitch故障艺术文字
  - 平滑过渡动画
  - 鼠标跟随光晕
  - 阅读进度条
- **响应式设计** - 完美适配桌面端、平板和手机
- **完整功能**:
  - 首页展示
  - 博客文章列表
  - 文章详情页
  - 搜索功能
  - 分类筛选
  - 评论系统(前端模拟)
  - 社交分享
- **纯静态** - 无需后端,可直接部署到GitHub Pages

## 📁 文件结构

```
blog/
├── index.html          # 首页
├── blog.html           # 博客列表页
├── post1.html          # 文章详情页示例
├── style.css           # 主样式文件
├── blog.css            # 博客页面样式
├── post.css            # 文章详情页样式
├── script.js           # 主JavaScript文件
├── blog.js             # 博客页面脚本
├── post.js             # 文章详情页脚本
└── README.md           # 说明文档
```

## 🚀 快速开始

### 本地预览

1. 下载所有文件到本地文件夹
2. 用浏览器打开 `index.html` 即可预览
3. 或使用本地服务器:
   ```bash
   # 如果安装了Python
   python -m http.server 8000

   # 如果安装了Node.js
   npx http-server
   ```

### 部署到GitHub Pages

1. **创建仓库**
   - 在GitHub上创建一个新仓库
   - 仓库名格式: `你的用户名.github.io` (用户/组织站点)
   - 或任意名称(项目站点)

2. **上传文件**
   ```bash
   git init
   git add .
   git commit -m "初始化二次元博客"
   git branch -M main
   git remote add origin https://github.com/你的用户名/你的仓库名.git
   git push -u origin main
   ```

3. **启用GitHub Pages**
   - 进入仓库设置 (Settings)
   - 找到 Pages 选项
   - Source 选择 `main` 分支
   - 点击 Save

4. **访问网站**
   - 用户站点: `https://你的用户名.github.io`
   - 项目站点: `https://你的用户名.github.io/仓库名`

## 🎨 自定义

### 修改配色

在 `style.css` 中修改 CSS 变量:

```css
:root {
    --primary-color: #ff6b9d;      /* 主色调 */
    --secondary-color: #c06c84;    /* 次要色调 */
    --accent-color: #f67280;       /* 强调色 */
    --bg-dark: #1a1a2e;           /* 深色背景 */
    --bg-light: #16213e;          /* 浅色背景 */
}
```

### 添加新文章

1. 复制 `post1.html` 并重命名(如 `post2.html`)
2. 修改文章内容、标题、日期等
3. 在 `blog.html` 中添加对应的文章卡片
4. 在 `index.html` 中可选择性添加到精选文章

### 修改网站信息

- **网站标题**: 修改各个HTML文件的 `<title>` 标签
- **导航栏**: 修改 `<nav>` 中的链接
- **页脚信息**: 修改 `<footer>` 中的内容
- **社交链接**: 修改对应的 `href` 属性

## 💡 使用提示

1. **图片**:
   - 当前使用渐变色占位符
   - 可替换为真实图片,将 `.image-placeholder` 改为 `<img src="路径">`

2. **粒子效果**:
   - 使用了CDN加载的 particles.js
   - 可在 `script.js` 中调整粒子参数

3. **性能优化**:
   - 所有动画都使用CSS硬件加速
   - 樱花效果会自动清理过期元素
   - 可根据需要调整粒子数量

4. **浏览器兼容**:
   - 支持所有现代浏览器
   - 建议使用Chrome、Firefox、Edge或Safari最新版本

## 🔧 技术栈

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- Vanilla JavaScript (ES6+)
- Particles.js (粒子动画库)

## 📱 响应式断点

- 桌面: > 968px
- 平板: 768px - 968px
- 手机: < 768px

## ⚠️ 注意事项

1. 评论系统为前端模拟,刷新页面后评论会消失
   - 如需真实评论功能,可集成Disqus、Gitalk等第三方服务

2. 搜索和筛选功能仅针对当前页面的文章
   - 如需全站搜索,需要额外开发或使用第三方服务

3. 文章内容为示例,请根据实际需要修改

## 📄 许可证

本项目可自由使用和修改,无需署名。

## 🤝 贡献

欢迎提出建议和改进!

---

Made with ❤️ and ✨

享受你的二次元博客之旅! 🌸
