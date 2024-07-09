from contextlib import asynccontextmanager
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from model import Product, AddProduct, UpdateProduct
from services import addProduct, getAllProduct, getProduct, updateProduct, deleteProduct
from sqlmodel import Session
from database import create_db_and_tables, get_db, engine

@asynccontextmanager
async def lifeSpan(app: FastAPI):
    # on start
    print("#" * 20, "Server is starting", "#" * 20)
    print("=" * 20, "Creating Table if NOT Exists", "=" * 20)
    create_db_and_tables()
    yield
    # on shutdown
    print("#" * 20, "Server is going DOWN", "#" * 20)
    if engine:
        engine.dispose()

app = FastAPI(lifespan=lifeSpan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def index():
    return {"message": "Hello, World!"}


@app.post("/api/v1/data", status_code=201)
def add_data(product: AddProduct, db: Session = Depends(get_db)):
    addProduct(product, db)
    return {"message": "Data added successfully"}


@app.get("/api/v1/data", response_model=list[Product])
def get_data(db: Session = Depends(get_db)):
    return getAllProduct(db)


@app.get("/api/v1/data/{product_id}", response_model=Product)
def get_datum_by_id(product_id: str, db: Session = Depends(get_db)):
    result = getProduct(product_id, db)
    if result is None:
        raise HTTPException(status_code=404, detail="Data not found")
    return result


@app.put("/api/v1/data/{product_id}")
def update_data(product_id: str, product: UpdateProduct, db: Session = Depends(get_db)):
    result = updateProduct(product_id, product, db)
    if result is None:
        raise HTTPException(status_code=404, detail="Data not found")
    return {"message": "Data updated successfully"}


@app.delete("/api/v1/data/{product_id}")
def delete_data(product_id: str, db: Session = Depends(get_db)):
    result = deleteProduct(product_id, db)
    if result is False:
        raise HTTPException(status_code=404, detail="Data not found")
    return {"message": "Data deleted successfully"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
