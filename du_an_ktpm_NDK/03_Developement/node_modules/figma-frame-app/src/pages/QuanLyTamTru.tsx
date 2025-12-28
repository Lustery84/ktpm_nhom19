import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Layout from '../components/Layout';
import AddEditTamTruPopup from '../components/AddEditTamTruPopup';

interface TamTruData {
  id: string;
  hoTen: string;
  trangThai: 'Tạm trú' | 'Tạm vắng';
  diaChi: string;
  tuNgay: string;
  denNgay: string;
  noiDungDeNghi: string;
}

const QuanLyTamTru: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Tất cả");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [editingData, setEditingData] = useState<TamTruData | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [dataList, setDataList] = useState<TamTruData[]>([
    {
      id: "1",
      hoTen: "Nguyễn Văn An",
      trangThai: "Tạm trú",
      diaChi: "123 Lê Lợi, Q.1, TP.HCM",
      tuNgay: "2025-05-01",
      denNgay: "2025-08-01",
      noiDungDeNghi: "Đăng ký tạm trú để thực tập tại công ty"
    },
    {
      id: "2",
      hoTen: "Trần Thị Bình",
      trangThai: "Tạm vắng",
      diaChi: "45 Nguyễn Du, Q.3, TP.HCM",
      tuNgay: "2025-06-10",
      denNgay: "2025-07-05",
      noiDungDeNghi: "Xin tạm vắng để về quê chăm người thân"
    },
    {
      id: "3",
      hoTen: "Lê Minh Công",
      trangThai: "Tạm trú",
      diaChi: "98 Phạm Văn Đồng, Q. Gò Vấp",
      tuNgay: "2025-05-15",
      denNgay: "2025-06-30",
      noiDungDeNghi: "Gia hạn tạm trú do chưa hoàn thành khóa học"
    }
  ]);

  const openPopupForAdd = () => {
    setEditingData(null);
    setIsPopupOpen(true);
  };

  const openPopupForEdit = (data: TamTruData) => {
    setEditingData(data);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setEditingData(null);
  };

  const handleSave = (newData: Omit<TamTruData, 'id'>) => {
    if (editingData) {
      // Cập nhật
      setDataList(prev =>
        prev.map(item =>
          item.id === editingData.id ? { ...editingData, ...newData } : item
        )
      );
    } else {
      // Thêm mới
      const newId = Date.now().toString();
      setDataList(prev => [...prev, { id: newId, ...newData }]);
    }
    closePopup();
  };

  const handleEdit = (id: string) => {
    const item = dataList.find(d => d.id === id);
    if (item) openPopupForEdit(item);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
      setDataList(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleFilterSelect = (option: string) => {
    setSelectedFilter(option);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    if (!isDropdownOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setIsDropdownOpen(false);
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isDropdownOpen]);

  // Xử lý tìm kiếm
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  // Logic lọc dữ liệu kết hợp cả filter và search
  const filteredData = dataList.filter(item => {
    // Lọc theo trạng thái
    const matchesFilter = selectedFilter === "Tất cả" || item.trangThai === selectedFilter;
    
    // Lọc theo từ khóa tìm kiếm (tìm trong họ tên, địa chỉ, nội dung đề nghị)
    const matchesSearch = searchKeyword === "" || 
      item.hoTen.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.diaChi.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.noiDungDeNghi.toLowerCase().includes(searchKeyword.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <Layout role="totruong">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white">Quản lý tạm trú/tạm vắng</h1>
            </div>
            <p className="text-indigo-100 text-sm">Quản lý thông tin tạm trú và tạm vắng trong chung cư</p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-end">
              {/* Search */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tìm kiếm
                </label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo tên, địa chỉ hoặc nội dung..."
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={searchKeyword}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
              {/* Filter by Status */}
              <div className="w-full lg:w-48">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trạng thái
                </label>
                <div 
                  ref={dropdownRef}
                  className="relative"
                >
                  <div
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white cursor-pointer flex items-center justify-between"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown();
                    }}
                  >
                    <span className="text-sm text-gray-700">{selectedFilter}</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Add Button */}
              <div className="w-full lg:w-auto">
                <button
                  onClick={openPopupForAdd}
                  className="w-full lg:w-auto flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Thêm TT/TV
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Danh sách tạm trú/tạm vắng ({filteredData.length})
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Họ tên</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Trạng thái</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Địa chỉ</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Thời gian</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Nội dung đề nghị</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500 text-sm">
                        {searchKeyword ? 
                          `Không tìm thấy kết quả nào cho "${searchKeyword}"` : 
                          "Không có dữ liệu"
                        }
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.hoTen}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            item.trangThai === 'Tạm trú' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.trangThai}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.diaChi}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.tuNgay} → {item.denNgay}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={item.noiDungDeNghi}>
                          {item.noiDungDeNghi}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex gap-3">
                            <button 
                              onClick={() => handleEdit(item.id)} 
                              className="text-indigo-600 hover:text-indigo-800 p-1 rounded hover:bg-indigo-50 transition-colors"
                              title="Sửa"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button 
                              onClick={() => handleDelete(item.id)} 
                              className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors"
                              title="Xóa"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>

      {/* Portal Dropdown - render outside of Layout */}
      {isDropdownOpen && createPortal(
        <div 
          className="bg-white border border-gray-300 rounded-md shadow-lg"
          style={{
            position: 'fixed',
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            width: dropdownPosition.width,
            zIndex: 9999,
            maxHeight: '200px',
            overflowY: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {["Tất cả", "Tạm trú", "Tạm vắng"].map((option) => (
            <div
              key={option}
              className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
              style={{ fontWeight: '400' }}
              onClick={() => handleFilterSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>,
        document.body
      )}

      <AddEditTamTruPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        editData={editingData}
        onSave={handleSave}
      />
    </>
  );
};

export default QuanLyTamTru;