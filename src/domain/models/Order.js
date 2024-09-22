

export default class Order {
    constructor({ id, createdAt, total, status }) {
        this.id = id;
        this.createdAt = createdAt;
        this.total = total;
        this.status = status;
    }

    static fromJson(json) {
        console.log(json);
        this.id = json.id;
        this.createdAt = json.createdAt;
        this.total = json.total;
        this.status = json.status;
    
        return this;
    }

    static formattedCreatedAt() {
        return new Date(this.createdAt).toLocaleDateString();
    }
}