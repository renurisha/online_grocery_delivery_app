from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import cart as models
from app.schemas import cart as schemas

router = APIRouter(prefix="/cart", tags=["cart"])


@router.post("/{user_id}", response_model=schemas.Cart)
def create_cart(user_id: int, db: Session = Depends(get_db)):
    # Check if cart already exists for user
    existing_cart = db.query(models.Cart).filter(models.Cart.user_id == user_id).first()
    if existing_cart:
        return existing_cart

    db_cart = models.Cart(user_id=user_id)
    db.add(db_cart)
    db.commit()
    db.refresh(db_cart)
    return db_cart


@router.get("/{user_id}", response_model=schemas.Cart)
def get_cart(user_id: int, db: Session = Depends(get_db)):
    cart = db.query(models.Cart).filter(models.Cart.user_id == user_id).first()
    if cart is None:
        raise HTTPException(status_code=404, detail="Cart not found")
    return cart


@router.post("/{user_id}/items", response_model=schemas.CartItem)
def add_item_to_cart(
    user_id: int, cart_item: schemas.CartItemCreate, db: Session = Depends(get_db)
):
    # Get or create cart
    cart = db.query(models.Cart).filter(models.Cart.user_id == user_id).first()
    if not cart:
        cart = models.Cart(user_id=user_id)
        db.add(cart)
        db.commit()
        db.refresh(cart)
    # Check if item already in cart
    existing_item = (
        db.query(models.CartItem)
        .filter(
            models.CartItem.cart_id == cart.id,
            models.CartItem.item_id == cart_item.item_id,
        )
        .first()
    )

    if existing_item:
        existing_item.quantity += cart_item.quantity
        db.commit()
        db.refresh(existing_item)
        return existing_item

    db_cart_item = models.CartItem(
        cart_id=cart.id, item_id=cart_item.item_id, quantity=cart_item.quantity
    )
    db.add(db_cart_item)
    db.commit()
    db.refresh(db_cart_item)
    return db_cart_item


@router.put("/{user_id}/items/{item_id}", response_model=schemas.CartItem)
def update_cart_item(
    user_id: int,
    item_id: int,
    cart_item: schemas.CartItemUpdate,
    db: Session = Depends(get_db),
):
    cart = db.query(models.Cart).filter(models.Cart.user_id == user_id).first()
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    db_cart_item = (
        db.query(models.CartItem)
        .filter(models.CartItem.cart_id == cart.id, models.CartItem.item_id == item_id)
        .first()
    )
    if not db_cart_item:
        raise HTTPException(status_code=404, detail="Item not found in cart")

    for key, value in cart_item.dict(exclude_unset=True).items():
        setattr(db_cart_item, key, value)

    db.commit()
    db.refresh(db_cart_item)
    return db_cart_item


@router.delete("/{user_id}/items/{item_id}")
def remove_item_from_cart(user_id: int, item_id: int, db: Session = Depends(get_db)):
    cart = db.query(models.Cart).filter(models.Cart.user_id == user_id).first()
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    db_cart_item = (
        db.query(models.CartItem)
        .filter(models.CartItem.cart_id == cart.id, models.CartItem.item_id == item_id)
        .first()
    )

    if not db_cart_item:
        raise HTTPException(status_code=404, detail="Item not found in cart")

    db.delete(db_cart_item)
    db.commit()
    return {"message": "Item removed from cart"}


@router.delete("/{user_id}/clear")
def clear_cart(user_id: int, db: Session = Depends(get_db)):
    cart = db.query(models.Cart).filter(models.Cart.user_id == user_id).first()
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    db.query(models.CartItem).filter(models.CartItem.cart_id == cart.id).delete()
    db.commit()
    return {"message": "Cart cleared"}
