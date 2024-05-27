class ATVirtualEvent{
    constructor(id, date, time, description, participants){
        this.id = id;
        this.date = date;
        this.time = time;
        this.description = description;
        this.participants = [];
    }
}

module.exports = ATVirtualEvent;