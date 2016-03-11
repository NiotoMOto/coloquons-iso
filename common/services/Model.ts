import * as _ from 'lodash';
// const config = require('../../config/config.json');

interface IModel {
  name: String;
  getAll(): Promise<any>;
  getById(id: String): Promise<any>;
}

export class Model implements IModel{
  name: String;

  constructor(name: String) {
    this.name = name;
  }

  getAll() {
    return fetch(`http://localhost:4001/api/v1/${this.name}s`).then(resp => {
      return resp.json();
      // console.log(resp.json());
    });
  }

  getById(id) {
    return fetch(`http://localhost:4001/api/v1/${this.name}s/${id}`);
  }
}
