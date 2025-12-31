// ============================================
// InsuranceMate - Application Logic
// ============================================

// ============================================
// State Management
// ============================================
const state = {
    currentPage: 'home',
    user: {
        name: 'คุณสมชาย',
        phone: '089-123-4567'
    },
    insurances: [
        {
            id: 1,
            type: 'auto',
            typeName: 'ประกันรถยนต์',
            company: 'กรุงเทพประกันภัย',
            policyNumber: 'ABC-12345678',
            startDate: '2024-08-15',
            endDate: '2025-08-15',
            premium: 12500,
            owner: 'self'
        },
        {
            id: 2,
            type: 'life',
            typeName: 'ประกันชีวิต',
            company: 'AIA ประกันชีวิต',
            policyNumber: 'XYZ-Life-234567',
            startDate: '2023-06-01',
            endDate: '2025-06-01',
            premium: 24000,
            owner: 'self'
        },
        {
            id: 3,
            type: 'health',
            typeName: 'ประกันสุขภาพ',
            company: 'เมืองไทยประกันภัย',
            policyNumber: 'MTI-Health-345',
            startDate: '2024-01-01',
            endDate: '2026-01-01',
            premium: 18000,
            owner: 'mother'
        }
    ],
    agent: {
        name: 'นายสมชาย พูนสุข',
        phone: '089-555-1234',
        email: 'somchai@example.com',
        company: 'กรุงเทพประกันชีวิต',
        agentId: '123456',
        status: 'online',
        area: 'กรุงเทพฯ และปริมณฑล'
    },
    family: [
        {
            id: 1,
            name: 'คุณสมพร สุขใจ',
            relation: 'แม่',
            avatar: '👩',
            insuranceCount: 1
        },
        {
            id: 2,
            name: 'ด.ช. นภัทร',
            relation: 'ลูก',
            avatar: '👦',
            insuranceCount: 1
        }
    ],
    notifications: [
        {
            id: 1,
            type: 'warning',
            title: 'ประกันรถจะหมดอายุเร็วๆ นี้',
            message: 'กรมธรรม์ประกันรถยนต์จะหมดอายุใน 7 วัน',
            date: '2024-12-30'
        },
        {
            id: 2,
            type: 'info',
            title: 'สิทธิพิเศษ',
            message: 'คุณมีสิทธิ์ตรวจสุขภาพฟรี 1 ครั้ง',
            date: '2024-12-28'
        }
    ],
    claims: [],
    chatMessages: [
        { id: 1, type: 'received', text: 'สวัสดีครับ ยินดีให้บริการ', time: '09:00' },
        { id: 2, type: 'sent', text: 'สวัสดีครับ อยากสอบถามเรื่องต่ออายุกรมธรรม์', time: '09:02' }
    ]
};

// ============================================
// Utility Functions
// ============================================
const utils = {
    formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
    },
    
    formatCurrency(amount) {
        return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(amount);
    },
    
    getDaysUntil(dateStr) {
        const target = new Date(dateStr);
        const today = new Date();
        const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
        return diff;
    },
    
    getInsuranceIcon(type) {
        const icons = {
            auto: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 17h14v-5l-3-3H8L5 12v5z"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>',
            life: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
            health: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>'
        };
        return icons[type] || icons.life;
    }
};

// ============================================
// UI Components
// ============================================
const components = {
    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    },
    
    showModal(title, content) {
        const container = document.getElementById('modalContainer');
        container.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3 class="modal-title">${title}</h3>
                    <button class="modal-close" onclick="app.closeModal()">×</button>
                </div>
                <div class="modal-body">${content}</div>
            </div>
        `;
        container.classList.add('active');
    }
};

// ============================================
// Page Renderers
// ============================================
const pages = {
    home() {
        const daysUntilExpiry = utils.getDaysUntil(state.insurances[0].endDate);
        return `
            <div class="welcome-banner fade-in">
                <h2>สวัสดี ${state.user.name}!</h2>
                <p>ผู้ช่วยเรื่องประกันในมือคุณ</p>
            </div>

            ${daysUntilExpiry <= 30 ? `
            <div class="alert alert-warning slide-down">
                <strong>⚠️ แจ้งเตือน!</strong><br>
                ประกันรถยนต์จะหมดอายุในอีก ${daysUntilExpiry} วัน
            </div>` : ''}

            <div class="flex-between mb-md">
                <h3>กรมธรรม์ของคุณ</h3>
                <span class="badge badge-primary">${state.insurances.filter(i => i.owner === 'self').length} ฉบับ</span>
            </div>

            ${state.insurances.filter(i => i.owner === 'self').map(insurance => `
                <div class="insurance-card ${insurance.type} slide-up" onclick="app.viewInsurance(${insurance.id})">
                    <div class="insurance-icon">${utils.getInsuranceIcon(insurance.type)}</div>
                    <div class="insurance-type">${insurance.typeName}</div>
                    <div class="insurance-company">${insurance.company}</div>
                    <div class="insurance-policy">เลขที่: ${insurance.policyNumber}</div>
                    <div class="insurance-details">
                        <div class="insurance-detail-item">
                            <div class="insurance-detail-label">หมดอายุ</div>
                            <div class="insurance-detail-value">${new Date(insurance.endDate).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit' })}</div>
                        </div>
                        <div class="insurance-detail-item">
                            <div class="insurance-detail-label">เบี้ยประกัน</div>
                            <div class="insurance-detail-value">${(insurance.premium / 1000).toFixed(1)}k</div>
                        </div>
                    </div>
                </div>
            `).join('')}

            <div class="grid grid-2 gap-md mt-lg">
                <button class="btn btn-primary" onclick="app.navigate('claim')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    แจ้งเคลม
                </button>
                <button class="btn btn-secondary" onclick="app.navigate('agent')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    ติดต่อตัวแทน
                </button>
            </div>
        `;
    },

    agent() {
        return `
            <div class="agent-profile fade-in">
                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(state.agent.name)}&background=2563eb&color=fff&size=120" 
                     alt="${state.agent.name}" class="agent-avatar">
                <h2 class="agent-name">${state.agent.name}</h2>
                <p class="agent-company">🏢 ${state.agent.company}</p>
                <div class="agent-status">
                    <span class="status-dot"></span>
                    ${state.agent.status === 'online' ? 'ออนไลน์' : 'ออฟไลน์'}
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <div class="flex" style="gap: 0.5rem;">
                            <strong style="min-width: 100px;">รหัสตัวแทน:</strong>
                            <span>${state.agent.agentId}</span>
                        </div>
                        <div class="flex" style="gap: 0.5rem;">
                            <strong style="min-width: 100px;">โทรศัพท์:</strong>
                            <span>${state.agent.phone}</span>
                        </div>
                        <div class="flex" style="gap: 0.5rem;">
                            <strong style="min-width: 100px;">อีเมล:</strong>
                            <span>${state.agent.email}</span>
                        </div>
                        <div class="flex" style="gap: 0.5rem;">
                            <strong style="min-width: 100px;">พื้นที่ดูแล:</strong>
                            <span>${state.agent.area}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="agent-actions">
                <button class="btn btn-primary" onclick="app.callAgent()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    โทรหาเขา
                </button>
                <button class="btn btn-primary" onclick="app.openChat()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    แชททันที
                </button>
                <button class="btn btn-secondary" onclick="app.makeAppointment()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    นัดพบ
                </button>
                <button class="btn btn-secondary" onclick="app.sendDocument()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    ส่งเอกสาร
                </button>
            </div>

            <button class="btn btn-outline btn-block mt-lg" onclick="app.navigate('findAgent')">
                🔍 เปลี่ยนหรือค้นหาตัวแทนใหม่
            </button>
        `;
    },

    family() {
        return `
            <div class="flex-between mb-lg">
                <h2>ครอบครัวของฉัน</h2>
                <button class="btn btn-primary btn-sm" onclick="app.addFamilyMember()">
                    + เพิ่มสมาชิก
                </button>
            </div>

            ${state.family.map(member => `
                <div class="member-card slide-up" onclick="app.viewFamilyMember(${member.id})">
                    <div class="member-avatar">${member.avatar}</div>
                    <div class="member-info">
                        <div class="member-name">${member.name}</div>
                        <div class="member-relation">${member.relation}</div>
                    </div>
                    <div class="member-badge">
                        <span class="badge badge-primary">${member.insuranceCount} กรมธรรม์</span>
                    </div>
                </div>
            `).join('')}

            <div class="empty-state mt-xl">
                <div class="empty-state-icon">👨‍👩‍👧‍👦</div>
                <p class="text-muted">เพิ่มสมาชิกครอบครัวเพื่อจัดการกรมธรรม์ของคนที่คุณรัก</p>
            </div>
        `;
    },

    claim() {
        return `
            <h2 class="mb-lg">แจ้งเคลมประกัน</h2>

            <form onsubmit="app.submitClaim(event)" class="fade-in">
                <div class="form-group">
                    <label class="form-label">เลือกกรมธรรม์ที่ต้องการเคลม</label>
                    <select class="form-select" required>
                        ${state.insurances.map(ins => `
                            <option value="${ins.id}">${ins.typeName} - ${ins.company}</option>
                        `).join('')}
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">วันที่เกิดเหตุ</label>
                    <input type="date" class="form-input" required>
                </div>

                <div class="form-group">
                    <label class="form-label">รายละเอียดเหตุการณ์</label>
                    <textarea class="form-textarea" placeholder="อธิบายเหตุการณ์ที่เกิดขึ้น..." required></textarea>
                </div>

                <div class="form-group">
                    <label class="form-label">อัปโหลดเอกสาร/หลักฐาน</label>
                    <div class="file-upload">
                        <input type="file" multiple accept="image/*,.pdf" onchange="app.previewFiles(event)">
                        <div>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin: 0 auto 1rem; opacity: 0.3;">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="17 8 12 3 7 8"/>
                                <line x1="12" y1="3" x2="12" y2="15"/>
                            </svg>
                            <p>คลิกหรือลากไฟล์มาที่นี่</p>
                            <p class="text-muted text-sm">รองรับ JPG, PNG, PDF</p>
                        </div>
                    </div>
                    <div id="filePreview" class="file-preview"></div>
                </div>

                <div class="form-group">
                    <label class="form-label">ช่องทางติดต่อกลับ</label>
                    <input type="tel" class="form-input" value="${state.user.phone}" required>
                </div>

                <button type="submit" class="btn btn-primary btn-lg btn-block">
                    📤 ส่งเคลม
                </button>
            </form>

            ${state.claims.length > 0 ? `
                <div class="divider"></div>
                <h3 class="mb-md">ประวัติการเคลม</h3>
                ${state.claims.map(claim => `
                    <div class="card mb-md">
                        <div class="card-header">
                            <span class="card-title">${claim.type}</span>
                            <span class="badge badge-${claim.status === 'approved' ? 'success' : 'warning'}">
                                ${claim.status === 'pending' ? 'รอดำเนินการ' : 'อนุมัติ'}
                            </span>
                        </div>
                        <div class="card-body">
                            <p class="text-sm text-muted">วันที่: ${claim.date}</p>
                        </div>
                    </div>
                `).join('')}
            ` : ''}
        `;
    },

    findAgent() {
        return `
            <h2 class="mb-lg">ค้นหาตัวแทนประกัน</h2>

            <div class="form-group">
                <input type="text" class="form-input" placeholder="🔍 ค้นหาด้วยรหัสตัวแทนหรือเบอร์โทร...">
            </div>

            <button class="btn btn-primary btn-block mb-md" onclick="app.scanQRCode()">
                📷 สแกน QR Code
            </button>

            <button class="btn btn-secondary btn-block mb-lg" onclick="app.searchByLocation()">
                🗺️ ค้นหาตามพื้นที่
            </button>

            <div class="divider"></div>

            <h3 class="mb-md">ตัวแทนแนะนำ</h3>

            ${[1,2,3].map(i => `
                <div class="card mb-md">
                    <div class="flex" style="align-items: center; gap: 1rem;">
                        <img src="https://ui-avatars.com/api/?name=Agent${i}&background=random&size=60" 
                             style="width: 60px; height: 60px; border-radius: 50%;">
                        <div style="flex: 1;">
                            <div style="font-weight: 600;">นายตัวแทน ${i}</div>
                            <div class="text-sm text-muted">กรุงเทพประกันภัย</div>
                            <div class="text-sm text-muted">⭐ 4.${5+i}/5.0</div>
                        </div>
                        <button class="btn btn-primary btn-sm" onclick="app.connectAgent(${i})">
                            เชื่อมต่อ
                        </button>
                    </div>
                </div>
            `).join('')}
        `;
    },

    more() {
        return `
            <h2 class="mb-lg">เมนูเพิ่มเติม</h2>

            <div class="card mb-md" onclick="app.viewReports()">
                <div class="flex-between">
                    <div class="flex" style="align-items: center; gap: 1rem;">
                        <div style="width: 48px; height: 48px; background: #3b82f6; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                <path d="M12 20V10M9 17H15M9 13H15M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z"/>
                            </svg>
                        </div>
                        <div>
                            <div style="font-weight: 600;">รายงานสรุป</div>
                            <div class="text-sm text-muted">สรุปประกันและค่าใช้จ่าย</div>
                        </div>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"/>
                    </svg>
                </div>
            </div>

            <div class="card mb-md" onclick="app.viewNotifications()">
                <div class="flex-between">
                    <div class="flex" style="align-items: center; gap: 1rem;">
                        <div style="width: 48px; height: 48px; background: #10b981; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                            </svg>
                        </div>
                        <div>
                            <div style="font-weight: 600;">การแจ้งเตือน</div>
                            <div class="text-sm text-muted">ตั้งค่าการแจ้งเตือน</div>
                        </div>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"/>
                    </svg>
                </div>
            </div>

            <div class="card mb-md" onclick="app.agentPortal()">
                <div class="flex-between">
                    <div class="flex" style="align-items: center; gap: 1rem;">
                        <div style="width: 48px; height: 48px; background: #f59e0b; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                            </svg>
                        </div>
                        <div>
                            <div style="font-weight: 600;">📱 พอร์ทัลตัวแทน</div>
                            <div class="text-sm text-muted">เพิ่มกรมธรรม์ให้ลูกค้า</div>
                        </div>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"/>
                    </svg>
                </div>
            </div>

            <div class="card mb-md" onclick="app.settings()">
                <div class="flex-between">
                    <div class="flex" style="align-items: center; gap: 1rem;">
                        <div style="width: 48px; height: 48px; background: #6366f1; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                <circle cx="12" cy="12" r="3"/>
                                <path d="M12 1v6m0 6v6m7.071-15.071l-4.243 4.243m-5.656 5.656l-4.243 4.243m15.071 0l-4.243-4.243M4.929 4.929l4.243 4.243"/>
                            </svg>
                        </div>
                        <div>
                            <div style="font-weight: 600;">ตั้งค่า</div>
                            <div class="text-sm text-muted">บัญชีและความเป็นส่วนตัว</div>
                        </div>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"/>
                    </svg>
                </div>
            </div>

            <div class="card" onclick="app.help()">
                <div class="flex-between">
                    <div class="flex" style="align-items: center; gap: 1rem;">
                        <div style="width: 48px; height: 48px; background: #ef4444; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m.08 4h.01"/>
                            </svg>
                        </div>
                        <div>
                            <div style="font-weight: 600;">ช่วยเหลือและคู่มือ</div>
                            <div class="text-sm text-muted">วิธีใช้งานแอป</div>
                        </div>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"/>
                    </svg>
                </div>
            </div>
        `;
    },

    agentPortal() {
        return `
            <h2 class="mb-md">พอร์ทัลสำหรับตัวแทน</h2>
            <p class="text-muted mb-lg">เพิ่มกรมธรรม์ให้กับลูกค้าของคุณ</p>

            <form onsubmit="app.submitAgentPolicy(event)" class="fade-in">
                <div class="form-group">
                    <label class="form-label">ค้นหาลูกค้า</label>
                    <input type="text" class="form-input" placeholder="ชื่อ, เบอร์โทร, หรือเลขบัตร" required>
                </div>

                <div class="divider"></div>

                <h3 class="mb-md">ข้อมูลกรมธรรม์</h3>

                <div class="form-group">
                    <label class="form-label">ประเภทประกัน</label>
                    <select class="form-select" required>
                        <option value="">เลือกประเภท</option>
                        <option value="life">ประกันชีวิต</option>
                        <option value="health">ประกันสุขภาพ</option>
                        <option value="auto">ประกันรถยนต์</option>
                        <option value="accident">ประกันอุบัติเหตุ</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">บริษัทประกัน</label>
                    <select class="form-select" required>
                        <option value="">เลือกบริษัท</option>
                        <option value="aia">AIA ประกันชีวิต</option>
                        <option value="bkk">กรุงเทพประกันภัย</option>
                        <option value="muang">เมืองไทยประกันภัย</option>
                        <option value="dhipaya">ธนชาต ประกันภัย</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">แผนที่เลือก / เลขกรมธรรม์</label>
                    <input type="text" class="form-input" placeholder="เช่น Premium Plan / POL-12345" required>
                </div>

                <div class="grid grid-2 gap-md">
                    <div class="form-group">
                        <label class="form-label">วันที่เริ่มต้น</label>
                        <input type="date" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">วันที่สิ้นสุด</label>
                        <input type="date" class="form-input" required>
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label">เบี้ยประกัน (บาท/ปี)</label>
                    <input type="number" class="form-input" placeholder="0" required>
                </div>

                <div class="form-group">
                    <label class="form-label">แนบไฟล์กรมธรรม์ (ถ้ามี)</label>
                    <div class="file-upload">
                        <input type="file" accept=".pdf,image/*">
                        <div>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin: 0 auto 0.5rem; opacity: 0.3;">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="17 8 12 3 7 8"/>
                                <line x1="12" y1="3" x2="12" y2="15"/>
                            </svg>
                            <p class="text-sm">คลิกเพื่ออัปโหลด</p>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label">หมายเหตุ (ถ้ามี)</label>
                    <textarea class="form-textarea" placeholder="ข้อมูลเพิ่มเติม..."></textarea>
                </div>

                <button type="submit" class="btn btn-primary btn-lg btn-block">
                    📤 ส่งให้ลูกค้ายืนยัน
                </button>
            </form>

            <div class="alert alert-info mt-lg">
                <strong>ℹ️ หมายเหตุ:</strong><br>
                ลูกค้าจะได้รับการแจ้งเตือนและต้องกด "ยืนยันรับกรมธรรม์" เพื่ออนุมัติ
            </div>
        `;
    }
};

// ============================================
// Main App Controller
// ============================================
const app = {
    init() {
        this.setupListeners();
        this.navigate('home');
    },

    setupListeners() {
        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const page = e.currentTarget.dataset.page;
                this.navigate(page);
            });
        });

        document.getElementById('backBtn').addEventListener('click', () => {
            this.navigate('home');
        });

        document.getElementById('notificationBtn').addEventListener('click', () => {
            this.viewNotifications();
        });

        document.getElementById('modalContainer').addEventListener('click', (e) => {
            if (e.target.id === 'modalContainer') {
                this.closeModal();
            }
        });
    },

    navigate(page) {
        state.currentPage = page;
        const mainContent = document.getElementById('mainContent');
        const backBtn = document.getElementById('backBtn');
        const pageTitle = document.getElementById('pageTitle');

        mainContent.innerHTML = pages[page]();

        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.page === page);
        });

        const titles = {
            home: 'InsuranceMate',
            agent: 'ตัวแทนของฉัน',
            family: 'ครอบครัว',
            claim: 'แจ้งเคลม',
            findAgent: 'ค้นหาตัวแทน',
            more: 'เพิ่มเติม',
            agentPortal: 'พอร์ทัลตัวแทน'
        };

        pageTitle.textContent = titles[page] || 'InsuranceMate';
        backBtn.style.display = page === 'home' ? 'none' : 'flex';

        mainContent.scrollTop = 0;
    },

    viewInsurance(id) {
        const insurance = state.insurances.find(i => i.id === id);
        components.showModal('รายละเอียดกรมธรรม์', `
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
                    ${utils.getInsuranceIcon(insurance.type)}
                </div>
                <h3 style="margin-bottom: 0.5rem;">${insurance.company}</h3>
                <p class="text-muted">${insurance.typeName}</p>
            </div>
            <div class="divider"></div>
            <div style="display: grid; gap: 1rem;">
                <div>
                    <div class="text-sm text-muted">เลขกรมธรรม์</div>
                    <div style="font-weight: 600;">${insurance.policyNumber}</div>
                </div>
                <div>
                    <div class="text-sm text-muted">วันที่เริ่มคุ้มครอง</div>
                    <div style="font-weight: 600;">${utils.formatDate(insurance.startDate)}</div>
                </div>
                <div>
                    <div class="text-sm text-muted">วันที่สิ้นสุด</div>
                    <div style="font-weight: 600;">${utils.formatDate(insurance.endDate)}</div>
                </div>
                <div>
                    <div class="text-sm text-muted">เบี้ยประกัน</div>
                    <div style="font-weight: 600; color: #2563eb; font-size: 1.25rem;">${utils.formatCurrency(insurance.premium)}/ปี</div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="app.closeModal()">ปิด</button>
                <button class="btn btn-primary" onclick="app.renewPolicy(${id})">ต่ออายุ</button>
            </div>
        `);
    },

    viewFamilyMember(id) {
        const member = state.family.find(m => m.id === id);
        const memberInsurances = state.insurances.filter(i => i.owner === member.relation.toLowerCase());
        
        components.showModal(member.name, `
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <div style="font-size: 4rem; margin-bottom: 0.5rem;">${member.avatar}</div>
                <div class="text-muted">${member.relation}</div>
            </div>
            <div class="divider"></div>
            <h4 style="margin-bottom: 1rem;">กรมธรรม์ (${memberInsurances.length})</h4>
            ${memberInsurances.length > 0 ? memberInsurances.map(ins => `
                <div class="card mb-md">
                    <div style="font-weight: 600;">${ins.typeName}</div>
                    <div class="text-sm text-muted">${ins.company}</div>
                    <div class="text-sm" style="margin-top: 0.5rem;">หมดอายุ: ${utils.formatDate(ins.endDate)}</div>
                </div>
            `).join('') : '<p class="text-center text-muted">ยังไม่มีกรมธรรม์</p>'}
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="app.closeModal()">ปิด</button>
                <button class="btn btn-primary" onclick="app.addInsuranceForMember(${id})">เพิ่มกรมธรรม์</button>
            </div>
        `);
    },

    submitClaim(e) {
        e.preventDefault();
        const claim = {
            id: Date.now(),
            type: 'ประกันรถยนต์',
            date: new Date().toISOString().split('T')[0],
            status: 'pending'
        };
        state.claims.push(claim);
        components.showToast('ส่งเคลมเรียบร้อยแล้ว ระบบจะติดต่อกลับภายใน 24 ชั่วโมง', 'success');
        setTimeout(() => this.navigate('home'), 2000);
    },

    submitAgentPolicy(e) {
        e.preventDefault();
        components.showToast('ส่งกรมธรรม์ให้ลูกค้าเรียบร้อย รอการยืนยัน', 'success');
        setTimeout(() => this.navigate('more'), 2000);
    },

    previewFiles(e) {
        const preview = document.getElementById('filePreview');
        preview.innerHTML = '';
        Array.from(e.target.files).forEach((file, i) => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                preview.innerHTML += `
                    <div class="file-preview-item">
                        <img src="${ev.target.result}" alt="${file.name}">
                        <button type="button" class="file-preview-remove" onclick="this.parentElement.remove()">×</button>
                    </div>
                `;
            };
            reader.readAsDataURL(file);
        });
    },

    callAgent() {
        components.showToast(`กำลังโทรหา ${state.agent.name}...`, 'info');
    },

    openChat() {
        components.showModal('แชทกับตัวแทน', `
            <div class="chat-container">
                <div class="chat-messages" id="chatMessages">
                    ${state.chatMessages.map(msg => `
                        <div class="chat-message ${msg.type}">
                            <div>${msg.text}</div>
                            <div class="chat-time">${msg.time}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="chat-input-container">
                    <input type="text" class="chat-input" id="chatInput" placeholder="พิมพ์ข้อความ...">
                    <button class="chat-send-btn" onclick="app.sendMessage()">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="22" y1="2" x2="11" y2="13"/>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                    </button>
                </div>
            </div>
        `);
    },

    sendMessage() {
        const input = document.getElementById('chatInput');
        if (!input.value.trim()) return;
        
        const msg = {
            id: Date.now(),
            type: 'sent',
            text: input.value,
            time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
        };
        state.chatMessages.push(msg);
        
        const messages = document.getElementById('chatMessages');
        messages.innerHTML += `
            <div class="chat-message sent">
                <div>${msg.text}</div>
                <div class="chat-time">${msg.time}</div>
            </div>
        `;
        messages.scrollTop = messages.scrollHeight;
        input.value = '';
    },

    makeAppointment() {
        components.showToast('กำลังเปิดปฏิทินนัดหมาย...', 'info');
    },

    sendDocument() {
        components.showToast('กำลังเปิดหน้าส่งเอกสาร...', 'info');
    },

    scanQRCode() {
        components.showToast('เปิดกล้องสแกน QR Code...', 'info');
    },

    searchByLocation() {
        components.showToast('กำลังค้นหาตัวแทนใกล้คุณ...', 'info');
    },

    connectAgent(id) {
        components.showToast('เชื่อมต่อกับตัวแทนเรียบร้อย', 'success');
    },

    addFamilyMember() {
        components.showToast('กำลังเปิดฟอร์มเพิ่มสมาชิก...', 'info');
    },

    addInsuranceForMember(id) {
        this.closeModal();
        components.showToast('กำลังเปิดฟอร์มเพิ่มกรมธรรม์...', 'info');
    },

    renewPolicy(id) {
        this.closeModal();
        components.showToast('กำลังดำเนินการต่ออายุกรมธรรม์...', 'info');
    },

    viewNotifications() {
        components.showModal('การแจ้งเตือน', `
            ${state.notifications.map(notif => `
                <div class="alert alert-${notif.type} mb-md">
                    <strong>${notif.title}</strong><br>
                    <p class="text-sm" style="margin: 0.5rem 0 0 0;">${notif.message}</p>
                    <p class="text-xs text-muted" style="margin: 0.5rem 0 0 0;">${utils.formatDate(notif.date)}</p>
                </div>
            `).join('')}
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="app.closeModal()">ปิด</button>
            </div>
        `);
    },

    viewReports() {
        const total = state.insurances.reduce((sum, ins) => sum + ins.premium, 0);
        components.showModal('รายงานสรุป', `
            <h4 class="mb-md">กรมธรรม์ทั้งหมด: ${state.insurances.length} ฉบับ</h4>
            <div class="divider"></div>
            ${state.insurances.map(ins => `
                <div class="flex-between mb-md">
                    <div>
                        <div style="font-weight: 600;">${ins.typeName}</div>
                        <div class="text-sm text-muted">${ins.company}</div>
                    </div>
                    <div style="font-weight: 600; color: #2563eb;">${utils.formatCurrency(ins.premium)}</div>
                </div>
            `).join('')}
            <div class="divider"></div>
            <div class="flex-between">
                <strong style="font-size: 1.25rem;">เบี้ยรวมต่อปี</strong>
                <strong style="font-size: 1.5rem; color: #2563eb;">${utils.formatCurrency(total)}</strong>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="app.closeModal()">ปิด</button>
                <button class="btn btn-primary" onclick="app.exportPDF()">ส่งออก PDF</button>
            </div>
        `);
    },

    exportPDF() {
        components.showToast('กำลังสร้างไฟล์ PDF...', 'success');
    },

    agentPortal() {
        this.navigate('agentPortal');
    },

    settings() {
        components.showToast('กำลังเปิดหน้าตั้งค่า...', 'info');
    },

    help() {
        components.showModal('ช่วยเหลือและคู่มือ', `
            <h4 class="mb-md">วิธีใช้งาน InsuranceMate</h4>
            
            <div class="card mb-md">
                <strong>🏠 หน้าแรก</strong>
                <p class="text-sm text-muted" style="margin-top: 0.5rem;">ดูกรมธรรม์ทั้งหมดและการแจ้งเตือน</p>
            </div>
            
            <div class="card mb-md">
                <strong>👨‍👩‍👧‍👦 ครอบครัว</strong>
                <p class="text-sm text-muted" style="margin-top: 0.5rem;">จัดการกรมธรรม์ของคนในครอบครัว</p>
            </div>
            
            <div class="card mb-md">
                <strong>📤 แจ้งเคลม</strong>
                <p class="text-sm text-muted" style="margin-top: 0.5rem;">กรอกข้อมูลและส่งเคลมออนไลน์</p>
            </div>
            
            <div class="card mb-md">
                <strong>👨‍💼 ตัวแทน</strong>
                <p class="text-sm text-muted" style="margin-top: 0.5rem;">ติดต่อกับตัวแทนของคุณได้ทันที</p>
            </div>
            
            <div class="divider"></div>
            <p class="text-center text-muted">ต้องการความช่วยเหลือเพิ่มเติม?<br>โทร 1234 หรือ อีเมล support@insurancemate.com</p>
            
            <div class="modal-footer">
                <button class="btn btn-primary btn-block" onclick="app.closeModal()">เข้าใจแล้ว</button>
            </div>
        `);
    },

    closeModal() {
        document.getElementById('modalContainer').classList.remove('active');
    }
};

// ============================================
// Initialize App
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
