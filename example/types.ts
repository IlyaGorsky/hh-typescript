// Boolean
var isTrue: boolean = true;
var isTrue: boolean = false;

// String
var userName: string = "";

// Number
var userId: number = 1;

// Null
var studentInfo: null = null;

// Undefined
var react: undefined = undefined;

// Array
var studetns: Array<string> = ["Jon", "Jane"];
var counters: Array<number> = [1, 2, 6];
var positive: Array<boolean> = [true, true];
var response: Array<any> = [true, true, 3, 4, 5];

// Object
var student: Object = {
  firstName: "Ilya",
  lastName: "Gorskiy",
};

// Enum
enum frameworks {
  Angular,
  React,
  Vue,
  Svelte,
}

// --> Angular
console.log(frameworks[0]);

// Turple
var userInfo: [String, Number] = ["Ilya", 26];

// Any
var data: any = [1, 2, {}, true, false];
