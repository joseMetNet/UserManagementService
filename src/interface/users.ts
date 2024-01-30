export interface dataUser  {
    password: string
    email: string
    userGroup: string
}

export interface ImessageComposed {
    translationKey: string,
    translationParams: object
}

export interface IresponseRepositoryService {
    code: number,
    message: string | ImessageComposed,
    data?: any
}

export interface IGetUser {
    userGroup: string;
    email: string;
  }