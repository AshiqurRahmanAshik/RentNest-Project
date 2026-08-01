export interface IPaymentCreate {
  rentalRequestId: string;
}

export interface IConfirmPayment {
  tran_id: string;
  val_id: string;
}
