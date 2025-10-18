function saveEvents(events) {
  localStorage.setItem('calendarEvents', JSON.stringify(events));
}

function loadEvents() {
  const data = localStorage.getItem('calendarEvents');
  return data ? JSON.parse(data) : [];
}

let allEvents = loadEvents();

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('taskForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const taskName = this.taskName.value;
    const taskDate = this.taskDateTime.value;
    const allDay = this.allDay.checked;

    addItem(taskName, taskDate, allDay);
    this.reset(); // Clear form
  });

  renderCalendar(allEvents);
});

function addItem(newTitle, newStart, newAllDay) {
  allEvents.push({
    title: newTitle,
    start: newStart,
    allDay: newAllDay
  });

  saveEvents(allEvents);
  renderCalendar(allEvents);
}

function renderCalendar(events) {
  const calendarEl = document.getElementById('calendar');
  calendarEl.innerHTML = ''; // Clear previous calendar

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    events: events
  });

  calendar.render();
}
