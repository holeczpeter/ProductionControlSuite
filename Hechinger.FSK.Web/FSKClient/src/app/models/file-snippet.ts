export class FileSnippet {
  pending: boolean = false;
  status: string = 'init';
  name: string;
    constructor(public src: string, public file: File) {
      this.name = file.name;
  }
}
