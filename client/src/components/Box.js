import { BsPeopleFill } from "react-icons/bs";
import { RiFolderTransferFill } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";
import "../styles/Box.css";

export default function Box({ type, value, description, color }) {

  var types = {
   "people": <BsPeopleFill className="box-icon" />,
   "folder": <RiFolderTransferFill className="box-icon" />,
   "calendar": <FaRegCalendarAlt className="box-icon" />,
  }

  return (
    <div className="Box" style={{background: color}}>
    {types[type]}
      <span style={{ fontWeight: "bold" }}>{value}</span>
      <span>{description}</span>
    </div>
  );
}
