export namespace ClassAdanced {
  /**
   * Напишем свой чат
   * С исползованием приватных, публичных методов и свойств
   */
  class Chat {
    private messages: {
      time: Date;
      name: string;
      hash: string;
      text: string;
      id: string;
    }[] = [];

    private genrateHash(): string {
      return `${new Date().getTime()}`;
    }

    private printMessage(messagNumber: number) {
      const message = this.messages[messagNumber];
      console.log(`[${message.time}] [${message.name}]:  ${message.text}`);
    }

    private createMessage(hash: string, name: string, text: string) {
      const messageHash = this.genrateHash();
      return {
        id: messageHash,
        time: new Date(),
        name,
        hash,
        text: `${text}`,
      };
    }

    public getMessages(hash: string) {
      return this.messages.filter((message) => message.hash === hash);
    }

    public sayChat(hash: string, name: string, text: string): string {
      const messageObject = this.createMessage(hash, name, text);
      const messageNumber: number = this.messages.push(messageObject) - 1;

      this.printMessage(messageNumber);

      return messageObject.id;
    }

    public deleteMessage(hash: string, messageId: string): void {
      this.messages.forEach((message, index) => {
        if (message.hash === hash) {
          if (messageId === message.id) {
            this.messages.splice(index, 1);
          }
        }
      });
    }
  }

  let SomeChat = new Chat();

  // Обращение к приватным свойствам или методам вне родительского класса запрещены
  SomeChat.messages;
  // Публиичные поля и методы доступны всем
  SomeChat.sayChat("2132", "Ilya", "Hello wrold!");

  /**
   * Защищеные методы и свойства
   * Создадим клиента для чата
   * Предоставить интерфейсы работы с чатом
   */

  /**
   * Мессенджер
   */
  class MessangerClient {
    private chat: Chat;

    private hash: string;

    protected messagesIds: string[] = [];

    protected user: User;

    public copyright: string = "Facebook";

    constructor(user: User, chat: Chat) {
      this.user = user;
      this.chat = chat;
      this.chat.messages;
      //        ^^^^^^^^^^^Ошибка мы попытались обратиться к приватному полю класса Chat;
      this.hash = this.cretateHash();
    }

    protected cretateHash(): string {
      return Math.random().toString(36).substr(2, 9);
    }

    public sendMessage(message: string): void {
      const messageId = this.chat.sayChat(
        this.hash,
        this.user.name,
        `${message}`
      );
      this.messagesIds.push(messageId);
    }

    public findMyMessage(): any[] {
      return this.chat.getMessages(this.hash);
    }

    public deleteLastMessage(): void {
      const lastMessageId = this.messagesIds.pop();
      if (lastMessageId) {
        this.chat.deleteMessage(this.hash, lastMessageId);
      }
    }
  }
  let messangeChat = new Chat();
  let messangerUser = new User("Jonh");
  let messagenagerApp = new MessangerClient(messangerUser, messangeChat);

  class AndroidMessangerClient extends MessangerClient {
    constructor(user: User, chat: Chat) {
      super(user, chat);
      console.log(this.hash); // Доступ к приватным cвойствам или методам имеют тольк родительские классы
    }

    protected cretateHash(): string {
      return "";
    }
  }
  let androidChat = new Chat();
  let androidUser = new User("Androind Man");
  let androindUserMessanger = new AndroidMessangerClient(
    androidUser,
    androidChat
  );
  androindUserMessanger.sendMessage("Hello! I <3 Android ");
  androindUserMessanger.deleteLastMessage();
  console.log(androindUserMessanger.findMyMessage());

  // Также в полученом экземпляре класса, обращение к защищеным полям методам, мы обращться не можем, компилятор выдаст ошибку
  // androindUserMessanger.hash;

  class User {
    constructor(public name: string) {
      this.name = name;
    }
  }

  /** Техника миксирования классов */
  type Constructor<T = {}> = new (...args: any[]) => T;

  function createAt<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
      public readonly createAt: Date = new Date();
    };
  }

  function passwordMaker<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
      protected password: string = "0000";

      public setPassword(password: string | number): void {
        this.password = `${password}`;
      }

      public resetPassword(): void {
        this.password = "0000";
      }
    };
  }

  const createSomeUser = passwordMaker(createAt(User));
  const s = new createSomeUser("So");
}
