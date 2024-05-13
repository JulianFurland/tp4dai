class Province {
    id;
    name;
    full_name;
    latitude;
    longitude;
    display_order;
}

constructor(name, full_name, latitude, longitude){
    this.name = name;
    this.full_name = full_name;
    this.latitude = latitude;
    this.longitude = longitude;
}

constructor(id, name, full_name, latitude, longitude){
    this.id = id;
    this.name = name;
    this.full_name = full_name;
    this.latitude = latitude;
    this.longitude = longitude;
}
export default Province;
