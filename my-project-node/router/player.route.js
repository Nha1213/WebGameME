const {
  getAllPlayers,
  CreatePlayer,
  DeletePlayer,
  updatePlayer,
} = require("../controller/player.controller");
const { uploadFile, newIdPlayer } = require("../util/helper");

const playerRoute = (app) => {
  app.get("/api/users/player", getAllPlayers);
  app.post(
    "/api/users/player",
    uploadFile.single("image_upload"),
    CreatePlayer
  );
  app.delete("/api/users/player", DeletePlayer);
  app.post("/api/users/new_id_player", newIdPlayer);
  app.put("/api/users/player", uploadFile.single("image_upload"), updatePlayer);
};

module.exports = playerRoute;
