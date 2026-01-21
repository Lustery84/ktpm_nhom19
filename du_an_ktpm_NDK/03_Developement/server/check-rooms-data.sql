-- Script kiểm tra dữ liệu phòng/căn hộ trong database
-- Chạy script này trong pgAdmin 4 Query Tool

-- Kiểm tra số lượng phòng trong bảng Rooms
SELECT COUNT(*) as total_rooms FROM "Rooms";

-- Kiểm tra số lượng căn hộ trong bảng Canho
SELECT COUNT(*) as total_canho FROM "Canho";

-- Xem chi tiết các phòng
SELECT 
    id,
    "soPhong",
    "loaiPhong",
    "tang",
    "trangThai",
    "hoKhauId",
    "dienTich"
FROM "Rooms"
ORDER BY "soPhong";

-- Xem chi tiết các căn hộ
SELECT 
    id,
    "soPhong",
    "hoKhauId",
    "dienTich",
    "trangThai"
FROM "Canho"
ORDER BY "soPhong";

-- Kiểm tra phòng có được gán hộ khẩu không
SELECT 
    r.id,
    r."soPhong",
    r."trangThai",
    r."hoKhauId",
    h."soHoKhau",
    h."soNha"
FROM "Rooms" r
LEFT JOIN "HoKhau" h ON r."hoKhauId" = h."soHoKhau"
ORDER BY r."soPhong";






