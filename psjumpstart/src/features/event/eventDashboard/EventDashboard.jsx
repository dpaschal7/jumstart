import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import EventList from "../eventList/EventList";
import EventForm from "../eventForm/EventForm";
import cuid from "cuid";
import {createEvent, deleteEvent, updateEvent} from '../event'
//const eventsFromDashBoard =
const mapState = state => ({
  events: state.events
});

const actions = {
  createEvent,
  deleteEvent,
  updateEvent
}


class EventDashboard extends Component {
  state = {
    isOpen: false,
    selectedEvent: null //contains selected event object
  };

  handleCreateFormOpen = () => {
    this.setState({
      isOpen: true,
      selectedEvent: null
    });
  };

  handleFormCancel = () => {
    this.setState({
      isOpen: false
    });
  };

  handleCreateEvent = newEvent => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = "/assets/user.png";
    this.setState(({ events }) => ({
      events: [...events, newEvent],
      isOpen: false
    }));
  };

  handleIsOpenToggle = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen
    }));
  };

  handleSelectEvent = event => {
    this.setState({
      selectedEvent: event,
      isOpen: true
    });
  };

  handleUpdateEvent = updatedEvent => {
    this.setState(({ events }) => ({
      events: events.map(event => {
        if (event.id === updatedEvent.id) {
          return { ...updatedEvent };
        } else {
          return event;
        }
      }),
      isOpen: false,
      selectedEvent: null
    }));
  };
  handleDeleteEvent = id => {
    this.setState(({ events }) => ({
      events: events.filter(e => e.id !== id)
    }));
  };
  render() {
    const { isOpen, selectedEvent } = this.state;
    const { events } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={events}
            selectEvent={this.handleSelectEvent}
            deleteEvent={this.handleDeleteEvent}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            onClick={this.handleCreateFormOpen}
            positive
            content="Create Event"
          />
          {isOpen && (
            <EventForm
              key={selectedEvent ? selectedEvent.id : 0}
              updateEvent={this.handleUpdateEvent}
              selectedEvent={selectedEvent}
              createEvent={this.handleCreateEvent}
              cancelFormOpen={this.handleFormCancel}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}
export default connect(mapState, actions)(EventDashboard);