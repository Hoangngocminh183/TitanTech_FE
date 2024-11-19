import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

function Header() {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);
  const [products, setProducts] = useState([]);  // Lưu trữ kết quả tìm kiếm

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
      fetch("/api/filter-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchQuery: value }), // Gửi từ khóa tìm kiếm đến API
      })
        .then((response) => response.json())
        .then((data) => {
          setProducts(data.data);  // Lưu trữ sản phẩm vào state
          console.log(data);  // Kiểm tra dữ liệu
        });
    } else {
      navigate("/search");
      fetch("/api/filter-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // Không gửi searchQuery khi không có từ khóa
      })
        .then((response) => response.json())
        .then((data) => {
          setProducts(data.data);  // Lưu trữ sản phẩm vào state khi không có từ khóa
          console.log(data);  // Kiểm tra dữ liệu
        });
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed z-40 w-full">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <Link to={"/"}>
          <Logo w={90} h={50} />
        </Link>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="search product here"
            className="w-full outline-none"
            value={search}
            onChange={handleSearch}
          />
          <div className="text-lg min-w-[50px] h-8 bg-blue-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}
            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded z-20">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                      onClick={() => setMenuDisplay((prev) => !prev)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative">
              <span>
                <FaShoppingCart />
              </span>
              <div className="bg-blue-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-blue-600 hover:bg-blue-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-blue-600 hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="search-results">
        <h1>Search Results</h1>
        <div>
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id}>
                <p>{product.productName}</p> {/* Hiển thị tên sản phẩm */}
                {/* Có thể hiển thị thêm thông tin sản phẩm ở đây */}
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
