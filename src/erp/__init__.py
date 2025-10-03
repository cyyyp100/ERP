"""Lightweight ERP domain layer utilities.

This package provides building blocks for working with products, orders, and
invoices in a small enterprise resource planning context. The implementation is
intentionally simple and uses in-memory storage to remain framework agnostic.
"""

from .accounting import InvoiceManager
from .inventory import InventoryManager
from .models import Customer, InvoiceStatus, Order, OrderStatus, Product
from .orders import OrderManager

__all__ = [
    "Customer",
    "InvoiceManager",
    "InvoiceStatus",
    "InventoryManager",
    "Order",
    "OrderManager",
    "OrderStatus",
    "Product",
]
