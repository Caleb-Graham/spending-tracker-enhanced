export class CategoryRequest {
  name: string;
  oldCategoryName: string;
  type: string;
  parent_Category_ID?: number;

  constructor(
    name: string,
    oldCategoryName: string,
    type: string,
    parent_Category_ID?: number
  ) {
    this.name = name;
    this.oldCategoryName = oldCategoryName;
    this.type = type;
    this.parent_Category_ID = parent_Category_ID;
  }
}
