// Your code here
function createEmployeeRecord(employeeArray) {
  let attributes = ["firstName", "familyName", "title", "payPerHour" ];
  let employee = {};
  employeeArray.map(function callback(value, index) {
    employee[attributes[index]] = value;
    
  });
  employee["timeOutEvents"] = [];
  employee["timeInEvents"] = [];
  return employee;
};

function createEmployeeRecords(dataEmployees) {
  return dataEmployees.map( employeeArray => createEmployeeRecord(employeeArray));
};

function createTimeInEvent(employeeRecord, timeInString) {
  let newEvent = {}
  let general = timeInString.split(" ")
  let date = general[0];
  let hour = parseInt(general[1], 10);
  newEvent["type"] = "TimeIn";
  newEvent["date"] = date;
  newEvent["hour"] = hour;
  employeeRecord.timeInEvents.push(newEvent);
  return employeeRecord;  
}

function createTimeOutEvent(employeeRecord, timeInString) {
  let newEvent = {}
  let general = timeInString.split(" ")
  let date = general[0];
  let hour = parseInt(general[1], 10);
  newEvent["type"] = "TimeOut";
  newEvent["date"] = date;
  newEvent["hour"] = hour;
  employeeRecord.timeOutEvents.push(newEvent);
  return employeeRecord;  
}

function hoursWorkedOnDate(employeeRecord, date) {
  let timeIn = employeeRecord.timeInEvents.find( e => e.date === date ).hour;
  let timeOut = employeeRecord.timeOutEvents.find( e => e.date === date ).hour;
  let hours = timeOut - timeIn;
  let filter = hours < 1000 ? hours.toString().slice(0,1) : hours.toString().slice(0,2);
  return parseInt(filter);
}

function wagesEarnedOnDate(cRecord, date) {
  return hoursWorkedOnDate(cRecord, date) * cRecord.payPerHour;
}

function allWagesFor(cRecord) {
  let wagesArray = cRecord.timeInEvents.map( e => wagesEarnedOnDate(cRecord, e.date ));
  return wagesArray.reduce((accumulator, currentValue) => currentValue + accumulator );
}

function findEmployeeByFirstName(emps, name){
  return emps.find( e => e.firstName === name);
}

function calculatePayroll(employees) {
  return employees.reduce((m, e) => m + allWagesFor(e), 0);
}
