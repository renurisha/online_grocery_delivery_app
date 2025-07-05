from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from app.schemas.item import Item


class ShoppingListItemBase(BaseModel):
    item_id: int
    quantity: int = 1
    is_purchased: bool = False


class ShoppingListItemCreate(ShoppingListItemBase):
    pass


class ShoppingListItemUpdate(BaseModel):
    quantity: Optional[int] = None
    is_purchased: Optional[bool] = None


class ShoppingListItem(ShoppingListItemBase):
    id: int
    shopping_list_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    item: Optional[Item] = None

    class Config:
        from_attributes = True


class ShoppingListBase(BaseModel):
    name: str
    user_id: int


class ShoppingListCreate(ShoppingListBase):
    pass


class ShoppingListUpdate(BaseModel):
    name: Optional[str] = None


class ShoppingList(ShoppingListBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    shopping_list_items: List[ShoppingListItem] = []

    class Config:
        from_attributes = True
