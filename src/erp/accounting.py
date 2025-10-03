"""Accounting helpers."""

from __future__ import annotations

from decimal import Decimal
from typing import Dict

from .models import Invoice, InvoiceLine, InvoiceStatus, Order


class InvoiceManager:
    """Generates invoices from orders and tracks their payment status."""

    def __init__(self) -> None:
        self._invoices: Dict[str, Invoice] = {}

    def create_from_order(self, invoice_id: str, order: Order) -> Invoice:
        if invoice_id in self._invoices:
            raise ValueError(f"Invoice with id {invoice_id} already exists.")
        if not order.lines:
            raise ValueError("Cannot create an invoice for an order without lines.")

        lines = [
            InvoiceLine(
                description=line.product.name,
                quantity=line.quantity,
                unit_price=line.product.unit_price,
            )
            for line in order.lines
        ]
        invoice = Invoice(invoice_id=invoice_id, order=order, lines=tuple(lines))
        self._invoices[invoice_id] = invoice
        return invoice

    def issue(self, invoice_id: str) -> Invoice:
        invoice = self._get_invoice(invoice_id)
        invoice.issue()
        return invoice

    def register_payment(self, invoice_id: str) -> Invoice:
        invoice = self._get_invoice(invoice_id)
        invoice.register_payment()
        return invoice

    def outstanding_balance(self) -> Decimal:
        return sum(
            (
                invoice.total()
                for invoice in self._invoices.values()
                if invoice.status is not InvoiceStatus.PAID
            ),
            Decimal("0"),
        )

    def _get_invoice(self, invoice_id: str) -> Invoice:
        try:
            return self._invoices[invoice_id]
        except KeyError as exc:
            raise KeyError(f"Unknown invoice with id {invoice_id}.") from exc


__all__ = ["InvoiceManager"]
