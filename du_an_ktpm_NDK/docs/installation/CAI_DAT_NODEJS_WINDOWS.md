# 📥 Hướng Dẫn Cài Đặt Node.js Trên Windows

## 🚨 Vấn Đề Hiện Tại

Bạn đang gặp lỗi: `'node' is not recognized as an internal or external command`

Điều này có nghĩa là **Node.js chưa được cài đặt** hoặc chưa được thêm vào PATH của Windows.

---

## ✅ Giải Pháp: Cài Đặt Node.js

### **Bước 1: Tải Node.js**

1. Truy cập trang chủ Node.js: **https://nodejs.org/**
2. Tải phiên bản **LTS (Long Term Support)** - khuyến nghị
   - Phiên bản hiện tại: Node.js 20.x LTS hoặc 18.x LTS
   - File tải về sẽ có dạng: `node-v20.x.x-x64.msi` (cho Windows 64-bit)

### **Bước 2: Cài Đặt Node.js**

1. **Chạy file installer** vừa tải về (file `.msi`)
2. **Click Next** qua các bước
3. **Quan trọng**: Đảm bảo tick vào ô **"Add to PATH"** (thường được tick sẵn)
4. Click **Install** và chờ quá trình cài đặt hoàn tất
5. Click **Finish**

### **Bước 3: Khởi Động Lại Terminal**

**Quan trọng**: Sau khi cài đặt, bạn **PHẢI**:
- Đóng tất cả Command Prompt/PowerShell/VS Code Terminal hiện tại
- Mở lại VS Code hoặc mở Terminal mới

### **Bước 4: Kiểm Tra Cài Đặt**

Mở **Terminal mới** trong VS Code (`Ctrl + ``) và chạy:

```powershell
node --version
```

Kết quả mong đợi: `v20.x.x` hoặc `v18.x.x` (số phiên bản)

```powershell
npm --version
```

Kết quả mong đợi: `10.x.x` hoặc `9.x.x` (số phiên bản npm)

---

## 🔧 Nếu Vẫn Không Hoạt Động

### **Cách 1: Kiểm Tra PATH**

1. Mở **System Properties**:
   - Nhấn `Win + R`
   - Gõ: `sysdm.cpl` và Enter
   - Hoặc: Settings → System → About → Advanced system settings

2. Click **Environment Variables**

3. Trong **System variables**, tìm biến **Path**

4. Kiểm tra xem có các đường dẫn sau không:
   - `C:\Program Files\nodejs\`
   - `C:\Program Files (x86)\nodejs\`

5. Nếu không có, click **Edit** → **New** → Thêm đường dẫn:
   ```
   C:\Program Files\nodejs
   ```

6. Click **OK** ở tất cả các cửa sổ

7. **Đóng và mở lại** tất cả Terminal/Command Prompt

### **Cách 2: Cài Đặt Lại Node.js**

1. Gỡ cài đặt Node.js cũ (nếu có):
   - Settings → Apps → Tìm "Node.js" → Uninstall

2. Tải và cài đặt lại từ https://nodejs.org/
3. Đảm bảo tick **"Add to PATH"** trong quá trình cài đặt

### **Cách 3: Sử Dụng Node Version Manager (NVM) - Tùy chọn**

Nếu muốn quản lý nhiều phiên bản Node.js:

1. Tải NVM for Windows: https://github.com/coreybutler/nvm-windows/releases
2. Cài đặt `nvm-setup.exe`
3. Sau khi cài đặt, mở Terminal mới và chạy:
   ```powershell
   nvm install 20.11.0
   nvm use 20.11.0
   node --version
   ```

---

## ✅ Sau Khi Cài Đặt Thành Công

Khi `node --version` và `npm --version` đã hoạt động, bạn có thể tiếp tục với các bước chạy dự án:

### **1. Di Chuyển Vào Thư Mục Dự Án**

```powershell
cd D:\anbinh93-Project-IT4082-87836db\anbinh93-Project-IT4082-87836db\03_Developement
```

### **2. Cài Đặt Dependencies**

**Terminal 1 - Backend:**
```powershell
cd server
npm install
```

**Terminal 2 - Frontend:**
```powershell
cd fe
npm install
```

### **3. Tạo File .env**

Tạo file `server/.env` với nội dung:
```env
NODE_ENV=development
DB_DIALECT=sqlite
DB_STORAGE=./database.sqlite
PORT=8000
JWT_SECRET=your-secret-key-change-this-in-production
```

### **4. Thiết Lập Database**

```powershell
cd server
npm run migrate
npm run seed
```

### **5. Chạy Development Servers**

**Terminal 1:**
```powershell
cd server
npm run dev
```

**Terminal 2:**
```powershell
cd fe
npm run dev
```

---

## 🎯 Tóm Tắt

1. ✅ Tải Node.js LTS từ https://nodejs.org/
2. ✅ Cài đặt và đảm bảo tick "Add to PATH"
3. ✅ Đóng và mở lại Terminal/VS Code
4. ✅ Kiểm tra: `node --version` và `npm --version`
5. ✅ Tiếp tục với các bước cài đặt dự án

---

## 📞 Nếu Vẫn Gặp Vấn Đề

1. **Kiểm tra phiên bản Windows**: Node.js yêu cầu Windows 10/11
2. **Chạy với quyền Administrator**: Right-click VS Code → Run as Administrator
3. **Kiểm tra Antivirus**: Một số phần mềm diệt virus có thể chặn Node.js
4. **Xem log cài đặt**: Kiểm tra xem có lỗi gì trong quá trình cài đặt không

---

**🎉 Sau khi cài đặt thành công, bạn sẽ có thể chạy dự án!**

