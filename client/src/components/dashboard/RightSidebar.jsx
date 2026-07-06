import MilestoneCard from "./MilestoneCard";
import TeamMembers from "./TeamMembers";

const RightSidebar = () => {
  return (
    <aside className="w-80">

      <div className="mb-8">

        <h2 className="text-xl font-bold mb-4">
          Upcoming Milestones
        </h2>

        <MilestoneCard />
        <MilestoneCard />

      </div>

      <TeamMembers />

    </aside>
  );
};

export default RightSidebar;