import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { verifyEmail } from "../../services/ApiServices";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (event) => {
    event.preventDefault(); 

    if (!email) {
      toast.error("Không được để trống!");
    } else {
      let res = await verifyEmail(email);
      if (res && res.data && res.data.data === true) {
        toast.success("Kiểm tra email của bạn!");
        navigate(`/verifyOTP/${email}`);
      } else {
        toast.error("Email không tồn tại");
      }
    }
  };

  return (
    <div className="py-3 py-md-5 my-5">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
            <div className="bg-white p-4 p-md-5 rounded shadow-lg">
              <div className="row">
                <div className="col-12">
                  <div className="mb-5">
                    <h2 className="h3">Quên mật khẩu</h2>
                    <h3 className="fs-6 fw-normal text-secondary m-0">
                      Cung cấp địa chỉ email được liên kết với tài khoản của bạn để khôi phục mật khẩu.
                    </h3>
                  </div>
                </div>
              </div>
              <form onSubmit={handleVerify}>
                <div className="row gy-3 gy-md-4 overflow-hidden">
                  <div className="col-12">
                    <label className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div className="col-12">
                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-lg btn-primary">
                        Xác thực Email
                      </button>
                    </div>
                    <div className="text-center">
                      <NavLink to="/signin" className="my-4">
                        Quay lại
                      </NavLink>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ForgotPassword;
