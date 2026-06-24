/* ============================================
   仪玄角色助手 - 前端逻辑
   ============================================ */

const API_BASE = window.location.origin.includes('localhost') 
    ? 'http://localhost:8000' 
    : 'http://43.226.38.192:8000';  // 改成您的后端地址

const MODEL_NAME = 'yixuan-lora';

// 状态
let isGenerating = false;
let useRAG = true;
let enableValidation = true;

// DOM 元素
const messagesEl = document.getElementById('messages');
const inputEl = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const ragToggle = document.getElementById('ragToggle');
const validationToggle = document.getElementById('validationToggle');

// ============================================
// 初始化
// ============================================
function init() {
    // 绑定事件
    sendBtn.addEventListener('click', sendMessage);
    inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // 自动调整输入框高度
    inputEl.addEventListener('input', autoResize);

    // 开关事件
    ragToggle.addEventListener('click', () => toggleSwitch(ragToggle, 'rag'));
    validationToggle.addEventListener('click', () => toggleSwitch(validationToggle, 'validation'));

    // 快捷问题
    document.querySelectorAll('.quick-question').forEach(btn => {
        btn.addEventListener('click', () => {
            inputEl.value = btn.textContent;
            sendMessage();
        });
    });

    // 欢迎消息
    addMessage('bot', '既入山门，那些俗务繁礼便留在山下吧。为师仪玄，云岿山第十三代门主。你且问吧。');
}

// ============================================
// 发送消息
// ============================================
async function sendMessage() {
    const message = inputEl.value.trim();
    if (!message || isGenerating) return;

    // 添加用户消息
    addMessage('user', message);
    inputEl.value = '';
    autoResize();
    
    // 显示思考中
    const thinkingEl = addThinking();
    isGenerating = true;
    sendBtn.disabled = true;

    try {
        const response = await callAPI(message);
        thinkingEl.remove();
        addMessage('bot', response);
    } catch (error) {
        thinkingEl.remove();
        addMessage('bot', `⚠️ 请求失败: ${error.message}`);
    } finally {
        isGenerating = false;
        sendBtn.disabled = false;
    }
}

// ============================================
// 调用 API
// ============================================
async function callAPI(message) {
    const systemPrompt = `你是《绝区零》中的角色"仪玄"，云岿山第十三代门主，虚狩级调查员。
你的说话风格必须严格遵循以下设定：
- 语气清冷、从容、带有师者风范，偶尔流露温柔
- 用词典雅，半文半白，常用"为师""你且""非也""罢了"等词
- 喜欢用自然意象（云、风、雨、月、沧海、青溟）作比喻
- 言简意赅，富有哲思，常点拨弟子而非直接说教
- 不使用网络流行语、表情符号、感叹号过多
- 自称"为师"或"我"，称对方为"你"或"弟子"
- 涉及术法、卜算、命运时尤为郑重

用户会问你问题，请用仪玄的口吻回答，不要暴露自己是 AI。`;

    const response = await fetch(`${API_BASE}/v1/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: MODEL_NAME,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: message }
            ],
            max_tokens: 512,
            temperature: 0.7,
            chat_template_kwargs: { enable_thinking: false }
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    let content = data.choices[0].message.content;
    
    // 过滤 think 标签
    content = content.replace(/<think>.*?<\/think>\s*/gs, '').trim();
    
    return content;
}

// ============================================
// UI 辅助函数
// ============================================
function addMessage(role, content) {
    const msgEl = document.createElement('div');
    msgEl.className = `message ${role}`;
    
    const avatar = role === 'bot' ? '玄' : '你';
    const avatarClass = role === 'bot' ? 'bot' : 'user';
    
    msgEl.innerHTML = `
        <div class="message-avatar ${avatarClass}">${avatar}</div>
        <div class="message-content">${escapeHtml(content)}</div>
    `;
    
    messagesEl.appendChild(msgEl);
    messagesEl.scrollTop = messagesEl.scrollHeight;
}

function addThinking() {
    const msgEl = document.createElement('div');
    msgEl.className = 'message bot';
    msgEl.innerHTML = `
        <div class="message-avatar bot">玄</div>
        <div class="message-content">
            <div class="thinking">
                <span>为师正在思索</span>
                <div class="thinking-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>
        </div>
    `;
    messagesEl.appendChild(msgEl);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return msgEl;
}

function toggleSwitch(el, type) {
    el.classList.toggle('active');
    if (type === 'rag') useRAG = el.classList.contains('active');
    if (type === 'validation') enableValidation = el.classList.contains('active');
}

function autoResize() {
    inputEl.style.height = 'auto';
    inputEl.style.height = Math.min(inputEl.scrollHeight, 120) + 'px';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 启动
init();
