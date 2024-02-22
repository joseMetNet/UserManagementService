export interface dataUser  {
    password: string
    userName: string
    userGroup: string
}
export interface dataUserGroup  {
    nameUserGroup: string
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
    userName: string;
  }