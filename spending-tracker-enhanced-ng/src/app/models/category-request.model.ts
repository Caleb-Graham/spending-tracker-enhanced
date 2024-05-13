export class CategoryRequest {
  name: string;
  oldCategoryName: string;
  type: string;
  parent_Category_Name?: string;

  constructor(
    name: string,
    oldCategoryName: string,
    type: string,
    parent_Category_Name?: string
  ) {
    this.name = name;
    this.oldCategoryName = oldCategoryName;
    this.type = type;
    this.parent_Category_Name = parent_Category_Name;
  }
}
