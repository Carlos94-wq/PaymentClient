interface PaymentInsert{
    SupplierId: number,
    UserId: number,
    Amount: number,
    CurrencyId: number,
    Comments: string
}

export default PaymentInsert;