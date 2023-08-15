export abstract class CategoryLogicActionHandler {

  abstract run(data:any): any;

  setNumbers(number: number) : string{
    if(number < 9) {
      return '0' + (number + 1);
    }
    return (number + 1).toString();
  }

}
