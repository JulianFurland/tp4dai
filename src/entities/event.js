class Event {
    id;
    name;
    desc;
    date;
    duration;
    ticketPrice;
    inscriptionAvailable;
    capacity;
    creatorUser;
    category;
    location;

constructor(id, name, desc, date, duration, ticketPrice, inscriptionAvailable, capacity, creatorUser, category, location){
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.date = date;
    this.duration = duration;
    this.ticketPrice = ticketPrice;
    this.inscriptionAvailable = inscriptionAvailable;
    this.capacity = capacity;
    this.creatorUser = creatorUser;
    this.category = category;
    this.location = location;
}}
export default Event;