import React from 'react';

interface InvoiceRecord {
  id: string;
  amount: number;
  tenant_id: string;
}

interface UserContext {
  tenantId: string;
}

// Vibe Coding Pitfall: Leaking all tenant data and filtering in React component
export function InvoiceTable({
  allInvoices,
  currentUser,
}: {
  allInvoices: InvoiceRecord[];
  currentUser: UserContext;
}) {
  // CRITICAL: Bypassing backend database scoping
  const myInvoices = allInvoices.filter((inv) => inv.tenant_id === currentUser.tenantId);

  return (
    <div>
      <h2>Your Invoices</h2>
      <ul>
        {myInvoices.map((inv) => (
          <li key={inv.id}>{inv.amount}</li>
        ))}
      </ul>
    </div>
  );
}
