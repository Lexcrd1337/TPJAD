package com.diy.dto;

import javax.persistence.Column;

public class ItemDTO {
    private String name;

    private double price;

    private int quantity;

    private String brand;

    private String image;

    private int departmentId;

    public ItemDTO(String name, double price, int quantity, String brand, String image, int departmentId) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.brand = brand;
        this.image = image;
        this.departmentId = departmentId;
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

    public int getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(int departmentId) {
        this.departmentId = departmentId;
    }
}
