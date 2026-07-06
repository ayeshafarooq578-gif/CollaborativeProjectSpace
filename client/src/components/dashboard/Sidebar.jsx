import { Link } from "react-router-dom";
import {
  FaProjectDiagram,
  FaTasks,
  FaUsers,
  FaSignOutAlt,
  FaFlag,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow h-[calc(100vh-64px)] p-6">
      <nav className="space-y-5">

        <Link
  to="/dashboard"
  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition"
>
  <FaProjectDiagram />
  Projects
</Link>

<Link
  to="/tasks"
  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition"
>
  <FaTasks />
  Tasks
</Link>

        <Link
          to="/members"
          className="flex items-center gap-3 text-lg hover:text-indigo-600"
        >
          <FaUsers />
          Members
        </Link>

        <Link
          to="/milestones"
          className="flex items-center gap-3 text-lg hover:text-indigo-600"
        >
          <FaFlag />
          Milestones
        </Link>

        <button className="flex items-center gap-3 text-lg text-red-500">
          <FaSignOutAlt />
          Logout
        </button>

      </nav>
    </aside>
  );
};

export default Sidebar;