import { prisma } from "@/config";
import {  TicketStatus } from "@prisma/client";
async function ticketsTypes() {
  return prisma.ticketType.findMany();
}

async function getUserTickets(enrollmentId:number) {
return prisma.ticket.findFirst({
  where:{enrollmentId},
  include:{ 
    TicketType:true,
  }
})
}

async function insertTicket(ticket:any) {
  return await prisma.ticket.create({
    data:{
      ...ticket,
    }
  })
}

async function ticketPayment(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    }
  });
}
const ticketsRepository = {
  ticketsTypes,
  getUserTickets,
  insertTicket,
  ticketPayment

}

export default ticketsRepository;
