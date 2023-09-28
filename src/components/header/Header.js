import React, { useState } from "react";
import "./_header.scss";
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";
import { FaMicrophoneAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = ({ handleToggleSidebar }) => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`search/${input}`)
  }
  return (
    <div className="border border-dark header">
      <FaBars
        className="header-menu"
        size={26}
        onClick={() => handleToggleSidebar()}
      />
      <img
        src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
        alt=""
        className="header__logo"
      />
      <h5>YouTube</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>
      <FaMicrophoneAlt size={28} />
      <div className="header__icons">
        <MdNotifications size={28} />
        <MdApps size={28} />
        <img
          src="https://www.pngkey.com/png/detail/151-1518198_avatar-anonimo-mujer-women-user-icon-png.png"
          alt="Avatar Anonimo Mujer - Women User Icon Png@pngkey.com"
        ></img>
      </div>
    </div>
  );
};

export default Header;
