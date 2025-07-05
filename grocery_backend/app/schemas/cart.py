from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from app.schemas.item import Item


class CartItemBase(BaseModel):
    item_id: int
    quantity: int = 1


class CartItemCreate(CartItemBase):
    pass


class CartItemUpdate(BaseModel):
    quantity: Optional[int] = None


class CartItem(CartItemBase):
    id: int
    cart_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    item: Optional[Item] = None

    class Config:
        from_attributes = True


class CartBase(BaseModel):
    user_id: int


class CartCreate(CartBase):
    pass


class Cart(CartBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    cart_items: List[CartItem] = []

    class Config:
        from_attributes = True
