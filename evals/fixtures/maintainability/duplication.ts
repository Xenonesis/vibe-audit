export function discountForOrder(order:any){ return order.total > 1000 ? order.total * 0.1 : 0; }
export function discountForInvoice(invoice:any){ return invoice.total > 1000 ? invoice.total * 0.1 : 0; }
