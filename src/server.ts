import "dotenv/config";
import "reflect-metadata";
import { app } from "./app";

const PORT = Number(process.env.PORT) || 3333;
app.listen(PORT, () => {
  console.log(`API is running on server ${PORT}`);
});
