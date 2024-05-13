export class Category {
  name: string;
  type: string;
  parent_Category_Name?: string;

  constructor(name: string, type: string, parent_Category_Name?: string) {
    this.name = name;
    this.type = type;
    this.parent_Category_Name = parent_Category_Name;
  }
}
