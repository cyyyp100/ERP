from decimal import Decimal

import pytest

from erp.accounting import InvoiceManager
from erp.inventory import InventoryManager
from erp.models import Customer
from erp.orders import OrderManager


@pytest.fixture
def order():
    inventory = InventoryManager()
    inventory.register_product("SKU-1", "Widget", Decimal("5.00"), initial_stock=5)

    order_manager = OrderManager(inventory)
    customer = Customer(customer_id="C-1", name="Alice", email="alice@example.com")
    return order_manager.create_order("ORD-1", customer, [("SKU-1", 2)])


def test_invoice_totals_match_order(order):
    invoices = InvoiceManager()

    invoice = invoices.create_from_order("INV-1", order)

    assert invoice.total() == Decimal("10.00")


def test_invoice_must_have_unique_id(order):
    invoices = InvoiceManager()
    invoices.create_from_order("INV-1", order)

    with pytest.raises(ValueError):
        invoices.create_from_order("INV-1", order)


def test_invoice_lifecycle(order):
    invoices = InvoiceManager()
    invoice = invoices.create_from_order("INV-1", order)

    invoices.issue("INV-1")
    assert invoice.status.name.lower() == "issued"

    invoices.register_payment("INV-1")
    assert invoice.status.name.lower() == "paid"


def test_outstanding_balance_ignores_paid_invoices(order):
    invoices = InvoiceManager()
    invoice = invoices.create_from_order("INV-1", order)

    assert invoices.outstanding_balance() == invoice.total()

    invoices.issue("INV-1")
    invoices.register_payment("INV-1")

    assert invoices.outstanding_balance() == Decimal("0")
