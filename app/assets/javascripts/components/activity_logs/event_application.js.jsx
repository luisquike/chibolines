var EventApplication = React.createClass({
  getInitialState: function() {
    return { events: [] };
  },
  componentDidMount: function() {
    this.getDataFromApi();
  },
  getDataFromApi: function() {
    var self = this;
    $.ajax({
      url: '/api/v1/activity_logs',
      success: function(data) {
        self.setState({ events: data });
      },
      error: function(xhr, status, error) {
        console.log(status, xhr, error, xhr.status);
        createNotification("danger", "No se pueden obtener los datos");
      }
    });
  },
  handleSearch: function(events) {
    this.setState({ events: events });
  },
  handleAdd: function(event) {
    var events = this.state.events;
    events.unshift(event);
    this.setState({ events: events });
  },
  handleDeleteRecord: function(event) {
    var events = this.state.events.slice();
    var index = events.indexOf(event);
    events.splice(index, 1);
    this.setState({ events: events });
  },
  handleUpdateRecord: function(old_event, event) {
    var events = this.state.events.slice();
    var index = events.indexOf(old_event);
    events.splice(index, 1, event);
    this.setState({ events: events });
  },
  render: function() {
    return(
      <div className="container">
        <div id="upload-alerts" class="container"></div>
        <div className="jumbotron">
          <h4>Lista de Actividades</h4>
        </div>
        <div className="row">
          <div className="col-md-12">
            <NewForm handleAdd={this.handleAdd} />
          </div>
        </div>
        <hr></hr>
        <div className="row">
          <div className="col-md-12">
            <SearchForm handleSearch={this.handleSearch} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <EventTable events={this.state.events}
                        handleDeleteRecord={this.handleDeleteRecord}
                        handleUpdateRecord={this.handleUpdateRecord} />
          </div>
        </div>
      </div>
    )
  }
})