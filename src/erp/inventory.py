"""Inventory management helpers."""

from __future__ import annotations

from dataclasses import dataclass
from decimal import Decimal
from typing import Dict, Iterable, List

from .models import Product


@dataclass(slots=True)
class InventorySnapshot:
    """Lightweight representation of a product's availability."""

    sku: str
    name: str
    unit_price: Decimal
    stock: int


class InventoryManager:
    """Tracks products and their availability."""

    def __init__(self) -> None:
        self._products: Dict[str, Product] = {}

    def register_product(
        self, sku: str, name: str, unit_price: Decimal, *, initial_stock: int = 0
    ) -> Product:
        if sku in self._products:
            raise ValueError(f"Product with SKU {sku} already registered.")
        product = Product(sku=sku, name=name, unit_price=Decimal(unit_price), stock=0)
        if initial_stock:
            product.restock(initial_stock)
        self._products[sku] = product
        return product

    def get_product(self, sku: str) -> Product:
        try:
            return self._products[sku]
        except KeyError as exc:
            raise KeyError(f"Unknown product with SKU {sku}.") from exc

    def restock(self, sku: str, quantity: int) -> None:
        product = self.get_product(sku)
        product.restock(quantity)

    def allocate(self, sku: str, quantity: int) -> None:
        product = self.get_product(sku)
        product.allocate(quantity)

    def release(self, sku: str, quantity: int) -> None:
        product = self.get_product(sku)
        product.release(quantity)

    def list_products(self) -> Iterable[InventorySnapshot]:
        for product in self._products.values():
            yield InventorySnapshot(
                sku=product.sku,
                name=product.name,
                unit_price=product.unit_price,
                stock=product.stock,
            )

    def low_stock(self, *, threshold: int) -> List[InventorySnapshot]:
        if threshold < 0:
            raise ValueError("Threshold must be non-negative.")
        return [
            snapshot
            for snapshot in self.list_products()
            if snapshot.stock <= threshold
        ]

    def available_quantity(self, sku: str) -> int:
        return self.get_product(sku).stock

    def clear(self) -> None:
        self._products.clear()


__all__ = ["InventoryManager", "InventorySnapshot"]
