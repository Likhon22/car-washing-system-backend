import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  search(searchAbleFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchAbleFields.map(
          field =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }
  filter() {
    const queryObj = {
      ...this.query,
    };
    const excludedFields = ["searchTerm", "sort", "limit", "page", "fields"];
    excludedFields.forEach(field => delete queryObj[field]);
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }
  sort() {
    const sort = (this?.query?.sort as string) || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }
  paginate() {
    const limit = Number(this?.query?.limit as string) || 10;
    const page = Number(this?.query?.page as string) | 1;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }
  fields() {
    const fields =
      (this?.query?.fields as string)?.split(",").join(" ") || "-__v";
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;