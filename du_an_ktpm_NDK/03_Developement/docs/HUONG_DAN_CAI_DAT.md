# 🏢 Hệ Thống Quản Lý Chung Cư IT4082

## 📋 Yêu Cầu Hệ Thống

- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0
- **PostgreSQL**: >= 12.0 (hoặc sử dụng pgAdmin 4)
- **Git**: Để clone repository

---

## 🚀 Cài Đặt Nhanh (Windows)

### **Bước 1: Mở Terminal trong VS Code**
1. Mở Visual Studio Code
2. File → Open Folder → Chọn thư mục: `D:\du_an_ktpm_NDK\du_an_ktpm_NDK\03_Developement`
3. Mở Terminal: `Ctrl + `` (backtick) hoặc `Terminal → New Terminal`

### **Bước 2: Cài Đặt Dependencies**

#### **Cài Backend**
cd server
npm install#### **Cài Frontend** (Mở Terminal mới)hell
cd fe
npm install### **Bước 3: Cấu Hình Database PostgreSQL**

1. **Tạo Database trong pgAdmin 4:**
   - Mở pgAdmin 4
   - Tạo database mới: `department_management`

2. **Tạo file `.env` trong thư mục `server`:**
   NODE_ENV=development
   DB_USER=postgres
   DB_PASSWORD=admin
   DB_NAME=department_management
   DB_HOST=localhost
   DB_PORT=5432
   PORT=8000
   JWT_SECRET=your-secret-key-change-this-in-production
   ### **Bước 4: Thiết Lập Database**

Trong Terminal (đang ở thư mục `server`):
# Chạy migrations (tạo các bảng trong database)
npm run migrate

# Chạy seeders (tạo dữ liệu mẫu)
npm run seed### **Bước 5: Khởi Động Ứng Dụng**

#### **Terminal 1 - Chạy Backend Server**rshell
cd server
npm run dev✅ Backend sẽ chạy tại: **http://localhost:8000**

#### **Terminal 2 - Chạy Frontend** (Mở Terminal mới)owershell
cd fe
npm run dev✅ Frontend sẽ chạy tại: **http://localhost:5173**

### **Bước 6: Đăng Nhập**
- Truy cập: **http://localhost:5173**
- Tài khoản mặc định:
  - **Quản lý**: `totruong` / `totruong123`
  - **Kế toán**: `ketoan` / `ketoan123`

---

## 🔧 Các Lệnh Hữu Ích

### **Backend (trong thư mục `server`)**rshell
npm run dev          # Chạy development server
npm run migrate      # Chạy database migrations
npm run seed         # Chạy database seeders
npm run migrate:undo # Hoàn tác migration cuối cùng### **Frontend (trong thư mục `fe`)**rshell
npm run dev          # Chạy development server
npm run build        # Build cho production
npm run preview      # Preview production build---

## 🆘 Xử Lý Lỗi

### **Lỗi: "Port đã được sử dụng" (Windows)**

#### **Cách 1: Sử dụng Task Manager**
1. Mở Task Manager (`Ctrl + Shift + Esc`)
2. Tìm và kết thúc các process đang dùng port 8000 hoặc 5173

#### **Cách 2: Sử dụng PowerShell**wershell
# Tìm process đang dùng port 8000
netstat -ano | findstr :8000

# Tìm process đang dùng port 5173
netstat -ano | findstr :5173

# Kết thúc process (thay PID bằng số thực tế)
taskkill /PID <PID> /F### **Lỗi: Database Connection**

#### **Kiểm tra PostgreSQL đang chạy:**hell
# Kiểm tra service PostgreSQL
Get-Service -Name postgresql*#### **Reset Database:**
1. Mở pgAdmin 4
2. Xóa database `department_management`
3. Tạo lại database mới
4. Chạy lại migrations:
  
   cd server
   npm run migrate
   npm run seed
   
### **Lỗi: Foreign Key Constraint**
Nếu gặp lỗi foreign key khi chạy seed:
cd server
# Xóa tất cả dữ liệu và chạy lại
npm run migrate:undo:all
npm run migrate
npm run seed### **Lỗi: Dependencies**l
# Xóa node_modules và cài lại
cd server
Remove-Item -Recurse -Force node_modules
npm install

cd ..\fe
Remove-Item -Recurse -Force node_modules
npm install---

## 👥 Tài Khoản Mặc Định

| Vai trò | Tên đăng nhập | Mật khẩu |
|---------|---------------|----------|
| Quản lý | totruong | totruong123 |
| Kế toán | ketoan | ketoan123 |

---

## 📁 Cấu Trúc Dự Án
du_an_ktpm_NDK/
│
├── 📁 01_Concept/                    # Giai đoạn khái niệm
│   └── README.md
│
├── 📁 02_Definition/                 # Giai đoạn định nghĩa
│   ├── 📁 01_Architecture/
│   ├── 📁 02_Requirement/
│   ├── 📁 03_Design/
│   └── README.md
│
├── 📁 03_Developement/               # ⭐ PHẦN PHÁT TRIỂN CHÍNH
│   │
│   ├── 📄 package.json                # Dependencies chung
│   ├── 📄 docker-compose.yml         # Cấu hình Docker
│   ├── 📄 setup.sh                   # Script cài đặt tự động
│   ├── 📄 deploy.sh                  # Script deploy
│   │
│   ├── 📁 docs/                      # Tài liệu
│   │   ├── HUONG_DAN_CAI_DAT.md
│   │   └── ISSUES_FIXED.md
│   │
│   ├── 📁 server/                    # 🔧 BACKEND (Node.js + Express)
│   │   │
│   │   ├── 📄 server.js              # Entry point chính
│   │   ├── 📄 package.json           # Backend dependencies
│   │   ├── 📄 Dockerfile              # Docker config cho backend
│   │   │
│   │   ├── 📁 config/                # Cấu hình
│   │   │   └── config.js              # Database config
│   │   │
│   │   ├── 📁 db/                    # Database layer
│   │   │   ├── 📁 migrations/        # Database migrations
│   │   │   │   └── 20250616000000-complete-database-schema.js
│   │   │   ├── 📁 models/           # Sequelize models (17 files)
│   │   │   │   ├── index.js
│   │   │   │   ├── user.js
│   │   │   │   ├── nhankhau.js
│   │   │   │   ├── hokhau.js
│   │   │   │   ├── room.js
│   │   │   │   ├── canho.js
│   │   │   │   ├── dotthu.js
│   │   │   │   ├── khoanthu.js
│   │   │   │   ├── dotthu_khoanthu.js
│   │   │   │   ├── householdfee.js
│   │   │   │   ├── nopphi.js
│   │   │   │   ├── tamtrutamvang.js
│   │   │   │   ├── quanlyxe.js
│   │   │   │   ├── loaixe.js
│   │   │   │   ├── thanhvienhokhau.js
│   │   │   │   ├── lichsuthaydoihokhau.js
│   │   │   │   └── thanhtoan.js
│   │   │   └── 📁 seeders/           # Database seeders
│   │   │       └── 20250616000001-production-data-seeder.js
│   │   │
│   │   ├── 📁 controllers/           # Business logic (14 files)
│   │   │   ├── authController.js
│   │   │   ├── residentController.js
│   │   │   ├── householdController.js
│   │   │   ├── roomController.js
│   │   │   ├── canhoController.js
│   │   │   ├── dotThuController.js
│   │   │   ├── khoanThuController.js
│   │   │   ├── householdFeeController.js
│   │   │   ├── paymentController.js
│   │   │   ├── vehicleController.js
│   │   │   ├── tamTruController.js
│   │   │   ├── statisticsController.js
│   │   │   ├── populationStatisticsController.js
│   │   │   └── accountantController.js
│   │   │
│   │   ├── 📁 routes/                # API routes (14 files)
│   │   │   ├── authRoutes.js
│   │   │   ├── residents.js
│   │   │   ├── households.js
│   │   │   ├── roomRoutes.js
│   │   │   ├── canhoRoutes.js
│   │   │   ├── dotThuRoutes.js
│   │   │   ├── khoanThuRoutes.js
│   │   │   ├── householdFeeRoutes.js
│   │   │   ├── paymentRoutes.js
│   │   │   ├── vehicleRoutes.js
│   │   │   ├── tamTruRoutes.js
│   │   │   ├── statisticsRoutes.js
│   │   │   ├── populationStatisticsRoutes.js
│   │   │   └── accountantRoutes.js
│   │   │
│   │   ├── 📁 middlewares/           # Custom middleware
│   │   │   └── authMiddleware.js
│   │   │
│   │   ├── 📁 services/              # Business services
│   │   │   ├── feeCalculationService.js
│   │   │   └── vehicleService.js
│   │   │
│   │   ├── 📁 scripts/               # Utility scripts
│   │   │   ├── add-khoan-dong-gop.js
│   │   │   ├── check-duplicate-rooms.js
│   │   │   └── validate-database.js
│   │   │
│   │   ├── 📁 __tests__/             # Unit tests
│   │   │   └── paymentController.test.js
│   │   │
│   │   └── 📄 *.sql                  # SQL scripts
│   │       ├── drop-all-tables.sql
│   │       └── check-rooms-data.sql
│   │
│   └── 📁 fe/                        # 🎨 FRONTEND (React + TypeScript + Vite)
│       │
│       ├── 📄 package.json           # Frontend dependencies
│       ├── 📄 vite.config.ts         # Vite configuration
│       ├── 📄 tailwind.config.js     # Tailwind CSS config
│       ├── 📄 tsconfig.json          # TypeScript config
│       ├── 📄 Dockerfile              # Docker config cho frontend
│       ├── 📄 nginx.conf             # Nginx config cho production
│       │
│       ├── 📁 public/                # Static assets
│       │   ├── vite.svg
│       │   ├── moonlight-background.jpg
│       │   ├── mau_phi_dien.xlsx
│       │   ├── mau_phi_nuoc.xlsx
│       │   └── mau_phi_internet.xlsx
│       │
│       ├── 📁 dist/                   # Build output (production)
│       │
│       └── 📁 src/                    # Source code
│           │
│           ├── 📄 main.tsx            # Entry point
│           ├── 📄 App.tsx             # Root component
│           ├── 📄 App.css             # Global styles
│           ├── 📄 index.css           # Base styles
│           │
│           ├── 📁 assets/            # Images, icons
│           │   ├── logo.png
│           │   └── react.svg
│           │
│           ├── 📁 components/        # Reusable components (32 files)
│           │   ├── Layout.tsx
│           │   ├── Login.tsx
│           │   ├── ProtectedRoute.tsx
│           │   ├── AddEditHoKhauPopup.tsx
│           │   ├── AddEditNhanKhauPopup.tsx
│           │   ├── AddEditRoomPopup.tsx
│           │   ├── AddEditDotThuPhiPopup.tsx
│           │   ├── AddEditFeePopup.tsx
│           │   ├── NopPhiPopup.tsx
│           │   ├── PaymentConfirmPopup.tsx
│           │   ├── VehicleManagement.tsx
│           │   └── ... (20+ components khác)
│           │
│           ├── 📁 pages/             # Page components (22 files)
│           │   ├── Login.tsx
│           │   ├── HomepageToTruong.tsx
│           │   ├── HomepageKeToan.tsx
│           │   ├── QuanLyNhanKhau.tsx
│           │   ├── QuanLyHoKhau.tsx
│           │   ├── QuanLyPhong.tsx
│           │   ├── QuanLyDotThuPhi.tsx
│           │   ├── QuanLyKhoanThu.tsx
│           │   ├── QuanLyXe.tsx
│           │   ├── QuanLyTamTru.tsx
│           │   ├── ThongKeNhanKhau.tsx
│           │   └── ... (10+ pages khác)
│           │
│           ├── 📁 services/         # API services
│           │   ├── api.ts            # Base API client
│           │   ├── authService.ts
│           │   ├── roomService.ts
│           │   └── vehicleService.ts
│           │
│           └── 📁 utils/            # Utility functions
│               └── tokenHelper.ts
│
├── 📁 04_Testing/                    # Giai đoạn testing
│   ├── README.md
│   ├── test-*.js                    # Test scripts
│   └── *_test_results.md            # Test reports
│
├── 📁 5_Release/                     # Giai đoạn release
│   └── README.md
│
├── 📁 docs/                         # Tài liệu tổng hợp
│   ├── ACCOUNTS_INFO.md
│   └── 📁 guides/
│       ├── BUOC_TIEP_THEO.md
│       └── HUONG_DAN_CHAY_TREN_VSCODE.md
│
├── 📄 README.md                     # README chính
├── 📄 RENAME_PROJECT.ps1            # Script đổi tên project
└── 📄 HUONG_DAN_CHAY_TREN_VSCODE.md # Hướng dẫn chạy trên VS Code
