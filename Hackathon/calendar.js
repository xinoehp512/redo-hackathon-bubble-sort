// --- Hardcoded default data (converted from your data.txt) ---
const defaultAssignmentDueDates = {
  1153830: ["Honorlock Setup/Acknowledgment Quiz (Proctored)", "2025-09-06T05:59:00Z"],
  1153831: ["Official Programming Exam (Proctored)", "2025-09-24T05:59:00Z"],
  1153832: ["Chess GitHub Repository", "2025-09-06T05:59:00Z"],
  1153834: ["♕ Phase 0: Chess Moves", "2025-09-20T05:59:00Z"],
  1153835: ["♕ Phase 1: Chess Game", "2025-10-04T05:59:00Z"],
  1153836: ["♕ Phase 2: Chess Server Design", "2025-10-09T05:59:00Z"],
  1153837: ["♕ Phase 3: Chess Web API", "2025-10-23T05:59:00Z"],
  1153838: ["♕ Phase 4: Chess Database", "2025-11-01T05:59:00Z"],
  1153839: ["♕ Phase 5: Chess Pregame", "2025-11-15T06:59:00Z"],
  1153840: ["♕ Phase 6: Chess Gameplay (Pass Off)", "2025-12-06T06:59:00Z"],
  1153833: ["Student Rating Survey", "2025-12-11T06:59:00Z"],
  1153829: ["Final Exam (Proctored)", "2025-12-18T06:59:00Z"],
  1201106: ["Project RSA and Primality", "2025-09-25T05:59:00Z"],
  1201118: ["Project Convex Hull", "2025-10-23T05:59:00Z"],
  1218522: ["Project Dijkstras", "2025-10-11T05:59:00Z"],
  1219542: ["Project SCC", "2025-10-04T05:59:00Z"],
  1222347: ["Project SCC Requirements Quiz", "2025-10-04T05:59:00Z"],
  1222352: ["Project Convex Hull Requirements Quiz", "2025-10-23T05:59:00Z"],
  1222353: ["Project Dijkstras Requirements Quiz", "2025-10-11T05:59:00Z"],
  1222354: ["Project RSA and Primality Requirements Quiz", "2025-09-25T05:59:00Z"],
  1224194: ["Project Alignment Requirements Quiz", "2025-10-30T05:59:00Z"],
  1224195: ["Project Alignment", "2025-10-30T05:59:00Z"],
  1220666: ["Graph Homework 3: Dijkstra", "2025-10-01T05:59:00Z"],
  1222156: ["DVCQ Homework 2: Convex Hull", "2025-10-10T05:59:00Z"],
  1222157: ["DVCQ Homework 1: Master Theorem", "2025-10-08T05:59:00Z"],
  1223746: ["Greedy Homework 1: Huffman", "2025-10-22T05:59:00Z"],
  1223751: ["DP Homework 4: Matrix Mult/Floyd Warshall", "2025-11-05T06:59:00Z"],
  1223752: ["DP Homework 3: Knapsack", "2025-10-31T05:59:00Z"],
  1223753: ["DP Homework 2: Alignment", "2025-10-29T05:59:00Z"],
  1223922: ["DP Homework 1 Written", "2025-10-24T05:59:00Z"],
  1192880: ["React - Router", "2025-10-04T05:59:59Z"],
  1192885: ["Web Services - Fetch", "2025-10-18T05:59:59Z"],
  1192884: ["Web Services - Express", "2025-10-25T05:59:59Z"],
  1192883: ["Web Services - Data Services", "2025-11-01T05:59:59Z"],
  1145250: ["Startup specification", "2025-09-11T05:59:59Z"],
  1145242: ["Startup AWS", "2025-09-18T05:59:00Z"],
  1145245: ["Startup HTML", "2025-09-25T05:59:59Z"],
  1145243: ["Startup CSS", "2025-10-02T05:59:59Z"],
  1145246: ["Startup React Phase 1: HTML/CSS", "2025-10-09T05:59:59Z"],
  1145247: ["Startup React Phase2: Interactivity", "2025-10-23T05:59:00Z"],
  1145248: ["Startup Service", "2025-11-06T06:59:59Z"],
  1145244: ["Startup DB", "2025-11-13T05:59:59Z"],
  1145249: ["Startup WebSocket", "2025-12-04T06:59:59Z"],
  1145226: ["Demo day submission", "2025-12-05T06:59:59Z"],
  1145218: ["Final exam", "2025-12-18T06:59:00Z"],
  1145217: ["Midterm exam", "2025-10-22T05:59:59Z"]
};

// --- Core functions ---
function loadEvents() {
  const stored = localStorage.getItem('calendarEvents');
  if (stored && stored !== '[]') {
    return JSON.parse(stored);
  }

  // Convert hardcoded data into FullCalendar event list
  const defaultEvents = Object.entries(defaultAssignmentDueDates)
    .filter(([_, [name, date]]) => date !== null)
    .map(([id, [name, date]]) => ({
      title: name,
      start: date,
      allDay: false
    }));

  // Save defaults for next time
  localStorage.setItem('calendarEvents', JSON.stringify(defaultEvents));
  return defaultEvents;
}

// --- Save Events ---
function saveEvents(events) {
  localStorage.setItem('calendarEvents', JSON.stringify(events));
}

// --- Add Item ---
function addItem(newTitle, newStart, newAllDay) {
  allEvents.push({
    title: newTitle,
    start: newStart,
    allDay: newAllDay
  });

  saveEvents(allEvents);
  renderCalendar(allEvents);
}

// --- Render Calendar ---
function renderCalendar(events) {
  const calendarEl = document.getElementById('calendar');
  calendarEl.innerHTML = ''; // Clear previous instance

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    buttonText: {
      today: 'Today',
      month: 'Month',
      week: 'Week',
      day: 'Day',
      list: 'List'
    },
    eventDisplay: 'block',
    displayEventTime: true,
    eventTimeFormat: { hour: '2-digit', minute: '2-digit', meridiem: 'short' },
    events: events,
    editable: false,
    selectable: false,
    height: 'auto',
    themeSystem: 'standard',
    eventColor: '#007BFF',
    eventTextColor: '#fff',
    dayMaxEvents: true
  });  
  calendar.render();
}

// --- Initialize on Page Load ---
let allEvents = [];

document.addEventListener('DOMContentLoaded', async function () {
  // Show placeholder
  document.getElementById('calendar').innerHTML = '<p style="text-align:center;">Loading events...</p>';

  allEvents = await loadEvents(); // Wait for async load
  renderCalendar(allEvents);

  // Handle form submissions
  const form = document.getElementById('taskForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault(); // prevent refresh
    const taskName = this.taskName.value;
    const taskDate = this.taskDateTime.value;
    const allDay = this.allDay.checked;
    addItem(taskName, taskDate, allDay);
    this.reset();
  });
});

// Optional: add a reset button for testing
window.resetCalendarData = function () {
  localStorage.removeItem('calendarEvents');
  location.reload();
};