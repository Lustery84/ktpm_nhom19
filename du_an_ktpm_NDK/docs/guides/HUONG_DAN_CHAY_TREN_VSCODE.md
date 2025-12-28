# 🚀 Hướng Dẫn Chạy Dự Án Trên Visual Studio Code (Windows)

## 📋 Yêu Cầu Trước Khi Bắt Đầu

### **1. Cài Đặt Node.js**
- Tải và cài đặt Node.js từ: https://nodejs.org/
- **Phiên bản yêu cầu**: Node.js >= 18.0.0
- Kiểm tra sau khi cài:
  ```powershell
  node --version
  npm --version
  ```

### **2. Mở Project Trong VS Code**
1. Mở Visual Studio Code
2. File → Open Folder
3. Chọn thư mục: `anbinh93-Project-IT4082-87836db\anbinh93-Project-IT4082-87836db\03_Developement`

---

## 🎯 Cách 1: Chạy Thủ Công (Khuyến Nghị cho Windows)

### **Bước 1: Cài Đặt Dependencies**

#### **Terminal 1 - Cài Backend**
1. Mở Terminal trong VS Code: `Ctrl + `` (backtick) hoặc `Terminal → New Terminal`
2. Chạy lệnh:
   ```powershell
   cd server
   npm install
   ```

#### **Terminal 2 - Cài Frontend**
1. Mở Terminal mới: Click vào dấu `+` trong Terminal panel hoặc `Terminal → New Terminal`
2. Chạy lệnh:
   ```powershell
   cd fe
   npm install
   ```

### **Bước 2: Cấu Hình Database**

#### **Tạo File .env cho Backend**
1. Trong VS Code, tạo file mới: `server/.env`
2. Copy nội dung sau vào:
   ```env
   NODE_ENV=development
   DB_DIALECT=sqlite
   DB_STORAGE=./database.sqlite
   PORT=8000
   JWT_SECRET=your-secret-key-change-this-in-production
   ```

### **Bước 3: Thiết Lập Database**

Trong Terminal (đang ở thư mục `server`):
```powershell
# Chạy migrations (tạo bảng trong database)
npm run migrate

# Chạy seeders (tạo dữ liệu mẫu)
npm run seed
```

### **Bước 4: Chạy Development Servers**

#### **Terminal 1 - Chạy Backend**
```powershell
cd server
npm run dev
```
✅ Backend sẽ chạy tại: **http://localhost:8000**

#### **Terminal 2 - Chạy Frontend**
```powershell
cd fe
npm run dev
```
✅ Frontend sẽ chạy tại: **http://localhost:5173**

### **Bước 5: Truy Cập Ứng Dụng**

1. Mở trình duyệt
2. Vào địa chỉ: **http://localhost:5173**
3. Đăng nhập với:
   - **Username**: `admin`
   - **Password**: `admin123`

---

## 🎯 Cách 2: Sử Dụng NPM Scripts (Nhanh Hơn)

### **Bước 1: Cài Đặt Tất Cả Dependencies**

Trong Terminal (ở thư mục `03_Developement`):
```powershell
# Cài đặt dependencies cho cả backend và frontend
npm run install:all
```

### **Bước 2: Thiết Lập Database**

```powershell
# Chạy migrations và seeders
npm run migrate
npm run seed
```

### **Bước 3: Chạy Cả Backend và Frontend**

**Lưu ý**: Trên Windows, script `setup.sh` không chạy được trực tiếp. Bạn cần chạy riêng:

#### **Terminal 1 - Backend:**
```powershell
cd server
npm run dev
```

#### **Terminal 2 - Frontend:**
```powershell
cd fe
npm run dev
```

---

## 🐳 Cách 3: Sử Dụng Docker (Nếu Đã Cài Docker Desktop)

### **Bước 1: Cài Docker Desktop**
- Tải từ: https://www.docker.com/products/docker-desktop/
- Cài đặt và khởi động Docker Desktop

### **Bước 2: Chạy với Docker**

Trong Terminal (ở thư mục `03_Developement`):
```powershell
# Khởi động tất cả services
docker-compose up -d

# Xem logs
docker-compose logs -f

# Dừng services
docker-compose down
```

---

## 🛠️ Cấu Hình VS Code Để Làm Việc Dễ Hơn

### **1. Tạo File `.vscode/launch.json`** (Tùy chọn)

Tạo file `.vscode/launch.json` trong thư mục `03_Developement`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Backend: Node.js",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/server/server.js",
      "cwd": "${workspaceFolder}/server",
      "env": {
        "NODE_ENV": "development"
      },
      "console": "integratedTerminal",
      "restart": true,
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"]
    },
    {
      "name": "Frontend: Vite",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}/fe",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "console": "integratedTerminal"
    }
  ],
  "compounds": [
    {
      "name": "Full Stack",
      "configurations": ["Backend: Node.js", "Frontend: Vite"]
    }
  ]
}
```

### **2. Tạo File `.vscode/tasks.json`** (Tùy chọn)

Tạo file `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Backend: Install",
      "type": "shell",
      "command": "npm install",
      "options": {
        "cwd": "${workspaceFolder}/server"
      },
      "problemMatcher": []
    },
    {
      "label": "Frontend: Install",
      "type": "shell",
      "command": "npm install",
      "options": {
        "cwd": "${workspaceFolder}/fe"
      },
      "problemMatcher": []
    },
    {
      "label": "Backend: Dev",
      "type": "shell",
      "command": "npm run dev",
      "options": {
        "cwd": "${workspaceFolder}/server"
      },
      "problemMatcher": [],
      "isBackground": true
    },
    {
      "label": "Frontend: Dev",
      "type": "shell",
      "command": "npm run dev",
      "options": {
        "cwd": "${workspaceFolder}/fe"
      },
      "problemMatcher": [],
      "isBackground": true
    },
    {
      "label": "Database: Migrate",
      "type": "shell",
      "command": "npm run migrate",
      "options": {
        "cwd": "${workspaceFolder}/server"
      },
      "problemMatcher": []
    },
    {
      "label": "Database: Seed",
      "type": "shell",
      "command": "npm run seed",
      "options": {
        "cwd": "${workspaceFolder}/server"
      },
      "problemMatcher": []
    }
  ]
}
```

Sau đó bạn có thể chạy tasks bằng: `Ctrl + Shift + P` → `Tasks: Run Task`

---

## 🆘 Xử Lý Lỗi Thường Gặp

### **Lỗi: Port đã được sử dụng**

#### **Windows PowerShell:**
```powershell
# Tìm process đang dùng port 8000
netstat -ano | findstr :8000

# Kill process (thay PID bằng số process ID)
taskkill /PID <PID> /F

# Hoặc kill tất cả Node processes
taskkill /F /IM node.exe
```

#### **Windows Command Prompt:**
```cmd
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### **Lỗi: Database không tồn tại**

```powershell
cd server
# Xóa database cũ
Remove-Item database.sqlite -ErrorAction SilentlyContinue

# Tạo lại database
npm run migrate
npm run seed
```

### **Lỗi: Module không tìm thấy**

```powershell
# Xóa node_modules và cài lại
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

### **Lỗi: Permission denied**

Trên Windows, thường không gặp lỗi này. Nếu có, chạy VS Code với quyền Administrator.

---

## 📊 Kiểm Tra Trạng Thái

### **Kiểm Tra Backend:**
Mở trình duyệt: http://localhost:8000/api/auth/status

### **Kiểm Tra Frontend:**
Mở trình duyệt: http://localhost:5173

### **Kiểm Tra Database:**
```powershell
cd server
# Kiểm tra file database có tồn tại không
Test-Path database.sqlite
```

---

## 🔑 Tài Khoản Mặc Định

| Vai Trò | Username | Password |
|---------|----------|----------|
| Admin | admin | admin123 |
| Manager | manager | manager123 |
| Accountant | accountant | accountant123 |

---

## 💡 Tips Hữu Ích

### **1. Sử Dụng Multiple Terminals trong VS Code**
- Click vào dấu `+` để tạo terminal mới
- Hoặc `Ctrl + Shift + `` để tạo terminal mới
- Click vào dropdown để chọn terminal type (PowerShell, Command Prompt, Git Bash)

### **2. Split Terminal**
- Click vào icon split terminal để chia terminal thành 2 panel
- Tiện để chạy backend và frontend cùng lúc

### **3. Sử Dụng VS Code Extensions**
- **ES7+ React/Redux/React-Native snippets**: Hỗ trợ React
- **Prettier**: Format code tự động
- **ESLint**: Kiểm tra lỗi code
- **Thunder Client**: Test API trong VS Code

### **4. Debug trong VS Code**
- Đặt breakpoint trong code
- Chạy với F5 (nếu đã cấu hình launch.json)
- Xem variables và call stack

---

## 📝 Tóm Tắt Các Lệnh Quan Trọng

```powershell
# Cài đặt dependencies
cd server && npm install
cd ../fe && npm install

# Thiết lập database
cd server
npm run migrate
npm run seed

# Chạy development
# Terminal 1:
cd server && npm run dev

# Terminal 2:
cd fe && npm run dev

# Build production
cd fe && npm run build
cd ../server && npm start
```

---

## ✅ Checklist Trước Khi Chạy

- [ ] Đã cài Node.js >= 18.0.0
- [ ] Đã mở project trong VS Code
- [ ] Đã cài dependencies cho backend (`cd server && npm install`)
- [ ] Đã cài dependencies cho frontend (`cd fe && npm install`)
- [ ] Đã tạo file `server/.env`
- [ ] Đã chạy migrations (`npm run migrate`)
- [ ] Đã chạy seeders (`npm run seed`)
- [ ] Đã mở 2 terminals riêng
- [ ] Backend đang chạy trên port 8000
- [ ] Frontend đang chạy trên port 5173

---

**🎉 Chúc bạn chạy thành công!**

Nếu gặp vấn đề, hãy kiểm tra:
1. Node.js version: `node --version`
2. Ports 8000 và 5173 có đang bị chiếm không
3. File `.env` đã được tạo chưa
4. Database đã được migrate và seed chưa

