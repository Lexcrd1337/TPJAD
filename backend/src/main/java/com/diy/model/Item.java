package com.diy.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "item")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private double price;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "brand")
    private String brand;

    @Column(name = "image")
    private String image;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    @ManyToMany(fetch = FetchType.EAGER, mappedBy = "items")
    private List<Order> orders;

    public Item() {}

    public Item(String name, double price, int quantity, String brand, String image, Department department, List<Order> orders) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.brand = brand;
        this.image = image;
        this.department = department;
        this.orders = orders;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }
}
