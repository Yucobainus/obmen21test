export type InputField = {
  type: string;
  name: string;
  send: {
    header: string;
    placeholder: string;
    error: string;
    visible: boolean;
    algValidate: boolean;
  };
  receive: {
    header: string;
    placeholder: string;
    error: string;
    visible: boolean;
    algValidate: boolean;
  };
  optionList: any[];
  regex: string;
};

export type Currency = {
  id: number;
  currency: string;
  active: boolean;
};

export type ExchangeDirectionStructure = {
  currency: Currency[];
  input: InputField[];
  network: any[];
  city: any[];
  savedRequisites: any[];
  inputVerify: InputField[];
};

export type ExchangeDirection = {
  notify: string;
  min: number;
  minVerification: number;
  max: number;
  currency: string;
  round: number;
  roundCalculator: number;
  monitoringCode: string;
};

export type Structure = {
  from: ExchangeDirectionStructure;
  to: ExchangeDirectionStructure;
  congestion: null;
  capcha: boolean;
  emailClaimRequirement: null;
};

export type ExchangeApiResponse = {
  course: number;
  verificationCourse: null;
  bonus: number;
  notify: string;
  from: ExchangeDirection;
  to: ExchangeDirection;
  structure: Structure;
};
