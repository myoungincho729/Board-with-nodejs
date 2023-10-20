import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import axios from "axios";

export default function List({ id, task, setUpdateUI, updateMode }) {
  const removeTask = () => {
    axios.delete(`http://localhost:5001/api/delete/${id}`).then((res) => {
      console.log(res.data);
      setUpdateUI((prev) => !prev);
    });
  };

  return (
    <li key={id}>
      {task}
      <AiFillEdit onClick={() => updateMode(id, task)} />
      <AiFillDelete onClick={removeTask} />
    </li>
  );
}
