var LABEL_NAME = 'Work/Schedule';
var CALENDAR_NAME = 'McDonalds Shifts';

shiftCalendar = CalendarApp.getCalendarsByName(CALENDAR_NAME)[0];
function McDShiftCheck() {
  if(shiftCalendar == null){
    Logger.log('User Calendar: '+CALENDAR_NAME+' not found.');
    return;
  }
  var schedule;
  try{
    schedule = GmailApp.getUserLabelByName(LABEL_NAME);
  }catch(e){
    Logger.log('User Label: '+LABEL_NAME+' not found.');
    return;
  }
  
  var recent = schedule.getThreads()[0].getMessages()[0];
  if(recent.isStarred()){
    //already done
    Logger.log('User Shifts already recorded.');
    return;
  }
  var shifts = parseEmail(recent.getBody());
  for(var i=0;i<shifts.length;i++){
    addShift(shifts[i]);
  }
  recent.star();
}
 
function parseEmail(text) {
  var END = "You have a total of";
  var ENDidx = text.indexOf(END)-4;
  var START = "Here is your schedule for the week of ";
  var STARTidx = text.indexOf(':',text.indexOf(START))+5
  
  var shiftsText = text.substring(STARTidx,ENDidx);
  Logger.log('Shifts: \n'+shiftsText);
  return parseShifts(shiftsText);
}
function parseShifts(text) {
  var unparsed = text.split('\n');
  var parsed = [];
  for(var i=0;i<unparsed.length;i++){
    
    var shiftText = unparsed[i].split(",");
    var d = shiftText[0]+","+shiftText[1]+shiftText[2].substring(0,5);
    var t = shiftText[2].substring(6).split(" - ")[0];
    var t2 = shiftText[2].substring(6).split(" - ")[1];
    var s = shiftText[3].substring(1);
    for(var j=4;j<shiftText.length;j++){
      s+=", "+shiftText[j]
    }
    
    var shift = {day:d,time:t,time2:t2,station:s};
    parsed.push(shift);
  }
  return parsed;
}
function addShift(shift){
  var start = new Date(shift.day+" "+shift.time);
  var end = new Date(shift.day+" "+shift.time2);
  var events = shiftCalendar.getEvents(start, end);
  if(events.length>0){
    //shift already added
    Logger.log(shift.day+" shift already added.");
  }else{
    shiftCalendar.createEvent(shift.station, start, end);
  }
}
