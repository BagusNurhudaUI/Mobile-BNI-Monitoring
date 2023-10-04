declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
export interface LabeledValue {
  label: string;
  size: number;
}

declare module '*.png' {
  const value: any;
  export = value;
}

declare module '*.jpg';
declare module '*.png';
