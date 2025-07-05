from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from app.schemas.item import Item
from app.models.order import OrderStatus


class OrderItemBase(BaseModel):
    item_id: int
    quantity: int
    price: float


class OrderItemCreate(OrderItemBase):
    pass


class OrderItem(OrderItemBase):
    id: int
    order_id: int
    created_at: datetime
    item: Optional[Item] = None

    class Config:
        from_attributes = True


class OrderBase(BaseModel):
    user_id: int
    total_amount: float
    shipping_address: str
    status: OrderStatus = OrderStatus.PENDING


class OrderCreate(OrderBase):
    pass


class OrderUpdate(BaseModel):
    status: Optional[OrderStatus] = None
    shipping_address: Optional[str] = None


class Order(OrderBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    order_items: List[OrderItem] = []

    class Config:
        from_attributes = True
