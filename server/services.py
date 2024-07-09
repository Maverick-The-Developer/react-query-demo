from model import Product, AddProduct, UpdateProduct
import random
import time
from sqlmodel import Session, insert, select, update, delete, desc, func

def makeNewId() -> str:
    random_id = random.randint(100, 999)
    current_time = int(time.time() * 1000)
    new_id = str(random_id) + str(current_time)[3:]
    return new_id

def addProduct(product: AddProduct, db: Session) -> Product | None:
    stmt = insert(Product).values(
        id=makeNewId(),
        name=product.name,
        price=product.price,
        quantity=product.quantity
    )
    result = db.exec(stmt)
    db.commit()
    newId = result.inserted_primary_key[0]
    newProduct = db.exec(select(Product).where(Product.id == newId)).one_or_none()
    return newProduct

def getAllProduct(db: Session) -> list[Product]:
    productList: list[Product] = db.exec(select(Product)).all()
    return productList

def getProduct(product_id: str, db: Session) -> Product | None:
    return db.exec(select(Product).where(Product.id == product_id)).one_or_none()


def updateProduct(product_id: str, product: UpdateProduct, db: Session):
    db_Product = db.exec(select(Product).where(Product.id == product_id)).one_or_none()
    if db_Product is None:
        return None
    stmt = update(Product).where(Product.id == product_id).values(name=product.name, price=product.price, quantity=product.quantity)
    db.exec(stmt)
    db.commit()
    db.refresh(db_Product)
    return db_Product

def deleteProduct(product_id: str, db: Session):
    db_Product = db.exec(select(Product).where(Product.id == product_id)).one_or_none()
    if db_Product is None:
        return None
    stmt = delete(Product).where(Product.id == product_id)
    db.exec(stmt)
    db.commit()
    return db_Product
