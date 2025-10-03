from decimal import Decimal

import pytest

from erp.inventory import InventoryManager
from erp.models import Customer
from erp.orders import OrderManager


@pytest.fixture
def inventory():
    manager = InventoryManager()
    manager.register_product("SKU-1", "Widget", Decimal("5.00"), initial_stock=5)
    manager.register_product("SKU-2", "Gadget", Decimal("9.50"), initial_stock=10)
    return manager


def test_create_order_reserves_stock(inventory):
    customer = Customer(customer_id="C-1", name="Alice", email="alice@example.com")
    manager = OrderManager(inventory)

    order = manager.create_order(
        "ORD-1",
        customer,
        [("SKU-1", 2), ("SKU-2", 3)],
    )

    assert order.total() == Decimal("5.00") * 2 + Decimal("9.50") * 3
    assert inventory.available_quantity("SKU-1") == 3
    assert inventory.available_quantity("SKU-2") == 7


def test_cancel_order_releases_stock(inventory):
    customer = Customer(customer_id="C-1", name="Alice", email="alice@example.com")
    manager = OrderManager(inventory)

    manager.create_order("ORD-1", customer, [("SKU-1", 2)])
    manager.cancel_order("ORD-1")

    assert inventory.available_quantity("SKU-1") == 5


def test_fulfilled_order_cannot_be_cancelled(inventory):
    customer = Customer(customer_id="C-1", name="Alice", email="alice@example.com")
    manager = OrderManager(inventory)

    manager.create_order("ORD-1", customer, [("SKU-1", 2)])
    manager.fulfill_order("ORD-1")

    with pytest.raises(ValueError):
        manager.cancel_order("ORD-1")


def test_cannot_fulfill_cancelled_order(inventory):
    customer = Customer(customer_id="C-1", name="Alice", email="alice@example.com")
    manager = OrderManager(inventory)

    manager.create_order("ORD-1", customer, [("SKU-1", 2)])
    manager.cancel_order("ORD-1")

    with pytest.raises(ValueError):
        manager.fulfill_order("ORD-1")


def test_duplicate_order_id_rejected(inventory):
    customer = Customer(customer_id="C-1", name="Alice", email="alice@example.com")
    manager = OrderManager(inventory)

    manager.create_order("ORD-1", customer, [("SKU-1", 2)])

    with pytest.raises(ValueError):
        manager.create_order("ORD-1", customer, [("SKU-1", 1)])
