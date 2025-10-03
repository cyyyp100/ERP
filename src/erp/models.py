"""Domain models used by the ERP package."""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import date
from decimal import Decimal
from enum import Enum
from typing import Iterable, List


class OrderStatus(str, Enum):
    """Possible states for an :class:`Order`."""

    PENDING = "pending"
    CANCELLED = "cancelled"
    FULFILLED = "fulfilled"


class InvoiceStatus(str, Enum):
    """Possible states for an :class:`Invoice`."""

    DRAFT = "draft"
    ISSUED = "issued"
    PAID = "paid"


@dataclass(slots=True)
class Product:
    """Represents a product that can be stocked and sold."""

    sku: str
    name: str
    unit_price: Decimal
    stock: int = 0

    def restock(self, quantity: int) -> None:
        """Increase the available inventory for the product."""

        if quantity <= 0:
            raise ValueError("Quantity to restock must be greater than zero.")
        self.stock += quantity

    def allocate(self, quantity: int) -> None:
        """Allocate stock for a sale, reducing the available inventory."""

        if quantity <= 0:
            raise ValueError("Quantity to allocate must be greater than zero.")
        if quantity > self.stock:
            raise ValueError(
                f"Cannot allocate {quantity} units of {self.sku}; only {self.stock} remaining."
            )
        self.stock -= quantity

    def release(self, quantity: int) -> None:
        """Return reserved stock back to the inventory."""

        if quantity <= 0:
            raise ValueError("Quantity to release must be greater than zero.")
        self.stock += quantity


@dataclass(slots=True)
class Customer:
    """Represents a customer that can place orders."""

    customer_id: str
    name: str
    email: str


@dataclass(slots=True)
class OrderLine:
    """Represents a single line inside an order."""

    product: Product
    quantity: int

    @property
    def total(self) -> Decimal:
        return self.product.unit_price * self.quantity


@dataclass(slots=True)
class Order:
    """Represents a customer order comprised of multiple order lines."""

    order_id: str
    customer: Customer
    lines: List[OrderLine] = field(default_factory=list)
    status: OrderStatus = OrderStatus.PENDING
    created_on: date = field(default_factory=date.today)

    def total(self) -> Decimal:
        return sum((line.total for line in self.lines), Decimal("0"))

    def add_line(self, product: Product, quantity: int) -> None:
        if quantity <= 0:
            raise ValueError("Order line quantity must be greater than zero.")
        self.lines.append(OrderLine(product=product, quantity=quantity))

    def cancel(self) -> None:
        if self.status is OrderStatus.FULFILLED:
            raise ValueError("Fulfilled orders cannot be cancelled.")
        self.status = OrderStatus.CANCELLED

    def fulfill(self) -> None:
        if self.status is OrderStatus.CANCELLED:
            raise ValueError("Cancelled orders cannot be fulfilled.")
        self.status = OrderStatus.FULFILLED


@dataclass(slots=True)
class InvoiceLine:
    """Represents the monetary amount of a single order line."""

    description: str
    quantity: int
    unit_price: Decimal

    @property
    def total(self) -> Decimal:
        return self.unit_price * self.quantity


@dataclass(slots=True)
class Invoice:
    """Represents a billing document generated from an order."""

    invoice_id: str
    order: Order
    lines: Iterable[InvoiceLine]
    status: InvoiceStatus = InvoiceStatus.DRAFT
    issued_on: date | None = None
    paid_on: date | None = None

    def total(self) -> Decimal:
        return sum((line.total for line in self.lines), Decimal("0"))

    def issue(self, issued_on: date | None = None) -> None:
        if self.status is not InvoiceStatus.DRAFT:
            raise ValueError("Only draft invoices can be issued.")
        self.status = InvoiceStatus.ISSUED
        self.issued_on = issued_on or date.today()

    def register_payment(self, paid_on: date | None = None) -> None:
        if self.status is not InvoiceStatus.ISSUED:
            raise ValueError("Only issued invoices can be marked as paid.")
        self.status = InvoiceStatus.PAID
        self.paid_on = paid_on or date.today()


__all__ = [
    "Customer",
    "Invoice",
    "InvoiceLine",
    "InvoiceStatus",
    "Order",
    "OrderLine",
    "OrderStatus",
    "Product",
]
