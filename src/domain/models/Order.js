

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

    static orderReadDto({ firstName, lastName, email, phoneNumber, street, houseNumber, postalCode, city, state, country, total, totalTax, orderItems }) {

        return {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            address: {
                street: street,
                houseNumber: houseNumber,
                city: city,
                postalCode: postalCode,
                state: state,
                country: country,
            },
            total: total,
            totalTax: totalTax,
            paymentMethod: "Rechnung",
            orderItems: orderItems,
        };
    }
}