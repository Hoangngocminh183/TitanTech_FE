import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-200 py-6">
      <div className="container mx-auto grid grid-cols-3 gap-4">
        {/* Cột 1 */}
        <div>
          <p className="font-bold mb-3">VỀ GEARVN</p>
          <p>Giới thiệu</p>
          <p>Tuyển dụng</p>
          <p>Black Friday 2024</p>
        </div>

        {/* Cột 2 */}
        <div>
          <p className="font-bold mb-3">CHÍNH SÁCH</p>
          <p>Chính sách bảo hành</p>
          <p>Chính sách giao hàng</p>
          <p>Chính sách bảo mật</p>
        </div>

        {/* Cột 3 */}
        <div>
          <p className="font-bold mb-3">THÔNG TIN</p>
          <p>Hệ thống cửa hàng</p>
          <p>Hướng dẫn mua hàng</p>
          <p>Hướng dẫn thanh toán</p>
          <p>Hướng dẫn trả góp</p>
          <p>Tra cứu địa chỉ bảo hành</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer
