# 🏢 IT4082 Apartment Management System

Hệ thống quản lý chung cư toàn diện - Dự án IT4082

## 📚 Documentation

Tất cả tài liệu và hướng dẫn được tổ chức trong thư mục **[`docs/`](./docs/README.md)**

### 🔗 Quick Links

- **📖 [Cấu trúc Dự án](./docs/PROJECT_STRUCTURE.md)** - Xem cấu trúc tổ chức file và folder
- **🔐 [Thông tin Tài khoản](./docs/ACCOUNTS_INFO.md)** - Tài khoản đăng nhập hệ thống
- **🚀 [Hướng dẫn Bắt đầu](./03_Developement/README.md)** - Quick start guide
- **💻 [Chạy trên VS Code](./docs/guides/HUONG_DAN_CHAY_TREN_VSCODE.md)** - Hướng dẫn chi tiết cho Windows

---

## 🗂️ Cấu trúc Dự án

```
anbinh93-Project-IT4082-87836db/
├── 📚 docs/                      # Tài liệu và hướng dẫn
├── 01_Concept/                   # Giai đoạn Concept
├── 02_Definition/                # Giai đoạn Definition
├── 03_Developement/              # ⭐ Code chính (Backend + Frontend)
├── 04_Testing/                   # Testing
└── 5_Release/                    # Release
```

Xem chi tiết: **[Cấu trúc Dự án](./docs/PROJECT_STRUCTURE.md)**

---

## 🚀 Quick Start

### 1. Cài đặt Node.js
👉 Xem: [`docs/installation/CAI_DAT_NODEJS_WINDOWS.md`](./docs/installation/CAI_DAT_NODEJS_WINDOWS.md)

### 2. Setup Dự án
```bash
cd 03_Developement
npm run setup
```

### 3. Chạy Development
```bash
npm run dev
```

### 4. Truy cập
- **Frontend**: http://localhost:5173/KTPM_FE
- **Backend API**: http://localhost:8000

### 5. Đăng nhập
👉 Xem: [`docs/ACCOUNTS_INFO.md`](./docs/ACCOUNTS_INFO.md)

---

## 📋 Tính Năng Chính

### 🏠 Quản lý Cư dân
- Quản lý Hộ khẩu
- Quản lý Nhân khẩu
- Quản lý Phòng/Căn hộ
- Quản lý Xe
- Quản lý Tạm trú/Tạm vắng
- Lịch sử thay đổi

### 💰 Quản lý Tài chính
- Quản lý Khoản thu
- Quản lý Đợt thu phí
- Theo dõi thanh toán
- Thống kê tài chính

### 📊 Báo cáo và Thống kê
- Thống kê Nhân khẩu
- Thống kê Khoản thu
- Dashboard tổng quan
- Xuất báo cáo Excel

---

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express.js + Sequelize
- **Database**: PostgreSQL
- **Authentication**: JWT

---

## 📖 Documentation Index

Tất cả documentation được tổ chức tại [`docs/`](./docs/README.md):

### Guides
- [Hướng dẫn chạy trên VS Code](./docs/guides/HUONG_DAN_CHAY_TREN_VSCODE.md)
- [Các bước tiếp theo](./docs/guides/BUOC_TIEP_THEO.md)

### Installation
- [Cài đặt Node.js trên Windows](./docs/installation/CAI_DAT_NODEJS_WINDOWS.md)

### Development
- [Quick Start](./03_Developement/QUICK_START.md)
- [Installation Guide](./03_Developement/INSTALLATION_GUIDE.md)
- [Production Deployment](./03_Developement/PRODUCTION_DEPLOYMENT.md)

---

## 👥 Team

IT4082 Development Team

---

**Version**: 1.0.0  
**Last Updated**: 2025-01-XX

