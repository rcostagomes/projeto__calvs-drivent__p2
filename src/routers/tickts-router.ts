import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTypes,getTickets, postTickets } from "@/controllers";


const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTypes)
  .get("",getTickets)
  .post("",postTickets)
 
export { ticketsRouter };
