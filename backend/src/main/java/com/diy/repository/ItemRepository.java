package com.diy.repository;

import com.diy.model.Item;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends CrudRepository<Item, Long> {
    Item findByNameIgnoreCase(String name);
    List<Item> findAllByDepartmentNameIgnoreCase(String department);
}
