import Link from "antd/es/typography/Link";
import React from "react";
import { useNavigate } from "react-router-dom";
import { RemoveAccessToken } from "../../util/Token.Store";
const HomePage = () => {
  const handleLogOut = () => {
    RemoveAccessToken();
    window.location.href = "/";
  };
  return (
    <div>
      HomePage
      <Link onClick={handleLogOut}>logOut</Link>
    </div>
  );
};

export default HomePage;
