<template>
  <div class="login-page">
    <!-- 全屏白色背景 -->
    <div class="bg-layer"></div>

    <!-- 左侧装饰区域 -->
    <div class="left-panel"></div>

    <!-- 装饰性渐变圆圈 -->
    <div class="bg-decoration">
      <div class="accent-circle accent-circle-1"></div>
      <div class="accent-circle accent-circle-2"></div>
      <div class="floating-orb orb-1"></div>
      <div class="floating-orb orb-2"></div>
      <div class="floating-orb orb-3"></div>
      <div class="floating-orb orb-4"></div>
    </div>

    <!-- 底部波浪线 -->
    <div class="wave-lines">
      <svg class="wave wave-1" viewBox="0 0 960 180" preserveAspectRatio="none">
        <path d="M0,180 Q240,120 480,140 T960,100 L960,180 Z" fill="url(#grad1)"/>
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:transparent" />
            <stop offset="30%" style="stop-color:#1677ff;stop-opacity:0.15" />
            <stop offset="70%" style="stop-color:#409eff;stop-opacity:0.15" />
            <stop offset="100%" style="stop-color:transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <!-- 品牌文字 -->
    <div class="brand-info">
      <h1 class="brand-title">TTS 语音合成平台</h1>
      <p class="brand-subtitle">TEXT TO SPEECH SYNTHESIS</p>
    </div>

    <!-- 技术标签 -->
    <div class="tech-badges">
      <div class="badge">
        <span class="badge-dot"></span>
        <span class="badge-text">AI 智能语音</span>
      </div>
    </div>

    <!-- 大面积水印 -->
    <div class="watermark">TTS</div>

    <!-- 居中卡片 -->
    <div class="login-card">
      <div class="card-header">
        <div class="logo-wrapper">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24" width="32" height="32">
              <path fill="currentColor" d="M12 3a9 9 0 0 0-9 9v7a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-3a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v3a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-7a9 9 0 0 0-9-9z"/>
            </svg>
          </div>
          <div class="brand-text">
            <h1>TTS 语音合成</h1>
            <p>智能文本转语音解决方案</p>
          </div>
        </div>
      </div>

      <div class="card-body">
        <!-- 登录表单 -->
        <transition name="fade" mode="out-in">
          <div v-if="!isRegister" key="login">
            <h2 class="welcome-text">欢迎回来</h2>
            <p class="sub-text">请登录您的账号以继续</p>

            <el-form @submit.prevent="handleLogin" class="login-form">
              <el-form-item>
                <el-input
                  v-model="username"
                  placeholder="请输入用户名"
                  size="large"
                  class="custom-input"
                >
                  <template #prefix>
                    <div class="input-prefix">
                      <svg viewBox="0 0 24 24" width="18" height="18">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                      </svg>
                    </div>
                  </template>
                </el-input>
              </el-form-item>

              <el-form-item>
                <el-input
                  v-model="password"
                  type="password"
                  placeholder="请输入密码"
                  size="large"
                  show-password
                  class="custom-input"
                  @keyup.enter="handleLogin"
                >
                  <template #prefix>
                    <div class="input-prefix">
                      <svg viewBox="0 0 24 24" width="18" height="18">
                        <path fill="currentColor" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                      </svg>
                    </div>
                  </template>
                </el-input>
              </el-form-item>

              <div class="form-extra">
                <el-checkbox v-model="rememberMe">记住我</el-checkbox>
                <a href="javascript:void(0)" class="forgot-link">忘记密码？</a>
              </div>

              <el-button
                type="primary"
                :loading="loading"
                class="login-btn"
                size="large"
                @click="handleLogin"
              >
                {{ loading ? '登录中...' : '登 录' }}
              </el-button>
            </el-form>

            <div class="card-footer">
              <span>还没有账号？</span>
              <a href="javascript:void(0)" class="register-link" @click="switchToRegister">立即注册</a>
            </div>
          </div>

          <!-- 注册表单 -->
          <div v-else key="register">
            <h2 class="welcome-text">创建账号</h2>
            <p class="sub-text">填写以下信息完成注册</p>

            <el-form
              ref="registerFormRef"
              :model="registerForm"
              :rules="registerRules"
              class="login-form"
            >
              <el-form-item prop="username">
                <el-input
                  v-model="registerForm.username"
                  placeholder="请输入用户名"
                  size="large"
                  class="custom-input"
                >
                  <template #prefix>
                    <div class="input-prefix">
                      <svg viewBox="0 0 24 24" width="18" height="18">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                      </svg>
                    </div>
                  </template>
                </el-input>
              </el-form-item>

              <el-form-item prop="email">
                <el-input
                  v-model="registerForm.email"
                  placeholder="请输入邮箱"
                  size="large"
                  class="custom-input"
                >
                  <template #prefix>
                    <div class="input-prefix">
                      <svg viewBox="0 0 24 24" width="18" height="18">
                        <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </div>
                  </template>
                </el-input>
              </el-form-item>

              <el-form-item prop="password">
                <el-input
                  v-model="registerForm.password"
                  type="password"
                  placeholder="请输入密码"
                  size="large"
                  show-password
                  class="custom-input"
                >
                  <template #prefix>
                    <div class="input-prefix">
                      <svg viewBox="0 0 24 24" width="18" height="18">
                        <path fill="currentColor" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                      </svg>
                    </div>
                  </template>
                </el-input>
              </el-form-item>

              <el-form-item prop="confirmPassword">
                <el-input
                  v-model="registerForm.confirmPassword"
                  type="password"
                  placeholder="请再次输入密码"
                  size="large"
                  show-password
                  class="custom-input"
                  @keyup.enter="handleRegisterSubmit"
                >
                  <template #prefix>
                    <div class="input-prefix">
                      <svg viewBox="0 0 24 24" width="18" height="18">
                        <path fill="currentColor" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                      </svg>
                    </div>
                  </template>
                </el-input>
              </el-form-item>

              <el-button
                type="primary"
                :loading="registerLoading"
                class="login-btn"
                size="large"
                @click="handleRegisterSubmit"
              >
                {{ registerLoading ? '注册中...' : '立即注册' }}
              </el-button>
            </el-form>

            <div class="card-footer">
              <span>已有账号？</span>
              <a href="javascript:void(0)" class="register-link" @click="switchToLogin">立即登录</a>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { userApi } from '@/api/user'
import { useUserStore } from '@/store/user'

const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const password = ref('')
const loading = ref(false)
const rememberMe = ref(false)

// 注册相关
const isRegister = ref(false)
const registerLoading = ref(false)
const registerFormRef = ref<FormInstance>()
const registerForm = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

function switchToRegister() {
  isRegister.value = true
}

function switchToLogin() {
  isRegister.value = false
}

// 密码验证规则
const validateConfirmPassword = (_rule: any, value: string, callback: any) => {
  if (value !== registerForm.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const registerRules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少 6 位', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' },
  ],
}

async function handleLogin() {
  if (!username.value || !password.value) {
    ElMessage.warning('请输入用户名和密码')
    return
  }

  loading.value = true
  try {
    const res = await userApi.login(username.value, password.value)
    const token = res.token
    const user = res.user
    localStorage.setItem('token', token)
    userStore.setToken(token)
    userStore.setUserInfo(user)

    if (rememberMe.value) {
      localStorage.setItem('username', username.value)
    } else {
      localStorage.removeItem('username')
    }

    ElMessage.success('登录成功')
    router.push('/generate')
  } catch (e: any) {
    ElMessage.error(e.message || '登录失败')
  } finally {
    loading.value = false
  }
}

async function handleRegisterSubmit() {
  if (!registerFormRef.value) return

  await registerFormRef.value.validate(async (valid) => {
    if (valid) {
      registerLoading.value = true
      try {
        await userApi.register(
          registerForm.username,
          registerForm.password,
          registerForm.email
        )

        ElMessage.success('注册成功，请登录！')
        // 切换回登录表单
        isRegister.value = false
        // 自动填充用户名
        username.value = registerForm.username
        password.value = ''
      } catch (e: any) {
        ElMessage.error(e.message || '注册失败')
      } finally {
        registerLoading.value = false
      }
    }
  })
}

const savedUsername = localStorage.getItem('username')
if (savedUsername) {
  username.value = savedUsername
  rememberMe.value = true
}

// Check for error message in URL (from failed auth redirect)
const urlParams = new URLSearchParams(window.location.search)
const errorMsg = urlParams.get('error')
if (errorMsg) {
  ElMessage.error(decodeURIComponent(errorMsg))
  // Clean up URL
  window.history.replaceState({}, '', window.location.pathname)
}
</script>

<style scoped>
/* 页面容器 */
.login-page {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* 全屏白色背景 */
.bg-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ffffff;
}

/* 左侧装饰面板 */
.left-panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%);
  pointer-events: none;
}

/* 装饰性元素 */
.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  pointer-events: none;
}

.accent-circle {
  position: absolute;
  border-radius: 50%;
}

.accent-circle-1 {
  width: 600px;
  height: 600px;
  top: 100px;
  left: 300px;
  background: radial-gradient(circle at 30% 30%, #dbeafe 0%, #eff6ff 50%, transparent 70%);
  animation: float1 12s ease-in-out infinite;
}

.accent-circle-2 {
  width: 300px;
  height: 300px;
  bottom: 200px;
  left: 50px;
  background: radial-gradient(circle, #bfdbfe 0%, #dbeafe 40%, transparent 80%);
  animation: float2 15s ease-in-out infinite;
}

.floating-orb {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(22,119,255,0.6) 0%, rgba(22,119,255,0.2) 60%, transparent 100%);
}

.orb-1 {
  width: 80px;
  height: 80px;
  top: 50px;
  left: 400px;
  opacity: 0.15;
  animation: orbFloat 10s ease-in-out infinite;
}

.orb-2 {
  width: 120px;
  height: 120px;
  bottom: 100px;
  left: 100px;
  opacity: 0.12;
  animation: orbFloat 14s ease-in-out infinite;
}

.orb-3 {
  width: 60px;
  height: 60px;
  bottom: 200px;
  left: 250px;
  opacity: 0.1;
  background: radial-gradient(circle, rgba(64,158,255,0.6) 0%, rgba(64,158,255,0.2) 60%, transparent 100%);
  animation: orbFloat 8s ease-in-out infinite;
}

.orb-4 {
  width: 50px;
  height: 50px;
  top: 250px;
  left: 450px;
  opacity: 0.08;
  background: radial-gradient(circle, rgba(64,158,255,0.6) 0%, rgba(64,158,255,0.2) 60%, transparent 100%);
  animation: orbFloat 11s ease-in-out infinite reverse;
}

@keyframes float1 {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.02); }
}

@keyframes float2 {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-15px) scale(1.03); }
}

@keyframes orbFloat {
  0%, 100% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-10px) translateX(5px); }
  50% { transform: translateY(-5px) translateX(8px); }
  75% { transform: translateY(-12px) translateX(3px); }
}

/* 波浪线 */
.wave-lines {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50%;
  height: 180px;
  pointer-events: none;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 180px;
}

.wave-1 {
  opacity: 0.8;
  animation: waveMove 8s ease-in-out infinite;
}

@keyframes waveMove {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(-10px); }
}

/* 品牌信息 */
.brand-info {
  position: absolute;
  top: 40px;
  left: 60px;
  pointer-events: none;
}

.brand-title {
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 6px;
  letter-spacing: 1px;
}

.brand-subtitle {
  font-size: 11px;
  font-weight: 500;
  color: #64748b;
  margin: 0;
  letter-spacing: 3px;
}

/* 技术标签 */
.tech-badges {
  position: absolute;
  bottom: 40px;
  left: 60px;
  display: flex;
  gap: 24px;
  pointer-events: none;
}

.badge {
  display: flex;
  align-items: center;
  gap: 8px;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #1677ff;
  box-shadow: 0 0 8px rgba(22,119,255,0.6);
}

.badge-text {
  font-size: 12px;
  font-weight: 500;
  color: #64748b;
}

/* 水印 */
.watermark {
  position: absolute;
  top: 50%;
  left: 30px;
  transform: translateY(-50%);
  font-size: 200px;
  font-weight: 900;
  color: rgba(30,41,59,0.04);
  pointer-events: none;
  user-select: none;
  letter-spacing: -5px;
}

/* 登录卡片 */
.login-card {
  position: relative;
  width: 100%;
  max-width: 440px;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0,0,0,0.05);
  overflow: hidden;
  animation: cardIn 0.6s ease-out;
}

@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.card-header {
  padding: 36px 40px 32px;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  text-align: center;
  border-bottom: 1px solid #f1f5f9;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}

.logo-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #1677ff 0%, #409eff 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  box-shadow: 0 4px 12px rgba(22,119,255,0.3);
}

.brand-text h1 {
  font-size: 22px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px;
}

.brand-text p {
  font-size: 12px;
  color: #64748b;
  margin: 0;
  letter-spacing: 1px;
}

.card-body {
  padding: 36px 40px 40px;
}

.welcome-text {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 6px;
  text-align: center;
}

.sub-text {
  font-size: 14px;
  color: #64748b;
  margin: 0 0 32px;
  text-align: center;
}

/* 表单样式 */
.login-form :deep(.el-form-item) {
  margin-bottom: 20px;
}

.custom-input :deep(.el-input__wrapper) {
  padding: 6px 14px;
  border-radius: 10px;
  background: #f8fafc;
  box-shadow: 0 0 0 1px #e4e7ed inset;
  transition: all 0.3s ease;
}

.custom-input :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #c0c4cc inset;
  background: #ffffff;
}

.custom-input :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 2px #1677ff inset;
  background: #ffffff;
}

.custom-input :deep(.el-input__inner) {
  height: 42px;
  font-size: 15px;
  color: #1e293b;
}

.custom-input :deep(.el-input__inner::placeholder) {
  color: #94a3b8;
}

.input-prefix {
  display: flex;
  align-items: center;
  color: #94a3b8;
  margin-right: 8px;
}

.form-extra {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.form-extra :deep(.el-checkbox__label) {
  color: #64748b;
  font-size: 14px;
}

.forgot-link {
  font-size: 14px;
  color: #409eff;
  text-decoration: none;
  font-weight: 500;
}

.forgot-link:hover {
  color: #1677ff;
}

/* 登录按钮 */
.login-btn {
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 10px;
  background: linear-gradient(135deg, #1677ff 0%, #409eff 100%);
  border: none;
  box-shadow: 0 4px 16px rgba(22,119,255,0.3);
  transition: all 0.3s ease;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(22,119,255,0.4);
}

/* 底部 */
.card-footer {
  text-align: center;
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid #f1f5f9;
}

.card-footer span {
  color: #64748b;
  font-size: 14px;
}

.register-link {
  color: #409eff;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  margin-left: 4px;
}

.register-link:hover {
  color: #1677ff;
}

/* 表单切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>

