export interface Field {
  id: string;
  name: string;
  description: string;
}

export interface FieldDetail {
  id: string;
  fieldId: string;
  name: string;
}

export interface FieldDetailCount {
  id: string;
  name: string;
  count: number;
}
