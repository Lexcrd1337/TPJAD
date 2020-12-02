package com.diy.model;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "shipping_address")
    private String shippingAddress;

    @Column(name = "date")
    private Date date;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @ManyToMany
    @JoinTable(
            name = "order_details",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "item_id"),
            foreignKey = @ForeignKey(name = "order_details_fk_order"),
            inverseForeignKey = @ForeignKey(name = "order_details_fk_item"))
    private List<Item> items;

    public Order() {}

    public Order(String shippingAddress, Date date, Client client, List<Item> items) {
        this.shippingAddress = shippingAddress;
        this.date = date;
        this.client = client;
        this.items = items;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }
}
