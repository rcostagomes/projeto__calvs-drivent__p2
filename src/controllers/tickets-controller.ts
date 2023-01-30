import { AuthenticatedRequest } from "@/middlewares";
import TicketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTypes(req: AuthenticatedRequest, res: Response) {

  try {
    const types = await TicketsService.getTypes();

    return res.status(httpStatus.OK).send(types);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
  export async function getTickets(req: AuthenticatedRequest, res: Response) {
    const {userId} = req;
    try {
      const ticket = await TicketsService.getEnrollmentById(userId);
  
      return res.status(httpStatus.OK).send(ticket);
    } catch (error) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
   
}

export async function postTickets(req: AuthenticatedRequest, res: Response) {
  const {userId} = req;
  const {ticketTypeId} = req.body;
  if(!ticketTypeId){
    res.sendStatus(httpStatus.BAD_REQUEST)
  }

  try {
    const ticket = await TicketsService.insertTicket(userId,ticketTypeId);

    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }   
 
}