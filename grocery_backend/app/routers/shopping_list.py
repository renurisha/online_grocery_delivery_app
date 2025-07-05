from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import shopping_list as models
from app.schemas import shopping_list as schemas

router = APIRouter(prefix="/shopping-lists", tags=["shopping-lists"])


@router.post("/", response_model=schemas.ShoppingList)
def create_shopping_list(
    shopping_list: schemas.ShoppingListCreate, db: Session = Depends(get_db)
):
    db_shopping_list = models.ShoppingList(**shopping_list.dict())
    db.add(db_shopping_list)
    db.commit()
    db.refresh(db_shopping_list)
    return db_shopping_list


@router.get("/user/{user_id}", response_model=List[schemas.ShoppingList])
def get_user_shopping_lists(user_id: int, db: Session = Depends(get_db)):
    shopping_lists = (
        db.query(models.ShoppingList)
        .filter(models.ShoppingList.user_id == user_id)
        .all()
    )
    return shopping_lists


@router.get("/{shopping_list_id}", response_model=schemas.ShoppingList)
def get_shopping_list(shopping_list_id: int, db: Session = Depends(get_db)):
    shopping_list = (
        db.query(models.ShoppingList)
        .filter(models.ShoppingList.id == shopping_list_id)
        .first()
    )
    if shopping_list is None:
        raise HTTPException(status_code=404, detail="Shopping list not found")
    return shopping_list


@router.put("/{shopping_list_id}", response_model=schemas.ShoppingList)
def update_shopping_list(
    shopping_list_id: int,
    shopping_list: schemas.ShoppingListUpdate,
    db: Session = Depends(get_db),
):
    db_shopping_list = (
        db.query(models.ShoppingList)
        .filter(models.ShoppingList.id == shopping_list_id)
        .first()
    )
    if db_shopping_list is None:
        raise HTTPException(status_code=404, detail="Shopping list not found")

    for key, value in shopping_list.dict(exclude_unset=True).items():
        setattr(db_shopping_list, key, value)

    db.commit()
    db.refresh(db_shopping_list)
    return db_shopping_list


@router.delete("/{shopping_list_id}")
def delete_shopping_list(shopping_list_id: int, db: Session = Depends(get_db)):
    db_shopping_list = (
        db.query(models.ShoppingList)
        .filter(models.ShoppingList.id == shopping_list_id)
        .first()
    )
    if db_shopping_list is None:
        raise HTTPException(status_code=404, detail="Shopping list not found")

    db.delete(db_shopping_list)
    db.commit()
    return {"message": "Shopping list deleted successfully"}


@router.post("/{shopping_list_id}/items", response_model=schemas.ShoppingListItem)
def add_item_to_shopping_list(
    shopping_list_id: int,
    item: schemas.ShoppingListItemCreate,
    db: Session = Depends(get_db),
):
    # Check if shopping list exists
    shopping_list = (
        db.query(models.ShoppingList)
        .filter(models.ShoppingList.id == shopping_list_id)
        .first()
    )
    if not shopping_list:
        raise HTTPException(status_code=404, detail="Shopping list not found")

    # Check if item already in shopping list
    existing_item = (
        db.query(models.ShoppingListItem)
        .filter(
            models.ShoppingListItem.shopping_list_id == shopping_list_id,
            models.ShoppingListItem.item_id == item.item_id,
        )
        .first()
    )

    if existing_item:
        existing_item.quantity += item.quantity
        db.commit()
        db.refresh(existing_item)
        return existing_item

    db_item = models.ShoppingListItem(shopping_list_id=shopping_list_id, **item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@router.put(
    "/{shopping_list_id}/items/{item_id}", response_model=schemas.ShoppingListItem
)
def update_shopping_list_item(
    shopping_list_id: int,
    item_id: int,
    item: schemas.ShoppingListItemUpdate,
    db: Session = Depends(get_db),
):
    db_item = (
        db.query(models.ShoppingListItem)
        .filter(
            models.ShoppingListItem.shopping_list_id == shopping_list_id,
            models.ShoppingListItem.item_id == item_id,
        )
        .first()
    )

    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found in shopping list")

    for key, value in item.dict(exclude_unset=True).items():
        setattr(db_item, key, value)

    db.commit()
    db.refresh(db_item)
    return db_item


@router.delete("/{shopping_list_id}/items/{item_id}")
def remove_item_from_shopping_list(
    shopping_list_id: int, item_id: int, db: Session = Depends(get_db)
):
    db_item = (
        db.query(models.ShoppingListItem)
        .filter(
            models.ShoppingListItem.shopping_list_id == shopping_list_id,
            models.ShoppingListItem.item_id == item_id,
        )
        .first()
    )

    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found in shopping list")

    db.delete(db_item)
    db.commit()
    return {"message": "Item removed from shopping list"}
