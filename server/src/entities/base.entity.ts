import { BaseRepository } from '../infraestructure/db/repositories/base.repository';

export abstract class BaseEntity {
  constructor(protected _repository: BaseRepository<any>, protected _id?: number) {}
}
