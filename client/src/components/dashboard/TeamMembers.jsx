const members = ["A", "S", "M", "Z"];

const TeamMembers = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="font-bold text-xl mb-5">
        Team Members
      </h2>

      <div className="flex gap-3">
        {members.map((member) => (
          <div
            key={member}
            className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold"
          >
            {member}
          </div>
        ))}
      </div>

    </div>
  );
};

export default TeamMembers;