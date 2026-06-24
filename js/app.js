/* ============================================
   仪玄角色助手 - 前端逻辑 v2
   ============================================ */

// API 地址（空字符串 = 同源，nginx 反代）
const API_BASE = '';
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

    console.log('✅ 仪玄角色助手已启动');
    console.log('API 地址:', API_BASE || '同源');
    console.log('模型:', MODEL_NAME);
}

// ============================================
// 发送消息
// ============================================
async function sendMessage() {
    const text = inputEl.value.trim();
    if (!text || isGenerating) return;

    // 添加用户消息
    addMessage('user', text);
    inputEl.value = '';
    inputEl.style.height = 'auto';
    
    // 显示思考中
    isGenerating = true;
    sendBtn.disabled = true;
    sendBtn.textContent = '思考中...';
    const thinkingEl = addThinking();

    try {
        // 调用 API
        const response = await callAPI(text);
        
        // 移除思考中
        thinkingEl.remove();
        
        // 添加回复
        if (response) {
            addMessage('bot', response);
        } else {
            addMessage('bot', '...为师一时语塞，容后再议。');
        }
    } catch (error) {
        thinkingEl.remove();
        addMessage('bot', `⚠️ 请求失败: ${error.message}`);
        console.error('API 错误:', error);
    } finally {
        isGenerating = false;
        sendBtn.disabled = false;
        sendBtn.textContent = '发送';
    }
}

// ============================================
// 调用后端 API
// ============================================
async function callAPI(question) {
    const url = `${API_BASE}/v1/chat/completions`;
    
    const requestBody = {
        model: MODEL_NAME,
        messages: [
            {
                role: 'system',
                content: '你是《绝区零》中的角色"仪玄"，云岿山第十三代门主，虚狩级调查员。用清冷、半文半白的师者口吻回答。不要暴露自己是 AI。'
            },
            {
                role: 'user',
                content: question
            }
        ],
        max_tokens: 512,
        temperature: 0.7,
        chat_template_kwargs: { enable_thinking: false }
    };

    console.log('发送请求:', url, requestBody);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('API 响应:', data);
    
    // 兼容多种响应格式
    let content = null;
    try {
        content = data.choices[0].message.content;
        // 如果 content 为空，尝试 reasoning_content
        if (!content && data.choices[0].message.reasoning_content) {
            content = data.choices[0].message.reasoning_content;
        }
    } catch (e) {
        console.error('解析响应失败:', e);
    }
    
    if (!content) {
        throw new Error('响应内容为空');
    }
    
    // 过滤 <think> 标签
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
