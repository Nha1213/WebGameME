const { getAllTeams, CreateTeam, DeleteTeam, updateTeam } = require("../controller/team.controller");
const { uploadFile, newId } = require("../util/helper");

const teamRoute = (app) => {
  app.get("/api/users/team", getAllTeams);
  app.post("/api/users/team", uploadFile.single("image_upload"), CreateTeam);
  app.delete("/api/users/team", DeleteTeam);
  app.post("/api/users/new_id", newId);
  app.put(
    "/api/users/team",
    uploadFile.single("image_upload"),
    updateTeam
  );
};

module.exports = teamRoute;
