'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { use } from 'react';
import { verifyAdminToken } from '@/lib/adminAuth';

interface Guest {
  id: string;
  name: string;
  guestType: 'groom' | 'bride';
  createdAt: string;
}

export default function AdminPage({ params }: { params: Promise<{ token: string }> }) {
  const resolvedParams = use(params);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [jwtToken, setJwtToken] = useState('');
  const [guests, setGuests] = useState<Guest[]>([]);
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestType, setNewGuestType] = useState<'groom' | 'bride'>('groom');
  const [error, setError] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copiedId, setCopiedId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'groom' | 'bride'>('all');
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const pageSize = 20;

  const fetchGuests = useCallback(async (authToken: string) => {
    try {
      const response = await fetch('/api/admin/guests', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await response.json();
      if (data.success) {
        // Sort guests by createdAt descending (newest first)
        const sortedGuests = data.guests.sort((a: Guest, b: Guest) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setGuests(sortedGuests);
      }
    } catch (error) {
      console.error('Error fetching guests:', error);
    }
  }, []);

  useEffect(() => {
    // Verify URL token
    const checkTokenAndFetchGuests = async () => {
      const isValid = verifyAdminToken(resolvedParams.token);
      setIsValidToken(isValid);

      if (!isValid) {
        return;
      }

      // Check for saved JWT token
      const savedToken = localStorage.getItem('adminToken');
      if (savedToken) {
        setJwtToken(savedToken);
        setIsAuthenticated(true);
        await fetchGuests(savedToken);
      }
    };

    checkTokenAndFetchGuests();
  }, [resolvedParams.token, fetchGuests]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin, phoneNumber }),
      });

      const data = await response.json();

      if (data.success) {
        setJwtToken(data.token);
        setIsAuthenticated(true);
        localStorage.setItem('adminToken', data.token);
        fetchGuests(data.token);
      } else {
        setError(data.message);
      }
    } catch {
      setError('Lỗi kết nối. Vui lòng thử lại.');
    }
  };

  const handleCreateGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setGeneratedLink('');

    if (!newGuestName.trim()) {
      setError('Vui lòng nhập tên khách mời');
      return;
    }

    try {
      const response = await fetch('/api/admin/guests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ name: newGuestName, guestType: newGuestType }),
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedLink(data.link);
        setNewGuestName('');
        await fetchGuests(jwtToken);
        setCurrentPage(1); // Reset to first page
        // Clear generated link after 5 seconds
        setTimeout(() => setGeneratedLink(''), 5000);
      } else {
        setError(data.message);
      }
    } catch {
      setError('Lỗi tạo khách mời. Vui lòng thử lại.');
    }
  };

  const handleDeleteGuest = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/guests?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      const data = await response.json();

      if (data.success) {
        await fetchGuests(jwtToken);
        setDeleteConfirmId(null);
        // Adjust current page if needed after deletion
        const newFiltered = activeTab === 'all' 
          ? guests.filter(g => g.id !== id)
          : guests.filter(g => g.id !== id && g.guestType === activeTab);
        const newTotalPages = Math.ceil(newFiltered.length / pageSize);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
      }
    } catch (error) {
      console.error('Error deleting guest:', error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setJwtToken('');
    localStorage.removeItem('adminToken');
    setGuests([]);
  };

  const copyToClipboard = (text: string, id: string = 'generated') => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(''), 2000);
      }).catch(() => {
        fallbackCopy(text, id);
      });
    } else {
      fallbackCopy(text, id);
    }
  };

  const fallbackCopy = (text: string, id: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopiedId(id);
      setTimeout(() => setCopiedId(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
    document.body.removeChild(textArea);
  };

  // Filter guests based on active tab
  const filteredGuests = activeTab === 'all' 
    ? guests 
    : guests.filter(g => g.guestType === activeTab);

  // Pagination logic
  const totalPages = Math.ceil(filteredGuests.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedGuests = filteredGuests.slice(startIndex, endIndex);

  // Reset to page 1 when changing tabs
  const handleTabChange = (tab: 'all' | 'groom' | 'bride') => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Invalid token page
  if (isValidToken === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFFBF2] to-[#F9F1C0] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md text-center">
          <span className="material-symbols-outlined text-6xl text-red-500 mb-4">error</span>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Truy cập không hợp lệ</h1>
          <p className="text-gray-600">Link admin không đúng. Vui lòng kiểm tra lại.</p>
        </div>
      </div>
    );
  }

  // Loading state
  if (isValidToken === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFFBF2] to-[#F9F1C0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#8B1D2F] mx-auto mb-4"></div>
          <p className="text-gray-600">Đang xác thực...</p>
        </div>
      </div>
    );
  }

  // Login page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFFBF2] to-[#F9F1C0] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#8B1D2F] mb-2">Admin Panel</h1>
            <p className="text-gray-600">Quản lý thiệp cưới</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mã PIN</label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1D2F] focus:border-transparent"
                placeholder="Nhập mã PIN"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1D2F] focus:border-transparent"
                placeholder="Nhập số điện thoại"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#8B1D2F] text-white py-3 rounded-lg font-semibold hover:bg-[#7D0A0A] transition-colors"
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBF2] to-[#F9F1C0] p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-2xl p-8 mb-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[#8B1D2F]">Quản lý khách mời</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Đăng xuất
            </button>
          </div>

          {/* Create guest form */}
          <form onSubmit={handleCreateGuest} className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tạo link khách mới</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                value={newGuestName}
                onChange={(e) => setNewGuestName(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1D2F] focus:border-transparent"
                placeholder="Tên khách mời"
                required
              />
              <select
                value={newGuestType}
                onChange={(e) => setNewGuestType(e.target.value as 'groom' | 'bride')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1D2F] focus:border-transparent"
              >
                <option value="groom">Nhà trai</option>
                <option value="bride">Nhà gái</option>
              </select>
              <button
                type="submit"
                className="bg-[#8B1D2F] text-white py-2 rounded-lg font-semibold hover:bg-[#7D0A0A] transition-colors"
              >
                Tạo link
              </button>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm mb-4">
                {error}
              </div>
            )}

            {generatedLink && (
              <div className="bg-green-50 p-4 rounded-lg relative">
                <button
                  onClick={() => setGeneratedLink('')}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                  title="Đóng"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
                <p className="text-sm text-gray-700 mb-2">Link đã được tạo:</p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={generatedLink}
                    readOnly
                    className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => copyToClipboard(generatedLink, 'generated')}
                    className="px-4 py-2 bg-[#D4AF37] text-white rounded-lg hover:bg-[#B38728] transition-colors flex items-center gap-2"
                  >
                    {copiedId === 'generated' ? (
                      <>
                        <span>✓</span>
                        <span>Copied!</span>
                      </>
                    ) : (
                      'Copy'
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-gray-200">
            <button
              onClick={() => handleTabChange('all')}
              className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                activeTab === 'all'
                  ? 'border-[#8B1D2F] text-[#8B1D2F]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Tất cả ({guests.length})
            </button>
            <button
              onClick={() => handleTabChange('groom')}
              className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                activeTab === 'groom'
                  ? 'border-[#8B1D2F] text-[#8B1D2F]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Nhà trai ({guests.filter(g => g.guestType === 'groom').length})
            </button>
            <button
              onClick={() => handleTabChange('bride')}
              className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                activeTab === 'bride'
                  ? 'border-[#8B1D2F] text-[#8B1D2F]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Nhà gái ({guests.filter(g => g.guestType === 'bride').length})
            </button>
          </div>

          {/* Guests table */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {activeTab === 'all' && `Danh sách khách mời (${filteredGuests.length})`}
                {activeTab === 'groom' && `Khách nhà trai (${filteredGuests.length})`}
                {activeTab === 'bride' && `Khách nhà gái (${filteredGuests.length})`}
              </h2>
              {totalPages > 1 && (
                <div className="text-sm text-gray-600">
                  Trang {currentPage} / {totalPages}
                </div>
              )}
            </div>

            {filteredGuests.length === 0 ? (
              <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
                {activeTab === 'all' && 'Chưa có khách mời nào'}
                {activeTab === 'groom' && 'Chưa có khách nhà trai'}
                {activeTab === 'bride' && 'Chưa có khách nhà gái'}
              </div>
            ) : (
              <>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-16">
                          STT
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Tên khách mời
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-32">
                          Loại
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Link mời
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-32">
                          Thao tác
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedGuests.map((guest, index) => {
                        const globalIndex = startIndex + index + 1;
                        const invitationLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/invitation/${guest.id}`;
                        
                        return (
                          <tr key={guest.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {globalIndex}
                            </td>
                            <td className="px-4 py-3">
                              <div className="text-sm font-medium text-gray-900">{guest.name}</div>
                              <div className="text-xs text-gray-500">{guest.id}</div>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                guest.guestType === 'groom' 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : 'bg-pink-100 text-pink-800'
                              }`}>
                                {guest.guestType === 'groom' ? 'Nhà trai' : 'Nhà gái'}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={invitationLink}
                                  readOnly
                                  className="flex-1 px-2 py-1 bg-gray-50 border border-gray-200 rounded text-xs font-mono"
                                />
                                <button
                                  onClick={() => copyToClipboard(invitationLink, guest.id)}
                                  className="px-3 py-1 bg-[#8B1D2F] text-white rounded text-xs hover:bg-[#7D0A0A] transition-colors flex items-center gap-1 flex-shrink-0"
                                  title="Copy link"
                                >
                                  {copiedId === guest.id ? (
                                    <>
                                      <span className="material-symbols-outlined text-sm">check</span>
                                      <span>Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <span className="material-symbols-outlined text-sm">content_copy</span>
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <button
                                onClick={() => setDeleteConfirmId(guest.id)}
                                className="inline-flex items-center px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors text-sm"
                                title="Xóa khách mời"
                              >
                                <span className="material-symbols-outlined text-lg">delete</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-gray-600">
                      Hiển thị {startIndex + 1} - {Math.min(endIndex, filteredGuests.length)} trong {filteredGuests.length} khách mời
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">chevron_left</span>
                      </button>
                      
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                          // Show first, last, current, and adjacent pages
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
                            return (
                              <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                                  currentPage === page
                                    ? 'bg-[#8B1D2F] text-white'
                                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                {page}
                              </button>
                            );
                          } else if (
                            page === currentPage - 2 ||
                            page === currentPage + 2
                          ) {
                            return <span key={page} className="px-2 text-gray-400">...</span>;
                          }
                          return null;
                        })}
                      </div>

                      <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          currentPage === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-red-500 text-3xl">warning</span>
              <h3 className="text-xl font-bold text-gray-800">Xác nhận xóa</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Bạn có chắc muốn xóa khách mời <strong>{guests.find(g => g.id === deleteConfirmId)?.name}</strong> không? 
              Hành động này không thể hoàn tác.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Hủy
              </button>
              <button
                onClick={() => handleDeleteGuest(deleteConfirmId)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
