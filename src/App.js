function App() {
  return (
    <div>
      <div className="navbar-container">
        <div>Hello, Iulian</div>
        <div>login/logout</div>
      </div>
      <div className="calendar-container">
        <div className="calendar-show">Calendar</div>
        <div className="calendar-range">confirma perioada</div>
      </div>
      <div className="holiday-container">
        <div className="holiday-accept">zile acceptate</div>
        <div className="holiday-pending">zile in asteptare</div>
        <div className="holiday-reject">zile respinse</div>
      </div>
    </div>
  );
}

export default App;
