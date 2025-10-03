"""Order management helpers."""

from __future__ import annotations

from typing import Dict, Iterable, Sequence

from .inventory import InventoryManager
from .models import Customer, Order, OrderStatus, Product


class OrderManager:
    """Coordinates stock reservations and order lifecycles."""

    def __init__(self, inventory: InventoryManager) -> None:
        self._inventory = inventory
        self._orders: Dict[str, Order] = {}

    def create_order(
        self,
        order_id: str,
        customer: Customer,
        line_requests: Sequence[tuple[str, int]],
    ) -> Order:
        if order_id in self._orders:
            raise ValueError(f"Order with id {order_id} already exists.")
        if not line_requests:
            raise ValueError("Orders must contain at least one line item.")

        order = Order(order_id=order_id, customer=customer)

        reservations: list[tuple[Product, int]] = []
        try:
            for sku, quantity in line_requests:
                product = self._inventory.get_product(sku)
                self._inventory.allocate(sku, quantity)
                reservations.append((product, quantity))
                order.add_line(product, quantity)
        except Exception:
            for product, quantity in reservations:
                product.release(quantity)
            raise

        self._orders[order_id] = order
        return order

    def cancel_order(self, order_id: str) -> Order:
        order = self._get_order(order_id)
        if order.status is OrderStatus.CANCELLED:
            return order
        if order.status is OrderStatus.FULFILLED:
            raise ValueError("Fulfilled orders cannot be cancelled.")
        for line in order.lines:
            self._inventory.release(line.product.sku, line.quantity)
        order.cancel()
        return order

    def fulfill_order(self, order_id: str) -> Order:
        order = self._get_order(order_id)
        if order.status is OrderStatus.CANCELLED:
            raise ValueError("Cancelled orders cannot be fulfilled.")
        order.fulfill()
        return order

    def list_orders(self) -> Iterable[Order]:
        return list(self._orders.values())

    def _get_order(self, order_id: str) -> Order:
        try:
            return self._orders[order_id]
        except KeyError as exc:
            raise KeyError(f"Unknown order with id {order_id}.") from exc


__all__ = ["OrderManager"]
