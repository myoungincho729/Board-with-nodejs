import "../../main.css";
import { useNavigate } from "react-router-dom";

function ListCard({ props }) {
  const { _id, title, content, writer, createdAt } = props;
  const navigate = useNavigate();

  function titleClick() {
    console.log(props);
    navigate("/posts", { state: { details: props } });
  }

  return (
    <li
      className="list-none bg-green-100 border-green-600 border-b p-4 m-4 rounded"
      key={_id}
    >
      <div
        className="text-3xl text-blue-700 hover:underline"
        onClick={() => titleClick(props)}
      >
        {title}
      </div>
      {content} {writer.userName} {createdAt}
    </li>
  );
}

export default ListCard;
