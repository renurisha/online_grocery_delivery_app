from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import wishlist as models
from app.schemas import wishlist as schemas

router = APIRouter(prefix="/wishlist", tags=["wishlist"])


@router.post("/{user_id}", response_model=schemas.Wishlist)
def create_wishlist(user_id: int, db: Session = Depends(get_db)):
    existing_wishlist = (
        db.query(models.Wishlist).filter(models.Wishlist.user_id == user_id).first()
    )
    if existing_wishlist:
        return existing_wishlist

    db_wishlist = models.Wishlist(user_id=user_id)
    db.add(db_wishlist)
    db.commit()
    db.refresh(db_wishlist)
    return db_wishlist


@router.get("/{user_id}", response_model=schemas.Wishlist)
def get_wishlist(user_id: int, db: Session = Depends(get_db)):
    wishlist = (
        db.query(models.Wishlist).filter(models.Wishlist.user_id == user_id).first()
    )
    if wishlist is None:
        raise HTTPException(status_code=404, detail="Wishlist not found")
    return wishlist


@router.post("/{user_id}/items", response_model=schemas.WishlistItem)
def add_item_to_wishlist(
    user_id: int,
    wishlist_item: schemas.WishlistItemCreate,
    db: Session = Depends(get_db),
):
    wishlist = (
        db.query(models.Wishlist).filter(models.Wishlist.user_id == user_id).first()
    )
    if not wishlist:
        wishlist = models.Wishlist(user_id=user_id)
        db.add(wishlist)
        db.commit()
        db.refresh(wishlist)

    # Check if item already in wishlist
    existing_item = (
        db.query(models.WishlistItem)
        .filter(
            models.WishlistItem.wishlist_id == wishlist.id,
            models.WishlistItem.item_id == wishlist_item.item_id,
        )
        .first()
    )

    if existing_item:
        raise HTTPException(status_code=400, detail="Item already in wishlist")

    db_wishlist_item = models.WishlistItem(
        wishlist_id=wishlist.id, item_id=wishlist_item.item_id
    )
    db.add(db_wishlist_item)
    db.commit()
    db.refresh(db_wishlist_item)
    return db_wishlist_item


@router.delete("/{user_id}/items/{item_id}")
def remove_item_from_wishlist(
    user_id: int, item_id: int, db: Session = Depends(get_db)
):
    wishlist = (
        db.query(models.Wishlist).filter(models.Wishlist.user_id == user_id).first()
    )
    if not wishlist:
        raise HTTPException(status_code=404, detail="Wishlist not found")

    db_wishlist_item = (
        db.query(models.WishlistItem)
        .filter(
            models.WishlistItem.wishlist_id == wishlist.id,
            models.WishlistItem.item_id == item_id,
        )
        .first()
    )

    if not db_wishlist_item:
        raise HTTPException(status_code=404, detail="Item not found in wishlist")

    db.delete(db_wishlist_item)
    db.commit()
    return {"message": "Item removed from wishlist"}
