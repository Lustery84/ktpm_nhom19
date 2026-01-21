# 🚀 Các Bước Tiếp Theo Để Chạy Dự Án

## ✅ Bước 1: Kiểm Tra Yêu Cầu Hệ Thống

Trước khi bắt đầu, đảm bảo bạn đã cài đặt:

- ✅ **Node.js**: >= 18.0.0 (kiểm tra: `node --version`)
- ✅ **npm**: >= 8.0.0 (kiểm tra: `npm --version`)
- ✅ **PostgreSQL**: >= 12.0 hoặc pgAdmin 4
- ✅ **Visual Studio Code**: Để mở và chỉnh sửa code

---

## 📋 Bước 2: Mở Project Trong VS Code

1. Mở **Visual Studio Code**
2. **File** → **Open Folder**
3. Chọn thư mục: `D:\du_an_ktpm_NDK\du_an_ktpm_NDK\03_Developement`
4. Mở Terminal: `Ctrl + `` (backtick) hoặc **Terminal** → **New Terminal**

---

## 📦 Bước 3: Cài Đặt Dependencies

### **3.1. Cài Đặt Backend Dependencies**

Trong Terminal, chạy:
cd server
npm install⏱️ Chờ khoảng 1-2 phút để cài đặt xong.

### **3.2. Cài Đặt Frontend Dependencies**

Mở **Terminal mới** (click dấu `+` trong Terminal panel hoặc `Terminal → New Terminal`):hell
cd fe
npm install⏱️ Chờ khoảng 2-3 phút để cài đặt xong.

---

## 🗄️ Bước 4: Cài Đặt và Cấu Hình PostgreSQL

### **4.1. Cài Đặt PostgreSQL**

**Cách 1: Cài PostgreSQL Trực Tiếp (Khuyến Nghị)**

1. **Tải PostgreSQL:**
   - Truy cập: https://www.postgresql.org/download/windows/
   - Hoặc: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
   - Tải phiên bản mới nhất (PostgreSQL 15 hoặc 16)

2. **Cài Đặt:**
   - Chạy installer
   - **Quan trọng**: Ghi nhớ password bạn đặt cho user `postgres` (mặc định thường là `postgres` hoặc `admin`)
   - Port mặc định: `5432` (giữ nguyên)
   - Hoàn tất cài đặt

3. **Kiểm Tra PostgreSQL Đang Chạy:**
   - Mở **Services** (Win + R → gõ `services.msc`)
   - Tìm service "postgresql" → Đảm bảo đang chạy (Running)
   - Nếu chưa chạy, Right-click → **Start**

**Cách 2: Sử Dụng pgAdmin 4**

Nếu bạn đã cài pgAdmin 4:
1. Mở pgAdmin 4
2. Kết nối đến PostgreSQL server (sử dụng password bạn đã đặt)
3. Tạo database mới: `department_management`

### **4.2. Tạo File .env cho Backend**

1. Trong VS Code, tạo file mới: `server/.env`
2. Copy nội dung sau vào:
   NODE_ENV=development
   DB_USER=postgres
   DB_PASSWORD=admin
   DB_NAME=department_management
   DB_HOST=localhost
   DB_PORT=5432
   PORT=8000
   JWT_SECRET=your-secret-key-change-this-in-production
   3. **Quan trọng**: Sửa `DB_PASSWORD` thành password bạn đã đặt khi cài PostgreSQL

---

## 🗃️ Bước 5: Thiết Lập Database

Sau khi đã cài PostgreSQL và tạo file `.env`, trong Terminal (ở thư mục `server`):

# Chạy migrations (tạo các bảng trong database)
npm run migrate

# Chạy seeders (tạo dữ liệu mẫu)
npm run seed✅ Nếu thành công, bạn sẽ thấy thông báo:
- `✅ Database schema created successfully!`
- `🌱 Starting comprehensive data seeding...`
- `✅ Data seeding completed successfully!`

### **Nếu Gặp Lỗi Foreign Key Constraint:**
ell
# Xóa database và tạo lại (trong pgAdmin 4)
# Hoặc chạy lại migrations:
npm run migrate:undo:all
npm run migrate
npm run seed
---

## 🚀 Bước 6: Chạy Development Servers

### **Terminal 1 - Chạy Backend:**
shell
cd server
npm run dev✅ Backend sẽ chạy tại: **http://localhost:8000**

cd fe
npm installông đóng Terminal này, để backend tiếp tục chạy.


