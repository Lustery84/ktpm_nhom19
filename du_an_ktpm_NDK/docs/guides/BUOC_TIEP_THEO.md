# 🚀 Các Bước Tiếp Theo Để Chạy Dự Án

## ✅ Bước 1: Đã Hoàn Thành
- ✅ Cài đặt Node.js v24.12.0
- ✅ Cài đặt npm v11.6.2

---

## 📋 Bước 2: Di Chuyển Vào Thư Mục Dự Án

Mở **Terminal trong VS Code** (`Ctrl + ``) và chạy:

```powershell
cd D:\anbinh93-Project-IT4082-87836db\anbinh93-Project-IT4082-87836db\03_Developement
```

---

## 📦 Bước 3: Cài Đặt Dependencies

### **3.1. Cài Đặt Backend Dependencies**

Trong Terminal, chạy:
```powershell
cd server
npm install
```

⏱️ Chờ khoảng 1-2 phút để cài đặt xong.

### **3.2. Cài Đặt Frontend Dependencies**

Mở **Terminal mới** (click dấu `+` trong Terminal panel):
```powershell
cd fe
npm install
```

⏱️ Chờ khoảng 2-3 phút để cài đặt xong.

---

## 🗄️ Bước 4: Cài Đặt PostgreSQL Database

Dự án này sử dụng **PostgreSQL**. Bạn có 2 lựa chọn:

### **Cách 1: Cài PostgreSQL Trực Tiếp (Khuyến Nghị)**

1. **Tải PostgreSQL:**
   - Truy cập: https://www.postgresql.org/download/windows/
   - Hoặc: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
   - Tải phiên bản mới nhất (PostgreSQL 15 hoặc 16)

2. **Cài Đặt:**
   - Chạy installer
   - **Quan trọng**: Ghi nhớ password bạn đặt cho user `postgres` (mặc định là `postgres`)
   - Port mặc định: `5432` (giữ nguyên)
   - Hoàn tất cài đặt

3. **Cập Nhật File .env:**
   - Mở file: `03_Developement/server/.env`
   - Sửa `DB_PASSWORD` thành password bạn vừa đặt:
   ```env
   DB_PASSWORD=your-postgres-password-here
   ```

### **Cách 2: Sử Dụng Docker (Nếu Đã Cài Docker Desktop)**

Nếu bạn đã cài Docker Desktop:
```powershell
# Quay về thư mục 03_Developement
cd D:\anbinh93-Project-IT4082-87836db\anbinh93-Project-IT4082-87836db\03_Developement

# Chạy PostgreSQL với Docker
docker-compose up -d postgres
```

---

## 🗃️ Bước 5: Thiết Lập Database

Sau khi đã cài PostgreSQL, trong Terminal (ở thư mục `server`):

```powershell
# Chạy migrations (tạo các bảng trong database)
npm run migrate

# Chạy seeders (tạo dữ liệu mẫu)
npm run seed
```

✅ Nếu thành công, bạn sẽ thấy thông báo tạo database và dữ liệu mẫu.

---

## 🚀 Bước 6: Chạy Development Servers

### **Terminal 1 - Chạy Backend:**

```powershell
cd server
npm run dev
```

✅ Backend sẽ chạy tại: **http://localhost:8000**

Bạn sẽ thấy thông báo: `Server is running on port 8000`

### **Terminal 2 - Chạy Frontend:**

Mở Terminal mới và chạy:
```powershell
cd fe
npm run dev
```

✅ Frontend sẽ chạy tại: **http://localhost:5173**

Bạn sẽ thấy thông báo: `Local: http://localhost:5173`

---

## 🌐 Bước 7: Truy Cập Ứng Dụng

1. Mở trình duyệt (Chrome, Edge, Firefox...)
2. Vào địa chỉ: **http://localhost:5173**
3. Đăng nhập với:
   - **Username**: `admin`
   - **Password**: `admin123`

---

## 🆘 Xử Lý Lỗi

### **Lỗi: "Cannot connect to database"**

**Nguyên nhân**: PostgreSQL chưa chạy hoặc thông tin kết nối sai.

**Giải pháp**:
1. Kiểm tra PostgreSQL đang chạy:
   - Mở **Services** (Win + R → `services.msc`)
   - Tìm "postgresql" → Right-click → Start

2. Kiểm tra file `.env`:
   - Đảm bảo `DB_PASSWORD` đúng với password bạn đặt khi cài PostgreSQL
   - Đảm bảo `DB_PORT=5432`

### **Lỗi: "Port 8000 already in use"**

```powershell
# Tìm process đang dùng port 8000
netstat -ano | findstr :8000

# Kill process (thay <PID> bằng số process ID)
taskkill /PID <PID> /F
```

### **Lỗi: "Port 5173 already in use"**

```powershell
# Tìm và kill process
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### **Lỗi: "Module not found"**

```powershell
# Xóa và cài lại dependencies
cd server
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

# Làm tương tự cho frontend
cd ../fe
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

---

## 📝 Tóm Tắt Các Lệnh

```powershell
# 1. Di chuyển vào thư mục dự án
cd D:\anbinh93-Project-IT4082-87836db\anbinh93-Project-IT4082-87836db\03_Developement

# 2. Cài đặt backend dependencies
cd server
npm install

# 3. Cài đặt frontend dependencies (Terminal mới)
cd fe
npm install

# 4. Thiết lập database (sau khi cài PostgreSQL)
cd server
npm run migrate
npm run seed

# 5. Chạy backend (Terminal 1)
cd server
npm run dev

# 6. Chạy frontend (Terminal 2)
cd fe
npm run dev
```

---

## ✅ Checklist

- [ ] Đã di chuyển vào thư mục `03_Developement`
- [ ] Đã cài `npm install` trong thư mục `server`
- [ ] Đã cài `npm install` trong thư mục `fe`
- [ ] Đã cài đặt PostgreSQL
- [ ] Đã cập nhật password trong file `server/.env`
- [ ] Đã chạy `npm run migrate`
- [ ] Đã chạy `npm run seed`
- [ ] Backend đang chạy trên port 8000
- [ ] Frontend đang chạy trên port 5173
- [ ] Đã mở http://localhost:5173 trong trình duyệt
- [ ] Đã đăng nhập thành công

---

## 🎯 Lưu Ý Quan Trọng

1. **Phải mở 2 Terminal riêng**: 1 cho backend, 1 cho frontend
2. **PostgreSQL phải đang chạy** trước khi chạy migrations
3. **File .env** phải có password đúng với PostgreSQL
4. **Không đóng Terminal** khi đang chạy development servers

---

**🎉 Chúc bạn chạy thành công!**

Nếu gặp vấn đề, hãy kiểm tra:
- PostgreSQL đã cài và đang chạy chưa
- File `.env` có đúng password không
- Ports 8000 và 5173 có bị chiếm không

