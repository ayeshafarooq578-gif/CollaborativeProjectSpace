import { useEffect, useState } from "react";
import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import { getMembers, addMember, removeMember } from "../services/memberService";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [email, setEmail] = useState("");

  // Replace with selected project later
  const projectId = "YOUR_PROJECT_ID";

  const loadMembers = async () => {
    try {
      const data = await getMembers(projectId);
      setMembers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleInvite = async () => {
    if (!email) return;

    try {
      await addMember(projectId, email);
      setEmail("");
      loadMembers();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add member");
    }
  };

  const handleRemove = async (userId) => {
    try {
      await removeMember(projectId, userId);
      loadMembers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">
          <div className="bg-white rounded-xl shadow p-6">

            <h1 className="text-3xl font-bold mb-6">
              Team Members
            </h1>

            <div className="flex gap-3 mb-8">
              <input
                type="email"
                placeholder="Enter member email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 border rounded-lg px-4 py-3"
              />

              <button
                onClick={handleInvite}
                className="bg-indigo-600 text-white px-6 rounded-lg hover:bg-indigo-700"
              >
                Invite
              </button>
            </div>

            <div className="space-y-4">
              {members.map((member) => (
                <div
                  key={member._id}
                  className="flex items-center justify-between border rounded-lg p-4"
                >
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-gray-500">{member.email}</p>
                  </div>

                  <button
                    onClick={() => handleRemove(member._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Members;