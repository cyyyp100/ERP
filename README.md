# ERP Domain Layer

This repository contains a lightweight, framework-agnostic domain layer for an
Enterprise Resource Planning (ERP) style system. The goal of the project is to
provide a clear, well-structured codebase that demonstrates how to manage
inventory, orders, and invoices using plain Python objects.

## Project layout

```
.
├── pyproject.toml          # Packaging and tooling configuration
├── src/
│   └── erp/
│       ├── __init__.py     # Convenience exports
│       ├── accounting.py   # Invoice management helpers
│       ├── inventory.py    # Product and stock management
│       ├── models.py       # Core domain models
│       └── orders.py       # Order lifecycle management
└── tests/                  # Automated test suite using pytest
```

## Getting started

Create and activate a virtual environment, then install the package in editable
mode along with the testing tools:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e .[test]
pip install pytest
```

> The project intentionally avoids runtime dependencies to remain lightweight.

## Running the test suite

The repository includes a pytest-based test suite that exercises the main
behaviour of the domain layer. After installing the dependencies, run:

```bash
pytest
```

All tests should pass and provide a quick verification that the core flows work
as expected.

## Usage example

```python
from decimal import Decimal

from erp import Customer, InventoryManager, InvoiceManager, OrderManager

inventory = InventoryManager()
inventory.register_product("SKU-1", "Widget", Decimal("12.50"), initial_stock=10)

customer = Customer(customer_id="C-1", name="Alice", email="alice@example.com")
orders = OrderManager(inventory)
order = orders.create_order("ORD-1", customer, [("SKU-1", 3)])
orders.fulfill_order(order.order_id)

invoices = InvoiceManager()
invoice = invoices.create_from_order("INV-1", order)
invoices.issue(invoice.invoice_id)
```

This snippet demonstrates the main lifecycle: registering a product, creating
an order that reserves stock, and generating an invoice once the order is ready
for billing.

## Contributing

Issues and pull requests are welcome. When contributing, please ensure that:

1. Code remains free of unnecessary dependencies.
2. Tests cover new functionality and continue to pass.
3. Documentation is updated for new features or behavioural changes.

## License

This project is released under the MIT License. See `LICENSE` if provided by
upstream consumers.
