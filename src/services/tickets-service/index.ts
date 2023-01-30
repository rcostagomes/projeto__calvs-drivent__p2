
import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";
import { TicketStatus } from "@prisma/client";

async function getTypes() {
  const ticktsTypes = await ticketsRepository.ticketsTypes()
 if(!ticktsTypes){
   throw notFoundError();
 }
 return  ticktsTypes;
 }
 
 
async function getEnrollmentById(id:number) {
  const enrollment = await ticketsRepository.getUserTickets(id);
  if(!enrollment){
    throw notFoundError();
  }
 const ticket = await ticketsRepository.getUserTickets(enrollment.id);
 if(!ticket){
  return notFoundError();
 }
 return ticket;
}

async function insertTicket(id:number,ticketTypeId:number) {
  const enrollment = await ticketsRepository.getUserTickets(id);
  if(!enrollment){
    throw notFoundError();
  }
 const TicketInfo = {
  ticketTypeId,
  enrollmentId: enrollment.id,
  status:TicketStatus.RESERVED
 }
 await ticketsRepository.insertTicket(TicketInfo)

 const ticket = await ticketsRepository.getUserTickets(enrollment.id)



 return ticket;
}

const TicketsService = {
    getTypes,
    getEnrollmentById,
    insertTicket
};

export default TicketsService;
