import  {IErrorResponse} from "../types";
import {IEvent} from "../types/IResponse";
import {API} from "../utils";

const createEventAPI = async (newEventData: IEvent) => {
  const response = await API.post<IEvent, IErrorResponse>("/events/createEvent", newEventData);
  if (response.status === 201) {
    return response.data; // Return the created event data
  } else {
    throw new Error(response.message);
  }
};

// Add an event member to a specific event
// const addEventMemberAPI = async (eventId: string, newMemberData: IEventMember) => {
//   const response = await API.post<IEvent, IErrorResponse>(`/events/addEventMember/${eventId}`, newMemberData);
//   if (response.status === 200) {
//     return response.data; // Return the updated event data
//   } else {
//     throw new Error(response.message);
//   }
// };

// Get a list of all events
const getEventsAPI = async () => {  
  const response = await API.get<IEvent[], IErrorResponse>("/events/getEvents");
  if (response.status === 200) {
    return response.data; // Return the list of events
  } else {
    throw new Error(response.message);
  }
}
// Get a list of all events for a specific organization
const updateEventStatusAPI = async (eventId: string, status: string) => {
  const response = await API.put<IEvent, IErrorResponse>(`/events/updateEventStatus/${eventId}`, { status });
  if (response.status === 200) {
    return response.data; // Return the updated event status
  } else {
    throw new Error(response.message);
  }
};

// Update event details
const updateEventAPI = async (eventId: string, updatedEventData: IEvent) => {
  const response = await API.put<IEvent, IErrorResponse>(`/events/updateEvent/${eventId}`, updatedEventData);
  if (response.status === 200) {
    return response.data; // Return the updated event data
  } else {
    throw new Error(response.message);
  }
}

// Delete an event
const deleteEventAPI = async (eventId: string) => {
  const response = await API.delete<IErrorResponse>(`/events/deleteEvent/${eventId}`);
  if (response.status === 200) {
    return response.data; // Return the success message on delete
  } else {
    throw new Error(response.message);
  }
}

export {
  createEventAPI,
  getEventsAPI, 
  updateEventStatusAPI,
  updateEventAPI,
  deleteEventAPI,}