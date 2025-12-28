-- Script để xóa tất cả các bảng trong database
-- Chạy script này trong pgAdmin 4 Query Tool

-- Xóa tất cả bảng (theo thứ tự để tránh lỗi foreign key)
DROP TABLE IF EXISTS "TamTruTamVang" CASCADE;
DROP TABLE IF EXISTS "LichSuThayDoiHoKhau" CASCADE;
DROP TABLE IF EXISTS "NopPhi" CASCADE;
DROP TABLE IF EXISTS "HouseholdFees" CASCADE;
DROP TABLE IF EXISTS "DotThu_KhoanThu" CASCADE;
DROP TABLE IF EXISTS "DotThu" CASCADE;
DROP TABLE IF EXISTS "KhoanThu" CASCADE;
DROP TABLE IF EXISTS "QuanLyXe" CASCADE;
DROP TABLE IF EXISTS "LoaiXe" CASCADE;
DROP TABLE IF EXISTS "Rooms" CASCADE;
DROP TABLE IF EXISTS "Canho" CASCADE;
DROP TABLE IF EXISTS "ThanhVienHoKhau" CASCADE;
DROP TABLE IF EXISTS "HoKhau" CASCADE;
DROP TABLE IF EXISTS "NhanKhau" CASCADE;
DROP TABLE IF EXISTS "Users" CASCADE;

-- Xóa bảng SequelizeMeta (track migrations) để có thể chạy lại migrations
DROP TABLE IF EXISTS "SequelizeMeta" CASCADE;

-- Thông báo hoàn thành
SELECT 'All tables dropped successfully!' AS message;

