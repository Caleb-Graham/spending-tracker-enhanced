export class Category {
  name: string;
  type: string;
  parent_Category_ID?: number;

  constructor(name: string, type: string, parent_Category_ID?: number) {
    this.name = name;
    this.type = type;
    this.parent_Category_ID = parent_Category_ID;
  }
}
