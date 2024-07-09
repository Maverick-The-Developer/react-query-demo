from sqlmodel import Field, SQLModel

class ProductBase(SQLModel):
    name: str
    price: float
    quantity: int

class Product(ProductBase, table=True):
    id: str = Field(default=None, primary_key=True)


class AddProduct(SQLModel):
    name: str
    price: float
    quantity: int

class UpdateProduct(SQLModel):
    name: str | None = None
    price: float | None = None
    quantity: int | None = None