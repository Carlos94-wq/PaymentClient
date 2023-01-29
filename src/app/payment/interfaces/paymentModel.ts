interface PaymentModel{
    paymentId?: number;
    supplierId: number,
    userId: number,
    amount: number,
    currencyId: number,
    comments: string
}

export default PaymentModel;