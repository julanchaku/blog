// 文章详情页JavaScript

// 分享功能
const shareButtons = document.querySelectorAll('.share-btn');

shareButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const platform = this.classList[1];
        const title = document.querySelector('.post-title').textContent;
        const url = window.location.href;

        let shareUrl = '';

        switch(platform) {
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'weibo':
                shareUrl = `http://service.weibo.com/share/share.php?title=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
                break;
            case 'link':
                // 复制链接到剪贴板
                navigator.clipboard.writeText(url).then(() => {
                    this.innerHTML = '✓ 已复制!';
                    setTimeout(() => {
                        this.innerHTML = '🔗 复制链接';
                    }, 2000);
                });
                return;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    });
});

// 点赞功能
let liked = false;
const likeBtns = document.querySelectorAll('.like-btn');

likeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const currentLikes = parseInt(this.textContent.match(/\d+/)[0]);

        if (!this.classList.contains('liked')) {
            this.classList.add('liked');
            this.innerHTML = `❤️ ${currentLikes + 1}`;
            this.style.color = 'var(--primary-color)';

            // 添加点赞动画
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        } else {
            this.classList.remove('liked');
            this.innerHTML = `❤️ ${currentLikes}`;
            this.style.color = 'var(--text-gray)';
        }
    });
});

// 评论提交
const commentForm = document.querySelector('.comment-form');
const commentTextarea = commentForm.querySelector('textarea');
const submitBtn = commentForm.querySelector('.submit-comment-btn');
const commentsList = document.querySelector('.comments-list');

submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const commentText = commentTextarea.value.trim();

    if (commentText === '') {
        alert('请输入评论内容!');
        return;
    }

    // 创建新评论
    const newComment = document.createElement('div');
    newComment.className = 'comment';
    newComment.style.animation = 'fadeInUp 0.5s ease';

    const avatars = ['🌸', '⚔️', '🚀', '🎨', '🎵', '🎮', '🌟', '💫'];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

    newComment.innerHTML = `
        <div class="comment-avatar">${randomAvatar}</div>
        <div class="comment-content">
            <div class="comment-header">
                <span class="comment-author">匿名用户</span>
                <span class="comment-date">刚刚</span>
            </div>
            <p>${commentText}</p>
            <div class="comment-actions">
                <button class="like-btn">❤️ 0</button>
                <button class="reply-btn">回复</button>
            </div>
        </div>
    `;

    // 添加到评论列表顶部
    commentsList.insertBefore(newComment, commentsList.firstChild);

    // 清空文本框
    commentTextarea.value = '';

    // 更新评论数
    const commentsCount = document.querySelector('.comments-section h3');
    const currentCount = parseInt(commentsCount.textContent.match(/\d+/)[0]);
    commentsCount.textContent = `💬 评论区 (${currentCount + 1})`;

    // 添加点赞功能到新评论
    const newLikeBtn = newComment.querySelector('.like-btn');
    newLikeBtn.addEventListener('click', function() {
        const currentLikes = parseInt(this.textContent.match(/\d+/)[0]);
        if (!this.classList.contains('liked')) {
            this.classList.add('liked');
            this.innerHTML = `❤️ ${currentLikes + 1}`;
            this.style.color = 'var(--primary-color)';
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        }
    });

    // 滚动到新评论
    newComment.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// 统计栏交互动画
const statItems = document.querySelectorAll('.post-stats-bar span');
statItems.forEach(item => {
    item.addEventListener('click', function() {
        // 添加点击动画
        this.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
    });
});

// 添加脉冲动画
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
    }
`;
document.head.appendChild(pulseStyle);

// 阅读进度条
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: var(--gradient-2);
    width: 0;
    z-index: 9999;
    transition: width 0.3s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.pageYOffset;
    const progress = (scrolled / documentHeight) * 100;

    progressBar.style.width = progress + '%';
});

// 代码复制功能(如果有代码块)
document.querySelectorAll('pre code').forEach(codeBlock => {
    const copyBtn = document.createElement('button');
    copyBtn.textContent = '复制';
    copyBtn.style.cssText = `
        position: absolute;
        top: 5px;
        right: 5px;
        padding: 5px 10px;
        background: var(--primary-color);
        border: none;
        border-radius: 5px;
        color: white;
        cursor: pointer;
        font-size: 0.8rem;
    `;

    const pre = codeBlock.parentElement;
    pre.style.position = 'relative';
    pre.appendChild(copyBtn);

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(codeBlock.textContent);
        copyBtn.textContent = '已复制!';
        setTimeout(() => {
            copyBtn.textContent = '复制';
        }, 2000);
    });
});

// 图片点击放大(如果有图片)
document.querySelectorAll('.post-content img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
        `;

        const modalImg = document.createElement('img');
        modalImg.src = this.src;
        modalImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
        `;

        modal.appendChild(modalImg);
        document.body.appendChild(modal);

        modal.addEventListener('click', () => {
            modal.remove();
        });
    });
});

// 标签点击效果
document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', function() {
        const tagText = this.textContent.replace('#', '');
        // 可以跳转到带标签筛选的博客页面
        window.location.href = `blog.html?tag=${encodeURIComponent(tagText)}`;
    });
});

console.log('📝 文章详情页已加载完成!');
