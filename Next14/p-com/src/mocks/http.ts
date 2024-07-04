import { createMiddleware } from "@mswjs/http-middleware";
import express from "express";
import cors from "cors";
import { handlers } from "./handlers";
// next가 msw와 매끄럽게 안되서 노드서버 사용
const app = express();
const port = 9090;

app.use(cors({ origin: "http://localhost:3001", optionsSuccessStatus: 200, credentials: true }));
app.use(express.json());
app.use(createMiddleware(...handlers));
app.listen(port, () => console.log(`Mock server is running on port: ${port}`));
