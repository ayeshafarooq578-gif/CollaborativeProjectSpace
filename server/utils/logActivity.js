import Activity from "../models/Activity.js";

const logActivity = async ({ user, project, action, target }) => {
  try {
    console.log("========== LOG ACTIVITY ==========");
    console.log({
      user,
      project,
      action,
      target,
    });

    const activity = await Activity.create({
      user,
      project,
      action,
      target,
    });

    console.log("Activity Saved Successfully");
    console.log(activity);

    return activity;
  } catch (error) {
    console.error("ACTIVITY SAVE ERROR");
    console.error(error);
    throw error;
  }
};

export default logActivity;