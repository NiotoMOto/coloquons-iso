declare module 'react-file-input'{
  import {Component} from 'react';
  interface FileInputProps {
    name?: string,
    accept?: string,
    placeholder?: string,
    className?: string,
    onChange?: any
  }
  export default class FileInput extends Component<FileInputProps, {}> {
    onChange(): void
  }
}
