import { Result } from "../../models/generated";

export class ResultBuilder {
  private readonly result: Result;

  constructor() {
    this.result = {
      isSuccess: false,
      entities: null,
      errors: new Array<string>(),
      message: '',
    };
  }

  setSuccess(isSuccess: boolean): ResultBuilder {
    this.result.isSuccess = isSuccess;
    return this;
  }
  setMessage(message: string): ResultBuilder {
    this.result.message = message;
    return this;
  }
  setErrors(errors: Array<string>): ResultBuilder {
    this.result.errors = errors;
    return this;
  }
  setEntities(entities: any): ResultBuilder {
    this.result.entities = entities;
    return this;
  }
 
  build(): Result {
    return this.result;
  }
}
