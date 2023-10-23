import { useLocation } from "react-router-dom";

export default function PostDetail() {
  const location = useLocation();
  const { _id, title, content, writer, createdAt } = location.state.details;
  return (
    <div className="bg-green-100 border-green-600 border-b w-64 h-64 rounded">
      <div className="text-3xl text-blue-700 ">{title}</div>
      {content} {writer.userName} {createdAt}
      asdfasdfasdf
    </div>
  );
}
