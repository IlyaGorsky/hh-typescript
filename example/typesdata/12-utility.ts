/**
 * Readonly
 * Метод доступа и чтения свойства
 * @module readonly.ts
 */
interface User {
  readonly type: string;
  name?: string;
}

/**
 * Readonly object field
 */
var UserApplicant: User = {
  type: "applicant",
};

UserApplicant.type = "admin";

var protectedUserApplicant: Readonly<User> = {
  type: "applicant",
  name: "Ilya",
};

protectedUserApplicant.name = "d";

/**
 * Readonly object all field
 */
var protectedUserApplicant: Readonly<User> = {
  type: "applicant",
  name: "Ilya",
};

protectedUserApplicant.name = "d";

/**
 * Readonly arrays
 */
var abc: readonly string[] = ["a", "b", "c"];
var abc: Readonly<Array<string>> = ["a", "b", "c"];
var abc: ReadonlyArray<string> = ["a", "b", "c"];

abc[0] = "d";
