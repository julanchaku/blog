// 博客页面特定JavaScript

// 搜索功能
const searchInput = document.getElementById('searchInput');
const blogCards = document.querySelectorAll('.blog-card');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    blogCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const content = card.querySelector('p').textContent.toLowerCase();
        const category = card.dataset.category.toLowerCase();

        if (title.includes(searchTerm) || content.includes(searchTerm) || category.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });

    // 检查是否有结果
    checkNoResults();
});

// 分类筛选
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 移除所有active类
        filterBtns.forEach(b => b.classList.remove('active'));

        // 添加active类到当前按钮
        btn.classList.add('active');

        const category = btn.dataset.category;

        blogCards.forEach((card, index) => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
            } else {
                card.style.display = 'none';
            }
        });

        // 清空搜索框
        searchInput.value = '';

        // 检查是否有结果
        checkNoResults();
    });
});

// 检查是否有搜索结果
function checkNoResults() {
    const visibleCards = Array.from(blogCards).filter(card => card.style.display !== 'none');
    const blogGrid = document.getElementById('blogGrid');

    // 移除现有的无结果提示
    const existingNoResults = document.querySelector('.no-results');
    if (existingNoResults) {
        existingNoResults.remove();
    }

    if (visibleCards.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = `
            <div class="no-results-icon">😢</div>
            <h3>没有找到相关内容</h3>
            <p>试试其他关键词或分类吧~</p>
        `;
        blogGrid.parentElement.insertBefore(noResults, blogGrid.nextSibling);
    }
}

// 加载更多功能
const loadMoreBtn = document.querySelector('.load-more-btn');
let currentPage = 1;

loadMoreBtn.addEventListener('click', () => {
    // 添加加载动画
    loadMoreBtn.style.opacity = '0.5';
    loadMoreBtn.querySelector('span').textContent = '加载中...';

    // 模拟加载延迟
    setTimeout(() => {
        // 这里可以添加AJAX请求加载更多文章
        // 现在只是模拟效果
        currentPage++;

        // 恢复按钮状态
        loadMoreBtn.style.opacity = '1';
        loadMoreBtn.querySelector('span').textContent = '加载更多';

        // 如果达到最大页数,隐藏按钮
        if (currentPage >= 3) {
            loadMoreBtn.style.display = 'none';
            const endMessage = document.createElement('p');
            endMessage.textContent = '已经到底了~ 🌟';
            endMessage.style.textAlign = 'center';
            endMessage.style.color = 'var(--text-gray)';
            endMessage.style.marginTop = '2rem';
            loadMoreBtn.parentElement.appendChild(endMessage);
        }
    }, 1000);
});

// 卡片悬浮3D效果
blogCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});

// 滚动时添加视差效果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const pageHeader = document.querySelector('.page-header');

    if (pageHeader) {
        pageHeader.style.transform = `translateY(${scrolled * 0.5}px)`;
        pageHeader.style.opacity = 1 - scrolled / 500;
    }
});

// 卡片点击涟漪效果
blogCards.forEach(card => {
    card.addEventListener('click', function(e) {
        // 如果点击的是链接,不创建涟漪效果
        if (e.target.tagName === 'A') return;

        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: cardRipple 0.8s ease-out;
        `;

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);
    });
});

// 添加卡片涟漪动画
const cardRippleStyle = document.createElement('style');
cardRippleStyle.textContent = `
    @keyframes cardRipple {
        from {
            transform: scale(0);
            opacity: 0.8;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
    }

    .blog-card {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(cardRippleStyle);

// 随机颜色变化效果(可选)
function randomGradient() {
    const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
}

// 鼠标悬浮时改变分类标签颜色
const categoryTags = document.querySelectorAll('.card-category');
categoryTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.background = randomGradient();
    });
});

// 统计数字动画
const statNumbers = document.querySelectorAll('.card-stats span');
statNumbers.forEach(stat => {
    stat.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2)';
        this.style.transition = 'transform 0.3s ease';
    });

    stat.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

console.log('📚 博客页面已加载完成!');
