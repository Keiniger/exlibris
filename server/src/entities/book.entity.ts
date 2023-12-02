import { BookRepository } from '../infraestructure/db/repositories/book.repository';
import { BaseEntity } from './base.entity';

export class Book extends BaseEntity {
  private _title: string;
  private _author: string;

  constructor(title: string, author: string, id?: number) {
    super(new BookRepository(), id);
    this._title = title;
    this._author = author;
  }

  get id(): number | undefined {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get author(): string {
    return this._author;
  }
}
