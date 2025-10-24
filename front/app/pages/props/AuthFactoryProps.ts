type Resource = {
  id: number;
  htmlFor: string;
  text: string;
  type: string;
  name: string;
  maxLength: number;
};

export type AuthFactoryProps = {
  resources: Resource[];
  textParagraph: string;
  textBtn: string;
  textA: string;
  action: string;
};
