/**
 * @module class.ts
 * @description TypeScript классы больше похожи на C#
 */
export namespace classes {
  /**
   * Объявление класса без контсруктора
   */
  class Animal {}

  let cat: Animal = new Animal();

  /**
   * Класс пользователя
   */
  class User {
    name: string;

    constructor(name: string) {
      this.name = name;
    }
  }

  let userFoo: any = new User("foo");

  /**
   * Наследование
   */
  class Employee extends User {
    role: string = "Employeee";

    constructor(...props: any) {
      super(props); // При создании контсруктора в дочернем классе обязательно нужно вызвать super() для инцилазации родительского класса
    }
  }

  let employerFoo = new Employee("foo");

  /**
   * Статичные свойства и методы
   * Обьялвются с ключевым словом static
   */

  class Email {
    public static validateEmail(email: string): boolean {
      return email.match(/^([A-Za-z])/)?.length !== 0;
    }
  }

  const validEmail: string[] = ["email@hjjhgfdsghjhhh", "aa@.aa.aa"].filter(
    Email.validateEmail
  );

  /**
   * Абстрактные классы
   */
  abstract class Department {
    constructor(public name: string) {}

    printName(): void {
      console.log("Department name: " + this.name);
    }

    abstract printMeeting(): void; // must be implemented in derived classes
  }

  class AccountingDepartment extends Department {
    constructor() {
      super("Accounting and Auditing"); // constructors in derived classes must call super()
    }

    printMeeting(): void {
      console.log("The Accounting Department meets each Monday at 10am.");
    }

    generateReports(): void {
      console.log("Generating accounting reports...");
    }
  }

  let department: Department; // ok to create a reference to an abstract type
  department = new Department(); // error: cannot create an instance of an abstract class
  department = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
  department.printName();
  department.printMeeting();
  department.generateReports();

  /**
   * Интерфейсы хорошо подходят для описании сигнатуры классов
   * С помощью ключевого слова implements
   */
  interface IPlayer {
    pause(): void;
    play(): void;
    stop(): void;
    seek(t: number): void;
  }

  class VideoPlayer implements IPlayer {
    pause() {}
    play() {}
    // error missing properties stop, seek
  }

  let player = new VideoPlayer();

  /**
   * Интерфейсы и наследование
   * интерфейсы могут использовать наследование от классов, интерфейсов, и алисов
   * c помощью ключевого слова extends в отличие от классов интерфейсы могут наследоваться от N объектов
   */
  class Search {
    search: string = "";
  }

  interface UrlService extends Search, User {
    query(key: string): string;
  }

  let api: UrlService = {
    // error property search is missing in type but required in type UrlService
    query(k: string): string {
      return "";
    },
  };
}
