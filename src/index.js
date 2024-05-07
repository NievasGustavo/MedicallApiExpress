import app from "./app.js";
import { sequelize } from "./database/database.js";
import { swaggerDocs as V1swaggerDocs } from "./routes/swagger.js";
import "dotenv/config";

async function main() {
  try {
    await sequelize.sync({ force: false });
    app.listen(process.env.PORT, () => {
      console.log("\n🚀 Server running on port 3000\n");
      V1swaggerDocs(app, process.env.PORT);
    });
  } catch (error) {
    console.log(`Unable to connect to the database: ${error}`);
  }
}

main();