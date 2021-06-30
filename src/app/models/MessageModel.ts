export class MessageModel {
  constructor(
    public id: number,
    public content: string,
    public createdAt: string,
    public fromUserId: number
  ) {}
}
