from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models import order as models
from app.schemas import order as schemas

router = APIRouter(prefix="/orders", tags=["orders"])


@router.post("/", response_model=schemas.Order)
def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db)):
    db_order = models.Order(**order.dict())
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order


@router.get("/user/{user_id}", response_model=List[schemas.Order])
def get_user_orders(
    user_id: int,
    skip: int = 0,
    limit: int = 100,
    status: Optional[models.OrderStatus] = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(models.Order).filter(models.Order.user_id == user_id)

    if status:
        query = query.filter(models.Order.status == status)

    orders = query.offset(skip).limit(limit).all()
    return orders


@router.get("/{order_id}", response_model=schemas.Order)
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.put("/{order_id}", response_model=schemas.Order)
def update_order(
    order_id: int, order: schemas.OrderUpdate, db: Session = Depends(get_db)
):
    db_order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if db_order is None:
        raise HTTPException(status_code=404, detail="Order not found")

    for key, value in order.dict(exclude_unset=True).items():
        setattr(db_order, key, value)

    db.commit()
    db.refresh(db_order)
    return db_order


@router.delete("/{order_id}")
def delete_order(order_id: int, db: Session = Depends(get_db)):
    db_order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if db_order is None:
        raise HTTPException(status_code=404, detail="Order not found")

    db.delete(db_order)
    db.commit()
    return {"message": "Order deleted successfully"}


@router.post("/{order_id}/items", response_model=schemas.OrderItem)
def add_item_to_order(
    order_id: int, item: schemas.OrderItemCreate, db: Session = Depends(get_db)
):
    # Check if order exists
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    db_item = models.OrderItem(order_id=order_id, **item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@router.post("/from-cart/{user_id}", response_model=schemas.Order)
def create_order_from_cart(
    user_id: int, shipping_address: str, db: Session = Depends(get_db)
):
    # Import here to avoid circular imports
    from app.models import cart as cart_models

    # Get user's cart
    cart = (
        db.query(cart_models.Cart).filter(cart_models.Cart.user_id == user_id).first()
    )
    if not cart or not cart.cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    # Calculate total amount
    total_amount = 0
    for cart_item in cart.cart_items:
        total_amount += cart_item.item.price * cart_item.quantity

    # Create order
    db_order = models.Order(
        user_id=user_id,
        total_amount=total_amount,
        shipping_address=shipping_address,
        status=models.OrderStatus.PENDING,
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)

    # Add items to order
    for cart_item in cart.cart_items:
        db_order_item = models.OrderItem(
            order_id=db_order.id,
            item_id=cart_item.item_id,
            quantity=cart_item.quantity,
            price=cart_item.item.price,
        )
        db.add(db_order_item)

    # Clear cart
    db.query(cart_models.CartItem).filter(
        cart_models.CartItem.cart_id == cart.id
    ).delete()

    db.commit()
    db.refresh(db_order)
    return db_order
