from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app.models import category, item, cart, wishlist, shopping_list, order, user
from app.routers import (
    users,
    categories,
    items,
    cart as cart_router,
    wishlist as wishlist_router,
    shopping_list as shopping_list_router,
    orders,
)

# Create database tables
user.Base.metadata.create_all(bind=engine)
category.Base.metadata.create_all(bind=engine)
item.Base.metadata.create_all(bind=engine)
cart.Base.metadata.create_all(bind=engine)
wishlist.Base.metadata.create_all(bind=engine)
shopping_list.Base.metadata.create_all(bind=engine)
order.Base.metadata.create_all(bind=engine)
# user.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Online Grocery Store API",
    description="A comprehensive API for online grocery store management",
    version="1.0.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users.router, prefix="/api/v1")
app.include_router(categories.router, prefix="/api/v1")
app.include_router(items.router, prefix="/api/v1")
app.include_router(cart_router.router, prefix="/api/v1")
app.include_router(wishlist_router.router, prefix="/api/v1")
app.include_router(shopping_list_router.router, prefix="/api/v1")
app.include_router(orders.router, prefix="/api/v1")


@app.get("/")
def read_root():
    return {
        "message": "Welcome to Online Grocery Store API",
        "version": "1.0.0",
        "docs": "/docs",
        "redoc": "/redoc",
    }


@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "online-grocery-api"}
