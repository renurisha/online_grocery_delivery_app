from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from app.schemas.item import Item


class WishlistItemBase(BaseModel):
    item_id: int


class WishlistItemCreate(WishlistItemBase):
    pass


class WishlistItem(WishlistItemBase):
    id: int
    wishlist_id: int
    created_at: datetime
    item: Optional[Item] = None

    class Config:
        from_attributes = True


class WishlistBase(BaseModel):
    user_id: int


class WishlistCreate(WishlistBase):
    pass


class Wishlist(WishlistBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    wishlist_items: List[WishlistItem] = []

    class Config:
        from_attributes = True
