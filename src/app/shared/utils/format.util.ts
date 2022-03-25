import { isEmpty } from 'lodash';

export class FormatUtils {
  static formatDocument(document: string): string {
    if (!isEmpty(document)) {
      return document.length === 11
        ? document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
        : document.replace(
            /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
            '$1.$2.$3/$4-$5'
          );
    }

    return document;
  }

  static formatPhone(phone: string): string {
    if (!isEmpty(phone)) {
      return phone.length === 11
        ? phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
        : phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }

    return phone;
  }
}
