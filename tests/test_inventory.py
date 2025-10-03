from decimal import Decimal

import pytest

from erp.inventory import InventoryManager


def test_register_and_retrieve_product():
    inventory = InventoryManager()
    created = inventory.register_product("SKU-1", "Test Product", Decimal("12.50"))

    retrieved = inventory.get_product("SKU-1")

    assert retrieved is created
    assert retrieved.stock == 0


def test_restock_and_allocate_updates_stock_levels():
    inventory = InventoryManager()
    inventory.register_product("SKU-1", "Widget", Decimal("5.00"), initial_stock=5)

    inventory.restock("SKU-1", 5)
    assert inventory.available_quantity("SKU-1") == 10

    inventory.allocate("SKU-1", 4)
    assert inventory.available_quantity("SKU-1") == 6

    inventory.release("SKU-1", 3)
    assert inventory.available_quantity("SKU-1") == 9


def test_allocate_more_than_available_raises_error():
    inventory = InventoryManager()
    inventory.register_product("SKU-1", "Widget", Decimal("5.00"))

    with pytest.raises(ValueError):
        inventory.allocate("SKU-1", 1)


def test_low_stock_filters_based_on_threshold():
    inventory = InventoryManager()
    inventory.register_product("SKU-1", "Widget", Decimal("5.00"), initial_stock=2)
    inventory.register_product("SKU-2", "Gadget", Decimal("8.00"), initial_stock=10)

    low_stock = inventory.low_stock(threshold=3)

    assert len(low_stock) == 1
    assert low_stock[0].sku == "SKU-1"
