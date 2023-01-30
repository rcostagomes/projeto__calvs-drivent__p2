import { notFoundError, unauthorizedError } from '@/errors';
import paymentRepository from '@/repositories/payment-repository';
import ticketRepository from '@/repositories/tickets-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function TicketAndEnrollment(ticketId: number, userId: number) {
  const ticket = await ticketRepository.getUserTickets(ticketId);

  if (!ticket) {
    throw notFoundError();
  }
  const enrollment = await ticketsRepository.getUserTickets(ticket.enrollmentId);

  if (enrollment.id !== userId) {
    throw unauthorizedError();
  }
}

async function getPaymentByTicketId(userId: number, ticketId: number) {
  await TicketAndEnrollment(ticketId, userId);

  const payment = await paymentRepository.findPaymentByTicketId(ticketId);

  if (!payment) {
    throw notFoundError();
  }
  return payment;
}

async function paymentProcess(ticketId: number, userId: number, cardData: CardPaymentParams) {
  await TicketAndEnrollment(ticketId, userId);

  const ticket = await ticketRepository.getUserTickets(ticketId);

  const paymentData = {
    ticketId,
    value: ticket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().slice(-4),
  };

  const payment = await paymentRepository.InsertPayment(ticketId, paymentData);

  await ticketRepository.ticketPayment(ticketId);

  return payment;
}

export type CardPaymentParams = {
  issuer: string;
  number: number;
  name: string;
  expirationDate: Date;
  cvv: number;
};

const paymentService = {
  getPaymentByTicketId,
  paymentProcess,
};

export default paymentService;
