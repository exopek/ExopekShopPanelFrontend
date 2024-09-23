

export default class Order {
    constructor({ id, createdAt, total, status, shippedStatus }) {
        this.id = id;
        this.createdAt = createdAt;
        this.total = total;
        this.status = status;
        this.shippedStatus = shippedStatus;
    }

    static fromJson(json) {
        console.log(json);
        this.id = json.id;
        this.createdAt = json.createdAt;
        this.total = json.total;
        this.status = json.status;
        this.shippedStatus = json.shippedStatus;
    
        return this;
    }

    static formattedCreatedAt() {
        return new Date(this.createdAt).toLocaleDateString();
    }
}